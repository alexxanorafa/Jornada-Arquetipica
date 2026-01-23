// main.js - Entry point

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔄 Athanor: Alquimia Quântica - Inicializando...');
    
    // Initialize app with error handling
    try {
        initAthanor();
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
        showFatalError(error);
    }
});

async function initAthanor() {
    // Show loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.getElementById('loadingText');
    
    // Simulate loading steps
    const loadingSteps = [
        'Carregando arquétipos...',
        'Inicializando sistema quântico...',
        'Preparando caldeirão alquímico...',
        'Ativando labirinto...',
        'Quase pronto...'
    ];
    
    let step = 0;
    const loadingInterval = setInterval(() => {
        if (step < loadingSteps.length) {
            loadingText.textContent = loadingSteps[step];
            step++;
        } else {
            clearInterval(loadingInterval);
        }
    }, 500);
    
    // Load essential modules
    await Promise.all([
        loadModule('data/archetypes.js'),
        loadModule('data/fusions.js'),
        loadModule('data/narratives.js')
    ]);
    
    // Initialize core systems
    const app = new QuantumAthanor();
    window.athanorApp = app; // Make available globally for debugging
    
    // Initialize UI components
    initAccessibility();
    initTutorial();
    initJournal();
    initAchievements();
    initKeyboardShortcuts();
    
    // Setup event listeners
    setupGlobalEvents();
    
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // Show welcome message
            showSnackbar('✨ Athanor pronto para transmutações!', 'success');
            
            // Start ambient audio
            startAmbientAudio();
        }, 300);
    }, 2000);
        // Inicializar menu do ecossistema
    if (typeof EcosystemManager !== 'undefined') {
        window.ecosystemManager = new EcosystemManager();
        window.ecosystemManager.init();
    }
}

function loadModule(modulePath) {
    return new Promise((resolve, reject) => {
        // In production, this would be dynamic imports
        // For now, just resolve since scripts are loaded in HTML
        setTimeout(resolve, 100);
    });
}

function initAccessibility() {
    const highContrastBtn = document.getElementById('highContrast');
    const fontSizeBtn = document.getElementById('fontSizeIncrease');
    const screenReaderBtn = document.getElementById('screenReaderToggle');
    
    // High contrast toggle
    highContrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isActive = document.body.classList.contains('high-contrast');
        highContrastBtn.innerHTML = isActive ? 
            '<i class="fas fa-adjust" style="color: #ffd700;"></i>' : 
            '<i class="fas fa-adjust"></i>';
        showSnackbar(`Modo alto contraste ${isActive ? 'ativado' : 'desativado'}`, 'info');
    });
    
    // Font size increase
    let fontSizeLevel = 0;
    fontSizeBtn.addEventListener('click', () => {
        fontSizeLevel = (fontSizeLevel + 1) % 3;
        const sizes = ['100%', '125%', '150%'];
        document.body.style.fontSize = sizes[fontSizeLevel];
        showSnackbar(`Tamanho da fonte: ${sizes[fontSizeLevel]}`, 'info');
    });
    
    // Screen reader announcement
    screenReaderBtn.addEventListener('click', () => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.className = 'sr-only';
        announcement.textContent = 'Modo de leitura de tela ativado. Use as teclas de navegação para explorar.';
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 3000);
        showSnackbar('Leitor de tela ativado', 'info');
    });
}

function initTutorial() {
    const tutorialManager = new TutorialManager();
    const helpButton = document.getElementById('helpButton');
    
    helpButton.addEventListener('click', () => {
        tutorialManager.show();
    });
    
    // Show tutorial on first visit
    if (!localStorage.getItem('athanor_tutorial_completed')) {
        setTimeout(() => tutorialManager.show(), 1000);
    }
}

function initJournal() {
    const journalManager = new JournalManager();
    const toggleJournalBtn = document.getElementById('toggleJournal');
    
    toggleJournalBtn.addEventListener('click', () => {
        journalManager.toggle();
    });
}

function initAchievements() {
    const achievementManager = new AchievementManager();
    const toggleAchievementsBtn = document.getElementById('toggleAchievements');
    
    toggleAchievementsBtn.addEventListener('click', () => {
        achievementManager.show();
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case ' ':
                e.preventDefault();
                toggleCanvasDrawing();
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                document.getElementById('reiniciarLabirinto').click();
                break;
            case 'j':
            case 'J':
                e.preventDefault();
                document.getElementById('toggleJournal').click();
                break;
            case 'a':
            case 'A':
                e.preventDefault();
                document.getElementById('toggleAchievements').click();
                break;
            case 'h':
            case 'H':
                e.preventDefault();
                document.getElementById('helpButton').click();
                break;
            case 'Escape':
                closeAllModals();
                break;
            case '?':
                e.preventDefault();
                toggleKeyboardHelp();
                break;
        }
    });
}

function setupGlobalEvents() {
    // Window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.athanorApp?.resizeCanvas) {
                window.athanorApp.resizeCanvas();
            }
        }, 250);
    });
    
    // Prevent default drag and drop behavior
    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());
    
    // Online/offline status
    window.addEventListener('online', () => {
        showSnackbar('Conexão restaurada', 'success');
    });
    
    window.addEventListener('offline', () => {
        showSnackbar('Modo offline ativado', 'warning');
    });
    
    // Before unload warning
    window.addEventListener('beforeunload', (e) => {
        if (window.athanorApp?.hasUnsavedChanges()) {
            e.preventDefault();
            e.returnValue = 'Tem certeza que deseja sair? Suas transmutações não foram salvas.';
            return e.returnValue;
        }
    });
}

function toggleCanvasDrawing() {
    const canvas = document.getElementById('labyrinthCanvas');
    const isDrawing = canvas.getAttribute('data-drawing') === 'true';
    canvas.setAttribute('data-drawing', (!isDrawing).toString());
    showSnackbar(`Desenho ${isDrawing ? 'pausado' : 'ativado'}`, 'info');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.setAttribute('hidden', 'true');
    });
}

function toggleKeyboardHelp() {
    const help = document.getElementById('keyboardHelp');
    const isHidden = help.hasAttribute('hidden');
    
    if (isHidden) {
        help.removeAttribute('hidden');
        setTimeout(() => help.setAttribute('hidden', 'true'), 5000);
    } else {
        help.setAttribute('hidden', 'true');
    }
}

function showSnackbar(message, type = 'info') {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = `snackbar snackbar-${type}`;
    snackbar.removeAttribute('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        snackbar.classList.add('hiding');
        setTimeout(() => {
            snackbar.setAttribute('hidden', 'true');
            snackbar.classList.remove('hiding');
        }, 300);
    }, 5000);
}

function startAmbientAudio() {
    // Ambient audio would be implemented here
    console.log('🎵 Áudio ambiente inicializado');
}

function showFatalError(error) {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.innerHTML = `
        <div class="error-content">
            <div class="error-icon">⚡</div>
            <h2>Erro na Inicialização</h2>
            <p>Ocorreu um erro ao carregar o Athanor:</p>
            <pre class="error-details">${error.message}</pre>
            <button onclick="location.reload()" class="btn-primary">
                <i class="fas fa-redo"></i> Tentar Novamente
            </button>
        </div>
    `;
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
}

// Utility function to create element with attributes
function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else {
            element.setAttribute(key, value);
        }
    });
    
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    
    return element;
}

// Export utility functions to window
window.createElement = createElement;
window.showSnackbar = showSnackbar;

console.log('✅ Athanor main.js carregado');