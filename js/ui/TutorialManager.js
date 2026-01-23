// TutorialManager.js - Handles tutorial and onboarding

class TutorialManager {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 4;
        this.completed = false;
        this.modal = null;
        
        console.log('📚 TutorialManager inicializado');
    }
    
    init() {
        this.modal = document.getElementById('tutorialModal');
        if (!this.modal) {
            console.warn('⚠️ Modal de tutorial não encontrado');
            return;
        }
        
        this.setupEventListeners();
        return this;
    }
    
    setupEventListeners() {
        // Close button
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
        
        // Skip button
        const skipBtn = document.getElementById('skipTutorial');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skip());
        }
        
        // Navigation buttons
        const prevBtn = document.getElementById('prevStep');
        const nextBtn = document.getElementById('nextStep');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());
        
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }
    
    show() {
        if (!this.modal) this.init();
        
        // Check if tutorial was already completed
        if (localStorage.getItem('athanor_tutorial_completed') === 'true') {
            return;
        }
        
        this.currentStep = 0;
        this.updateStep();
        this.modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        
        console.log('🎓 Tutorial iniciado');
    }
    
    hide() {
        if (!this.modal) return;
        
        this.modal.setAttribute('hidden', 'true');
        document.body.style.overflow = '';
        this.completed = true;
        
        // Mark as completed
        localStorage.setItem('athanor_tutorial_completed', 'true');
        
        console.log('🎓 Tutorial finalizado');
    }
    
    skip() {
        this.hide();
        
        // Show completion message
        if (typeof showSnackbar === 'function') {
            showSnackbar('Tutorial pulado. Você pode revê-lo a qualquer momento no menu de ajuda.', 'info');
        }
    }
    
    next() {
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.updateStep();
        } else {
            this.complete();
        }
    }
    
    prev() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateStep();
        }
    }
    
    updateStep() {
        if (!this.modal) return;
        
        // Hide all steps
        const steps = this.modal.querySelectorAll('.tutorial-step');
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        const currentStep = this.modal.querySelector(`#step${this.currentStep + 1}`);
        if (currentStep) {
            currentStep.classList.add('active');
        }
        
        // Update step indicator
        const stepIndicator = document.getElementById('currentStep');
        if (stepIndicator) {
            stepIndicator.textContent = this.currentStep + 1;
        }
        
        // Update buttons
        const prevBtn = document.getElementById('prevStep');
        const nextBtn = document.getElementById('nextStep');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 0;
        }
        
        if (nextBtn) {
            nextBtn.textContent = this.currentStep === this.totalSteps - 1 ? 'Concluir' : 'Próximo';
        }
        
        // Update title based on step
        const titles = [
            'Bem-vindo ao Athanor',
            'Os Arquétipos',
            'O Labirinto Quântico',
            'O Caldeirão'
        ];
        
        const titleElement = document.getElementById('tutorialTitle');
        if (titleElement && titles[this.currentStep]) {
            titleElement.textContent = titles[this.currentStep];
        }
    }
    
    complete() {
        this.hide();
        
        // Show completion message
        if (typeof showSnackbar === 'function') {
            showSnackbar('Tutorial concluído! Boas transmutações!', 'success');
        }
        
        // Trigger completion event
        this.emit('complete');
    }
    
    reset() {
        localStorage.removeItem('athanor_tutorial_completed');
        this.completed = false;
        this.currentStep = 0;
        console.log('🎓 Tutorial resetado');
    }
    
    isCompleted() {
        return localStorage.getItem('athanor_tutorial_completed') === 'true';
    }
    
    // Quick tips system
    showTip(message, duration = 5000) {
        const tip = document.createElement('div');
        tip.className = 'tooltip-tip';
        tip.textContent = message;
        tip.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--ui-background);
            border: 1px solid var(--ui-border);
            border-radius: 8px;
            padding: 12px 16px;
            max-width: 300px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(tip);
        
        setTimeout(() => {
            tip.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (tip.parentNode) {
                    tip.parentNode.removeChild(tip);
                }
            }, 300);
        }, duration);
    }
    
    // Event system
    listeners = {};
    
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
    
    emit(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => callback(data));
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.TutorialManager = TutorialManager;
}