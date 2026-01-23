// Crie um novo arquivo js/fix-modals.js
(function() {
    'use strict';
    
    console.log('🔧 Aplicando correções de modal...');
    
    // Função para fechar todas as modais
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            // Skip loading screen
            if (modal.id === 'loadingScreen') return;
            
            // Force hide
            modal.setAttribute('hidden', 'true');
            modal.style.display = 'none';
            modal.classList.remove('active', 'show');
            
            // Remove any inline styles that might be showing it
            modal.removeAttribute('style');
        });
        
        // Restore body scrolling
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
        
        console.log('✅ Todas as modais fechadas');
    }
    
    // Função para fixar botões de fechar
    function fixCloseButtons() {
        const closeButtons = document.querySelectorAll('.modal-close, .modal .close, [data-dismiss="modal"]');
        
        closeButtons.forEach(button => {
            // Remove all existing click listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const modal = this.closest('.modal');
                if (modal) {
                    modal.setAttribute('hidden', 'true');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                    console.log('Modal fechada via botão:', modal.id);
                }
            });
        });
        
        console.log('✅ Botões de fechar fixados');
    }
    
    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            closeAllModals();
            fixCloseButtons();
        });
    } else {
        closeAllModals();
        fixCloseButtons();
    }
    
    // Também executar após um pequeno delay para garantir
    setTimeout(function() {
        closeAllModals();
        fixCloseButtons();
    }, 500);
    
    // E novamente após a página carregar completamente
    window.addEventListener('load', function() {
        setTimeout(function() {
            closeAllModals();
            fixCloseButtons();
        }, 1000);
    });
    
    // Expor funções globalmente para debug
    window.fixModals = {
        closeAll: closeAllModals,
        fixButtons: fixCloseButtons
    };
})();