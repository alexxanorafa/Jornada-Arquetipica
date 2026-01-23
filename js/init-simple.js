// init-simple.js - Inicialização simplificada que FUNCIONA

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Athanor Simplificado - Inicializando...');
    
    // 1. Fechar todas as modais automaticamente
    document.querySelectorAll('.modal').forEach(modal => {
        if (modal.id !== 'loadingScreen') {
            modal.setAttribute('hidden', 'true');
        }
    });
    
    // 2. Inicializar o canvas de forma SIMPLES
    initSimpleCanvas();
    
    // 3. Carregar arquétipos básicos
    loadArchetypes();
    
    // 4. Configurar arrastar e soltar
    setupDragAndDrop();
    
    // 5. Esconder tela de carregamento
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        showMessage('✨ Arraste arquétipos para o caldeirão ou desenhe no labirinto!');
    }, 1000);
});

// ============== FUNÇÕES SIMPLIFICADAS ==============

function initSimpleCanvas() {
    const canvas = document.getElementById('labyrinthCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Redimensionar canvas
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawBackground();
    }
    
    function drawBackground() {
        // Fundo gradiente
        const gradient = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 0,
            canvas.width/2, canvas.height/2, canvas.width/2
        );
        gradient.addColorStop(0, 'rgba(26, 26, 46, 0.3)');
        gradient.addColorStop(1, 'rgba(10, 10, 12, 0.8)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Grade sutil
        ctx.strokeStyle = 'rgba(212, 177, 146, 0.1)';
        ctx.lineWidth = 1;
        
        // Linhas verticais
        for (let x = 0; x < canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // Linhas horizontais
        for (let y = 0; y < canvas.height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
    
    // Sistema de desenho SIMPLES com partículas
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Partículas que seguem o mouse
    const particles = [];
    
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = getMousePos(canvas, e);
        
        // Criar partícula inicial
        createParticle(lastX, lastY);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const [x, y] = getMousePos(canvas, e);
        
        // Desenhar linha
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(212, 177, 146, 0.7)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Criar partículas ao longo do caminho
        createParticleTrail(lastX, lastY, x, y);
        
        [lastX, lastY] = [x, y];
    });
    
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });
    
    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const touch = e.touches[0];
        [lastX, lastY] = getMousePos(canvas, touch);
        createParticle(lastX, lastY);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        
        const touch = e.touches[0];
        const [x, y] = getMousePos(canvas, touch);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(212, 177, 146, 0.7)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        createParticleTrail(lastX, lastY, x, y);
        [lastX, lastY] = [x, y];
    });
    
    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });
    
    // Sistema de partículas SIMPLES
    function createParticle(x, y) {
        particles.push({
            x, y,
            size: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 60 + 30}, 70%, 60%)`,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1.0
        });
    }
    
    function createParticleTrail(fromX, fromY, toX, toY) {
        const steps = 5;
        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const x = fromX + (toX - fromX) * t;
            const y = fromY + (toY - fromY) * t;
            createParticle(x, y);
        }
    }
    
    // Animar partículas
    function animateParticles() {
        // Limpar partículas antigas
        ctx.fillStyle = 'rgba(10, 10, 12, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        
        // Atualizar e desenhar partículas
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // Mover
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            
            // Reduzir velocidade
            p.vx *= 0.95;
            p.vy *= 0.95;
            
            // Desenhar
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1;
            
            // Remover se morta
            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    // Iniciar animação
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateParticles();
    
    // Função auxiliar para obter posição do mouse
    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return [
            evt.clientX - rect.left,
            evt.clientY - rect.top
        ];
    }
}

function loadArchetypes() {
    const container = document.getElementById('deckArquetipos');
    if (!container) return;
    
    const archetypes = [
        { id: 'agua', name: 'Água', icon: '🌊', color: '#3b82f6', desc: 'Emoção, intuição, fluxo' },
        { id: 'fogo', name: 'Fogo', icon: '🔥', color: '#ef4444', desc: 'Paixão, transformação, energia' },
        { id: 'terra', name: 'Terra', icon: '🌍', color: '#22c55e', desc: 'Estabilidade, materialização, raízes' },
        { id: 'ar', name: 'Ar', icon: '💨', color: '#8b5cf6', desc: 'Intelecto, comunicação, liberdade' },
        { id: 'espirito', name: 'Espírito', icon: '✨', color: '#ec4899', desc: 'Transcendência, unificação, essência' }
    ];
    
    container.innerHTML = '';
    
    archetypes.forEach(arch => {
        const card = document.createElement('div');
        card.className = 'archetype-card';
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <div style="font-size: 24px;">${arch.icon}</div>
                <div>
                    <div style="font-weight: bold; color: ${arch.color}">${arch.name}</div>
                    <div style="font-size: 12px; color: #a0a0a0">${arch.desc}</div>
                </div>
            </div>
            <div style="font-size: 11px; color: #666; text-align: center">
                Arraste para o caldeirão
            </div>
        `;
        
        card.draggable = true;
        card.style.cursor = 'grab';
        card.style.userSelect = 'none';
        
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', arch.id);
            card.style.opacity = '0.5';
            showMessage(`Arrastando ${arch.name}...`);
        });
        
        card.addEventListener('dragend', () => {
            card.style.opacity = '1';
        });
        
        card.addEventListener('click', () => {
            showMessage(`Você selecionou ${arch.name}: ${arch.desc}`, 'info');
        });
        
        container.appendChild(card);
    });
}

