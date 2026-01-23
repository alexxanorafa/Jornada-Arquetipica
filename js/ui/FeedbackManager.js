// FeedbackManager.js - Handles user feedback and notifications

class FeedbackManager {
    constructor() {
        this.toasts = [];
        this.maxToasts = 3;
        this.toastContainer = null;
        
        console.log('💬 FeedbackManager inicializado');
    }
    
    init() {
        // Create toast container if it doesn't exist
        this.toastContainer = document.getElementById('toastContainer');
        if (!this.toastContainer) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.id = 'toastContainer';
            this.toastContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 350px;
            `;
            document.body.appendChild(this.toastContainer);
        }
        
        return this;
    }
    
    showToast(message, type = 'info', duration = 5000) {
        if (!this.toastContainer) this.init();
        
        // Remove oldest toast if at max
        if (this.toasts.length >= this.maxToasts) {
            const oldestToast = this.toasts.shift();
            oldestToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Set icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${icons[type] || icons.info}</div>
                <div class="toast-message">${message}</div>
                <button class="toast-close">&times;</button>
            </div>
        `;
        
        // Add styles
        toast.style.cssText = `
            background: var(--ui-background);
            border: 1px solid var(--ui-border);
            border-radius: 8px;
            padding: 12px 16px;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        // Type-specific styling
        const typeColors = {
            success: 'rgba(34, 197, 94, 0.2)',
            error: 'rgba(239, 68, 68, 0.2)',
            warning: 'rgba(251, 191, 36, 0.2)',
            info: 'rgba(59, 130, 246, 0.2)'
        };
        
        toast.style.background = typeColors[type] || typeColors.info;
        
        // Add close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));
        
        // Add to container
        this.toastContainer.appendChild(toast);
        this.toasts.push(toast);
        
        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => this.removeToast(toast), duration);
        }
        
        return toast;
    }
    
    removeToast(toast) {
        if (!toast || !toast.parentNode) return;
        
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.toasts = this.toasts.filter(t => t !== toast);
        }, 300);
    }
    
    clearToasts() {
        this.toasts.forEach(toast => this.removeToast(toast));
        this.toasts = [];
    }
    
    showSnackbar(message, type = 'info', duration = 5000) {
        return this.showToast(message, type, duration);
    }
    
    showError(message, duration = 5000) {
        return this.showToast(message, 'error', duration);
    }
    
    showSuccess(message, duration = 5000) {
        return this.showToast(message, 'success', duration);
    }
    
    showWarning(message, duration = 5000) {
        return this.showToast(message, 'warning', duration);
    }
    
    showInfo(message, duration = 5000) {
        return this.showToast(message, 'info', duration);
    }
    
    // Confirmation dialog
    showConfirm(message, options = {}) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.2s ease;
            `;
            
            const dialog = document.createElement('div');
            dialog.style.cssText = `
                background: var(--ui-background);
                border: 1px solid var(--ui-border);
                border-radius: 12px;
                padding: 24px;
                max-width: 400px;
                width: 90%;
                animation: scaleIn 0.3s ease;
            `;
            
            const title = options.title || 'Confirmação';
            const confirmText = options.confirmText || 'Confirmar';
            const cancelText = options.cancelText || 'Cancelar';
            
            dialog.innerHTML = `
                <h3 style="margin-top: 0; color: var(--text-primary);">${title}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">${message}</p>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button class="cancel-btn" style="padding: 8px 16px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: 6px; color: var(--text-primary); cursor: pointer;">
                        ${cancelText}
                    </button>
                    <button class="confirm-btn" style="padding: 8px 16px; background: linear-gradient(135deg, var(--gold-base), var(--gold-dark)); border: none; border-radius: 6px; color: var(--color-primary); font-weight: bold; cursor: pointer;">
                        ${confirmText}
                    </button>
                </div>
            `;
            
            modal.appendChild(dialog);
            document.body.appendChild(modal);
            
            // Add event listeners
            const confirmBtn = dialog.querySelector('.confirm-btn');
            const cancelBtn = dialog.querySelector('.cancel-btn');
            
            const closeModal = (result) => {
                modal.style.animation = 'fadeOut 0.2s ease';
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 200);
                resolve(result);
            };
            
            confirmBtn.addEventListener('click', () => closeModal(true));
            cancelBtn.addEventListener('click', () => closeModal(false));
            
            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal && options.allowBackdropClose !== false) {
                    closeModal(false);
                }
            });
            
            // Close on escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeModal(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    }
    
    // Loading indicator
    showLoading(message = 'Carregando...') {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease;
        `;
        
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            background: var(--ui-background);
            border: 1px solid var(--ui-border);
            border-radius: 12px;
            padding: 32px;
            text-align: center;
            min-width: 200px;
        `;
        
        spinner.innerHTML = `
            <div class="spinner" style="width: 40px; height: 40px; border: 3px solid var(--ui-surface); border-top-color: var(--gold-base); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
            <div style="color: var(--text-primary);">${message}</div>
        `;
        
        overlay.appendChild(spinner);
        document.body.appendChild(overlay);
        
        return {
            hide: () => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            },
            updateMessage: (newMessage) => {
                const messageElement = spinner.querySelector('div:last-child');
                if (messageElement) {
                    messageElement.textContent = newMessage;
                }
            }
        };
    }
    
    // Progress bar
    showProgress(message = 'Progresso', initialValue = 0) {
        const overlay = document.createElement('div');
        overlay.id = 'progress-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease;
        `;
        
        const container = document.createElement('div');
        container.style.cssText = `
            background: var(--ui-background);
            border: 1px solid var(--ui-border);
            border-radius: 12px;
            padding: 24px;
            min-width: 300px;
        `;
        
        container.innerHTML = `
            <div style="color: var(--text-primary); margin-bottom: 16px;">${message}</div>
            <div class="progress-bar" style="height: 8px; background: var(--ui-surface); border-radius: 4px; overflow: hidden;">
                <div class="progress-fill" style="height: 100%; width: ${initialValue}%; background: linear-gradient(90deg, var(--water), var(--gold-base)); border-radius: 4px; transition: width 0.3s ease;"></div>
            </div>
            <div class="progress-text" style="text-align: center; margin-top: 8px; color: var(--text-secondary); font-size: 12px;">${initialValue}%</div>
        `;
        
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        return {
            hide: () => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            },
            update: (value, text) => {
                const fill = container.querySelector('.progress-fill');
                const textElement = container.querySelector('.progress-text');
                
                if (fill) {
                    fill.style.width = `${Math.min(100, Math.max(0, value))}%`;
                }
                
                if (textElement) {
                    textElement.textContent = text || `${Math.round(value)}%`;
                }
            }
        };
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.FeedbackManager = FeedbackManager;
    // Also create global showSnackbar function
    window.showSnackbar = function(message, type = 'info', duration = 5000) {
        if (window.feedbackManager) {
            return window.feedbackManager.showSnackbar(message, type, duration);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
            return null;
        }
    };
}