function setupDragAndDrop() {
    const cauldron = document.getElementById('caldeiraoAlquimico');
    if (!cauldron) return;
    
    // Permitir soltar
    cauldron.addEventListener('dragover', (e) => {
        e.preventDefault();
        cauldron.style.borderColor = '#d4b192';
        cauldron.style.boxShadow = '0 0 20px #d4b192';
    });
    
    cauldron.addEventListener('dragleave', () => {
        cauldron.style.borderColor = '';
        cauldron.style.boxShadow = '';
    });
    
    cauldron.addEventListener('drop', (e) => {
        e.preventDefault();
        cauldron.style.borderColor = '';
        cauldron.style.boxShadow = '';
        
        const archetypeId = e.dataTransfer.getData('text/plain');
        
        if (archetypeId) {
            handleTransmutation(archetypeId);
        }
    });
}

function handleTransmutation(archetypeId) {
    // Mapear arquétipos para emojis
    const archMap = {
        'agua': '🌊',
        'fogo': '🔥', 
        'terra': '🌍',
        'ar': '💨',
        'espirito': '✨'
    };
    
    // Obter elementos atuais no caldeirão
    const ingredients = document.getElementById('cauldronIngredients') || 
                       (function() {
                           const div = document.createElement('div');
                           div.id = 'cauldronIngredients';
                           div.className = 'ingredients-display';
                           document.querySelector('.caldeirao-visual').appendChild(div);
                           return div;
                       })();
    
    // Adicionar novo ingrediente
    const ingredient = document.createElement('div');
    ingredient.className = 'cauldron-element';
    ingredient.textContent = archMap[archetypeId] || '✨';
    ingredient.style.animation = `float 2s ease-in-out ${Math.random() * 2}s infinite`;
    
    ingredients.appendChild(ingredient);
    
    // Limitar a 4 ingredientes
    const elements = ingredients.querySelectorAll('.cauldron-element');
    if (elements.length > 4) {
        elements[0].remove();
    }
    
    // Verificar combinações
    checkForTransmutation(elements);
    
    showMessage(`Arquétipo adicionado ao caldeirão!`, 'success');
    
    // Efeito visual
    createCauldronEffect();
}

function checkForTransmutation(elements) {
    if (elements.length >= 2) {
        const elementCount = elements.length;
        
        // Mostrar botão de transmutação
        const transmuteBtn = document.getElementById('activateTransmutation') ||
                           (function() {
                               const btn = document.createElement('button');
                               btn.id = 'activateTransmutation';
                               btn.className = 'btn-cauldron';
                               btn.innerHTML = '<i class="fas fa-fire"></i> Transmutar!';
                               btn.style.position = 'absolute';
                               btn.style.bottom = '20px';
                               btn.style.left = '50%';
                               btn.style.transform = 'translateX(-50%)';
                               btn.addEventListener('click', performTransmutation);
                               document.querySelector('.caldeirao-container').appendChild(btn);
                               return btn;
                           })();
        
        transmuteBtn.style.display = 'block';
        
        // Atualizar líquido no caldeirão
        const liquid = document.getElementById('cauldronLiquid') ||
                      (function() {
                          const div = document.createElement('div');
                          div.id = 'cauldronLiquid';
                          div.className = 'liquid-layer';
                          document.querySelector('.caldeirao-visual').appendChild(div);
                          return div;
                      })();
        
        liquid.style.height = `${elementCount * 25}%`;
    }
}

function performTransmutation() {
    const ingredients = document.getElementById('cauldronIngredients');
    if (!ingredients) return;
    
    const elements = ingredients.querySelectorAll('.cauldron-element');
    const elementCount = elements.length;
    
    // Possíveis resultados baseados no número de elementos
    const results = [
        { elements: 2, name: 'Síntese Simples', icon: '⚗️', color: '#d4b192' },
        { elements: 3, name: 'Transmutação Tríplice', icon: '🔮', color: '#9d4edd' },
        { elements: 4, name: 'Quinta Essência', icon: '💎', color: '#ffd700' }
    ];
    
    const result = results.find(r => r.elements === elementCount) || results[0];
    
    // Mostrar resultado
    showMessage(`✨ Transmutação realizada! Resultado: ${result.name}`, 'success');
    
    // Efeito visual
    createExplosionEffect();
    
    // Limpar caldeirão
    setTimeout(() => {
        if (ingredients) ingredients.innerHTML = '';
        const liquid = document.getElementById('cauldronLiquid');
        if (liquid) liquid.style.height = '0%';
        
        const btn = document.getElementById('activateTransmutation');
        if (btn) btn.style.display = 'none';
        
        // Adicionar ao histórico
        addToJournal(elementCount, result.name);
    }, 1500);
}

function createCauldronEffect() {
    const cauldron = document.querySelector('.caldeirao-visual');
    if (!cauldron) return;
    
    // Criar bolhas
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                left: ${Math.random() * 80 + 10}%;
                bottom: 0;
                animation: bubbleRise 2s ease-out forwards;
            `;
            
            cauldron.appendChild(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
            }, 2000);
        }, i * 200);
    }
}

function createExplosionEffect() {
    const canvas = document.getElementById('labyrinthCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Criar partículas de explosão
    const particles = [];
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: centerX,
            y: centerY,
            size: Math.random() * 6 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1.0
        });
    }
    
    // Animar explosão
    function animateExplosion() {
        ctx.fillStyle = 'rgba(10, 10, 12, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let alive = false;
        
        particles.forEach(p => {
            if (p.life <= 0) return;
            
            alive = true;
            
            // Mover
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravidade
            p.life -= 0.02;
            
            // Desenhar
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
        
        if (alive) {
            requestAnimationFrame(animateExplosion);
        }
    }
    
    animateExplosion();
}

function addToJournal(elementCount, result) {
    const journal = document.getElementById('recentTransmutations');
    if (!journal) return;
    
    const entry = document.createElement('div');
    entry.className = 'transmutation-item';
    entry.innerHTML = `
        <div class="transmutation-elements">
            ${'✨'.repeat(elementCount)}
        </div>
        <div class="transmutation-result" style="color: #d4b192">
            → ${result}
        </div>
    `;
    
    // Adicionar no início
    journal.insertBefore(entry, journal.firstChild);
    
    // Limitar a 5 entradas
    const entries = journal.querySelectorAll('.transmutation-item');
    if (entries.length > 5) {
        entries[entries.length - 1].remove();
    }
}

function showMessage(message, type = 'info') {
    // Usar snackbar existente ou criar uma simples
    const snackbar = document.getElementById('snackbar') || createSnackbar();
    
    snackbar.textContent = message;
    snackbar.className = `snackbar snackbar-${type}`;
    snackbar.style.display = 'block';
    
    setTimeout(() => {
        snackbar.style.display = 'none';
    }, 3000);
}

function createSnackbar() {
    const snackbar = document.createElement('div');
    snackbar.id = 'snackbar';
    snackbar.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1a1a2e;
        border: 1px solid #d4b192;
        border-radius: 8px;
        padding: 12px 24px;
        color: white;
        z-index: 10000;
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(snackbar);
    return snackbar;
}

// Adicionar CSS de animações
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
    }
    
    @keyframes bubbleRise {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(0); opacity: 0; }
    }
    
    .archetype-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(212, 177, 146, 0.2);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 10px;
        cursor: grab;
        transition: all 0.3s ease;
    }
    
    .archetype-card:hover {
        background: rgba(212, 177, 146, 0.1);
        transform: translateX(5px);
    }
    
    .caldeirao-visual {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.3), transparent 70%),
                    radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.3), transparent 70%),
                    linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(10, 10, 12, 0.9));
        border: 2px solid #d4b192;
        box-shadow: inset 0 0 50px rgba(212, 177, 146, 0.2),
                    0 0 60px rgba(212, 177, 146, 0.3);
    }
    
    .ingredients-display {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        pointer-events: none;
    }
    
    .cauldron-element {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        font-size: 24px;
        animation: float 3s ease-in-out infinite;
    }
    
    .btn-cauldron {
        padding: 10px 20px;
        background: linear-gradient(135deg, #ef4444, #d4b192);
        border: none;
        border-radius: 8px;
        color: #0a0a0c;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-cauldron:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
    }
    
    .transmutation-item {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(212, 177, 146, 0.2);
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
document.head.appendChild(style);

console.log('✅ Athanor Simplificado carregado - O jogo AGORA FUNCIONA!');