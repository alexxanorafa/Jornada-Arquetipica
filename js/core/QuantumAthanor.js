// QuantumAthanor.js - Main application class

class QuantumAthanor {
    constructor() {
        this.state = {
            activeElements: new Set(),
            precision: 0,
            quantumState: 'superposition',
            temperature: 650,
            sessionStart: new Date(),
            unsavedChanges: false
        };
        
        this.components = {
            canvas: null,
            particles: null,
            progression: null,
            achievements: null,
            journal: null
        };
        
        this.init();
    }
    
    async init() {
        console.log('🧪 Inicializando Quantum Athanor...');
        
        // Initialize sub-systems
        this.components.canvas = new CanvasManager();
        this.components.particles = new ParticleSystem();
        this.components.progression = new ProgressionSystem();
        this.components.achievements = new AchievementManager();
        this.components.journal = new JournalManager();
        
        // Setup canvas
        this.setupCanvas();
        
        // Load user data
        await this.loadUserData();
        
        // Bind events
        this.bindEvents();
        
        // Render initial content
        this.renderArquetipos();
        this.renderSimbolos();
        
        // Start animation loops
        this.startAnimationLoops();
        
        // Initialize timer
        this.startSessionTimer();
        
        console.log('✅ Quantum Athanor inicializado');
    }
    
    setupCanvas() {
        const canvas = document.getElementById('labyrinthCanvas');
        const ctx = canvas.getContext('2d');
        
        this.canvas = canvas;
        this.ctx = ctx;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Setup drawing
        this.setupDrawing();
        
        // Draw initial labyrinth
        this.drawLabyrinth();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = container.clientWidth * dpr;
        this.canvas.height = container.clientHeight * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = `${container.clientWidth}px`;
        this.canvas.style.height = `${container.clientHeight}px`;
        
        // Redraw
        this.drawLabyrinth();
    }
    
    setupDrawing() {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        
        this.canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = this.getCanvasCoordinates(e);
            this.startPath(lastX, lastY);
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            
            const [x, y] = this.getCanvasCoordinates(e);
            this.drawPath(lastX, lastY, x, y);
            [lastX, lastY] = [x, y];
            
            // Create particle trail
            this.components.particles.createTrail(lastX, lastY, x, y);
        });
        
        this.canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            this.endPath();
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
            this.endPath();
        });
        
        // Touch support
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            isDrawing = true;
            [lastX, lastY] = this.getCanvasCoordinates(touch);
            this.startPath(lastX, lastY);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!isDrawing) return;
            
            const touch = e.touches[0];
            const [x, y] = this.getCanvasCoordinates(touch);
            this.drawPath(lastX, lastY, x, y);
            [lastX, lastY] = [x, y];
            
            this.components.particles.createTrail(lastX, lastY, x, y);
        });
        
        this.canvas.addEventListener('touchend', () => {
            isDrawing = false;
            this.endPath();
        });
    }
    
    getCanvasCoordinates(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return [x, y];
    }
    
    startPath(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'rgba(212, 177, 146, 0.8)';
        
        // Update quantum state
        this.updateQuantumState('drawing');
    }
    
    drawPath(fromX, fromY, toX, toY) {
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();
        
        // Check for archetype proximity
        this.checkArchetypeProximity(toX, toY);
    }
    
    endPath() {
        this.ctx.closePath();
        this.updateQuantumState('observing');
        
        // Check for successful paths
        this.checkPathCompletion();
    }
    
    checkArchetypeProximity(x, y) {
        // This would check if the drawing is near an archetype symbol
        // and trigger quantum attraction
        const proximityThreshold = 30;
        
        document.querySelectorAll('.archetype-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const canvasRect = this.canvas.getBoundingClientRect();
            
            const cardX = rect.left - canvasRect.left + rect.width / 2;
            const cardY = rect.top - canvasRect.top + rect.height / 2;
            
            const distance = Math.sqrt(Math.pow(x - cardX, 2) + Math.pow(y - cardY, 2));
            
            if (distance < proximityThreshold) {
                this.attractToArchetype(x, y, cardX, cardY, card.dataset.archetype);
            }
        });
    }
    
    attractToArchetype(fromX, fromY, toX, toY, archetype) {
        // Create quantum attraction effect
        this.components.particles.createAttraction(fromX, fromY, toX, toY, archetype);
        
        // Update precision
        this.state.precision = Math.min(100, this.state.precision + 5);
        this.updatePrecisionDisplay();
    }
    
    checkPathCompletion() {
        // Check if drawn path connects archetypes
        const activeCards = document.querySelectorAll('.archetype-card.selected');
        
        if (activeCards.length >= 2) {
            const archetypes = Array.from(activeCards).map(card => card.dataset.archetype);
            this.attemptTransmutation(archetypes);
        }
    }
    
    async attemptTransmutation(archetypes) {
        console.log(`🔄 Tentando transmutação: ${archetypes.join(' + ')}`);
        
        // Check if fusion is valid
        const fusion = this.findFusion(archetypes);
        
        if (fusion) {
            // Successful transmutation
            await this.performTransmutation(archetypes, fusion);
        } else {
            // Failed transmutation
            this.handleFailedTransmutation(archetypes);
        }
    }
    
    findFusion(archetypes) {
        const sortedArchetypes = [...archetypes].sort();
        const fusionKey = sortedArchetypes.join(',');
        
        // Check in database
        const fusion = window.athanorDatabase?.fusions?.[fusionKey];
        
        if (fusion) {
            return fusion;
        }
        
        // Check reverse order
        const reverseKey = sortedArchetypes.reverse().join(',');
        return window.athanorDatabase?.fusions?.[reverseKey];
    }
    
    async performTransmutation(archetypes, fusion) {
        // Show feedback
        this.showTransmutationFeedback(fusion);
        
        // Play sound
        this.playSound('transmute');
        
        // Update state
        this.state.activeElements.clear();
        this.updateCauldronDisplay();
        
        // Add to journal
        this.components.journal.addEntry(archetypes, fusion);
        
        // Update progression
        this.components.progression.addTransmutation(fusion);
        
        // Check achievements
        this.components.achievements.checkTransmutationAchievements(archetypes, fusion);
        
        // Update narrative
        this.updateNarrative(fusion);
        
        // Mark changes
        this.state.unsavedChanges = true;
        
        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    handleFailedTransmutation(archetypes) {
        console.log(`❌ Transmutação falhou: ${archetypes.join(' + ')}`);
        
        showSnackbar('Combinação não reconhecida. Tente outros arquétipos.', 'warning');
        
        // Create explosion effect
        this.components.particles.createExplosion(
            this.canvas.width / 2,
            this.canvas.height / 2
        );
        
        // Play error sound
        this.playSound('error');
    }
    
    updateQuantumState(state) {
        this.state.quantumState = state;
        
        const display = document.getElementById('quantumState');
        if (display) {
            display.textContent = this.getQuantumStateLabel(state);
            
            // Add visual feedback
            display.classList.add('quantum-fluctuate');
            setTimeout(() => display.classList.remove('quantum-fluctuate'), 1000);
        }
    }
    
    getQuantumStateLabel(state) {
        const states = {
            'superposition': 'Superposição',
            'drawing': 'Observando',
            'transmuting': 'Transmutando',
            'entangled': 'Emaranhado',
            'collapsed': 'Colapsado'
        };
        
        return states[state] || state;
    }
    
    updatePrecisionDisplay() {
        const precisionElement = document.getElementById('precisionDisplay');
        if (precisionElement) {
            precisionElement.textContent = `${this.state.precision}%`;
            precisionElement.style.width = `${this.state.precision}%`;
        }
    }
    
    updateCauldronDisplay() {
        const cauldronLiquid = document.getElementById('cauldronLiquid');
        const cauldronTemp = document.getElementById('cauldronTemp');
        const activeElements = document.getElementById('activeElementsGrid');
        
        if (cauldronLiquid) {
            const level = Math.min(100, this.state.activeElements.size * 25);
            cauldronLiquid.style.height = `${level}%`;
        }
        
        if (cauldronTemp) {
            cauldronTemp.textContent = `${this.state.temperature}°C`;
        }
        
        if (activeElements) {
            activeElements.innerHTML = '';
            this.state.activeElements.forEach(element => {
                const elem = document.createElement('div');
                elem.className = 'active-element';
                elem.textContent = this.getArchetypeIcon(element);
                elem.title = element;
                activeElements.appendChild(elem);
            });
        }
    }
    
    updateNarrative(fusion) {
        const content = document.getElementById('narrativaContent');
        if (content && fusion?.narrative) {
            content.textContent = fusion.narrative;
            content.classList.add('text-reveal');
        }
    }
    
    showTransmutationFeedback(fusion) {
        const feedback = document.getElementById('transmutationFeedback');
        const icon = document.getElementById('feedbackIcon');
        const text = document.getElementById('feedbackText');
        
        if (feedback && icon && text) {
            icon.textContent = fusion?.icon || '✨';
            text.textContent = fusion?.name || 'Transmutação realizada!';
            
            feedback.removeAttribute('hidden');
            
            // Animate
            anime({
                targets: feedback,
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1, 0],
                duration: 2000,
                easing: 'easeOutElastic(1, .8)',
                complete: () => feedback.setAttribute('hidden', 'true')
            });
        }
    }
    
    playSound(soundName) {
        const audio = document.getElementById(`${soundName}Sound`);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio playback failed:', e));
        }
    }
    
    startAnimationLoops() {
        // Quantum particle loop
        const quantumLoop = () => {
            this.components.particles.update();
            requestAnimationFrame(quantumLoop);
        };
        quantumLoop();
        
        // Cauldron animation loop
        const cauldronLoop = () => {
            this.animateCauldron();
            setTimeout(cauldronLoop, 100);
        };
        cauldronLoop();
    }
    
    animateCauldron() {
        const bubbles = document.getElementById('cauldronBubbles');
        if (!bubbles || this.state.activeElements.size === 0) return;
        
        // Create random bubbles
        if (Math.random() > 0.7) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.width = `${Math.random() * 10 + 5}px`;
            bubble.style.height = bubble.style.width;
            bubble.style.animationDuration = `${Math.random() * 2 + 1}s`;
            
            bubbles.appendChild(bubble);
            
            // Remove after animation
            setTimeout(() => {
                if (bubble.parentNode === bubbles) {
                    bubbles.removeChild(bubble);
                }
            }, 3000);
        }
    }
    
    startSessionTimer() {
        const timerElement = document.getElementById('time');
        if (!timerElement) return;
        
        setInterval(() => {
            const now = new Date();
            const diff = now - this.state.sessionStart;
            
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            
            timerElement.textContent = 
                `${hours.toString().padStart(2, '0')}:` +
                `${minutes.toString().padStart(2, '0')}:` +
                `${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    renderArquetipos() {
        const container = document.getElementById('deckArquetipos');
        if (!container || !window.athanorDatabase?.archetypes) return;
        
        container.innerHTML = '';
        
        Object.entries(window.athanorDatabase.archetypes).forEach(([id, archetype]) => {
            const card = this.createArchetypeCard(id, archetype);
            container.appendChild(card);
        });
    }
    
    createArchetypeCard(id, archetype) {
        const card = document.createElement('div');
        card.className = 'archetype-card';
        card.dataset.archetype = id;
        card.draggable = true;
        card.tabIndex = 0;
        
        card.innerHTML = `
            <div class="archetype-header">
                <div class="archetype-icon" style="color: ${archetype.color || '#d4b192'}">
                    ${archetype.icon || '✨'}
                </div>
                <div class="archetype-title">
                    <div class="archetype-name">${archetype.title}</div>
                    <div class="archetype-subtitle">${archetype.subtitle || ''}</div>
                </div>
            </div>
            <div class="archetype-description">
                ${archetype.description || ''}
            </div>
            <div class="archetype-properties">
                ${(archetype.properties || []).map(prop => 
                    `<span class="property-tag">${prop}</span>`
                ).join('')}
            </div>
        `;
        
        // Add event listeners
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectArchetype(id, archetype, card);
        });
        
        card.addEventListener('dblclick', () => {
            this.addToCauldron(id, archetype);
        });
        
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', id);
            card.classList.add('dragging');
        });
        
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.selectArchetype(id, archetype, card);
            }
        });
        
        return card;
    }
    
    selectArchetype(id, archetype, card) {
        // Toggle selection
        card.classList.toggle('selected');
        
        if (card.classList.contains('selected')) {
            this.state.activeElements.add(id);
            
            // Update narrative
            const content = document.getElementById('narrativaContent');
            if (content) {
                content.innerHTML = `
                    <strong>${archetype.title}</strong><br>
                    <em>${archetype.subtitle}</em><br><br>
                    ${archetype.description || ''}<br><br>
                    <small>${archetype.scientific || ''}</small>
                `;
            }
        } else {
            this.state.activeElements.delete(id);
        }
        
        this.updateCauldronDisplay();
        
        // Check if transmutation is possible
        if (this.state.activeElements.size >= 2) {
            this.showTransmutationReady();
        }
    }
    
    addToCauldron(id, archetype) {
        this.state.activeElements.add(id);
        this.updateCauldronDisplay();
        
        showSnackbar(`${archetype.title} adicionado ao caldeirão`, 'success');
        
        // Animate to cauldron
        this.animateToCauldron(id, archetype.icon);
    }
    
    animateToCauldron(id, icon) {
        const card = document.querySelector(`[data-archetype="${id}"]`);
        if (!card) return;
        
        const cauldron = document.getElementById('caldeiraoAlquimico');
        if (!cauldron) return;
        
        const cardRect = card.getBoundingClientRect();
        const cauldronRect = cauldron.getBoundingClientRect();
        
        // Create flying element
        const flyingElement = document.createElement('div');
        flyingElement.className = 'flying-element';
        flyingElement.innerHTML = icon;
        flyingElement.style.position = 'fixed';
        flyingElement.style.left = `${cardRect.left + cardRect.width / 2}px`;
        flyingElement.style.top = `${cardRect.top + cardRect.height / 2}px`;
        flyingElement.style.fontSize = '24px';
        flyingElement.style.zIndex = '1000';
        flyingElement.style.pointerEvents = 'none';
        
        document.body.appendChild(flyingElement);
        
        // Animate to cauldron
        anime({
            targets: flyingElement,
            left: cauldronRect.left + cauldronRect.width / 2,
            top: cauldronRect.top + cauldronRect.height / 2,
            scale: [1, 1.5, 0.5],
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeInOutQuad',
            complete: () => {
                document.body.removeChild(flyingElement);
            }
        });
    }
    
    showTransmutationReady() {
        const indicator = document.getElementById('transmutationReady');
        if (indicator) {
            indicator.removeAttribute('hidden');
            
            // Pulse animation
            anime({
                targets: indicator,
                scale: [1, 1.1, 1],
                duration: 1000,
                loop: true,
                easing: 'easeInOutSine'
            });
        }
    }
    
    renderSimbolos() {
        const container = document.getElementById('gridSimbolos');
        if (!container) return;
        
        const symbols = [
            '☿', '♀', '♁', '♂', '♃', '♄', '♅', '♆', '♇',
            '☉', '☽', '⚷', '⚶', '⛢', '♈', '♉', '♊', '♋',
            '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎'
        ];
        
        container.innerHTML = '';
        
        symbols.forEach(symbol => {
            const item = document.createElement('div');
            item.className = 'symbol-item';
            item.textContent = symbol;
            item.title = `Símbolo: ${symbol}`;
            
            item.addEventListener('click', () => {
                this.addSymbolToCanvas(symbol);
            });
            
            container.appendChild(item);
        });
    }
    
    addSymbolToCanvas(symbol) {
        // Add symbol to canvas at random position
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        
        this.ctx.font = '48px serif';
        this.ctx.fillStyle = 'rgba(212, 177, 146, 0.7)';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(symbol, x, y);
        
        // Add particle effect
        this.components.particles.createSymbolEffect(x, y, symbol);
        
        showSnackbar(`Símbolo ${symbol} adicionado ao labirinto`, 'info');
    }
    
    drawLabyrinth() {
        const { width, height } = this.canvas;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw background
        const gradient = this.ctx.createRadialGradient(
            width / 2, height / 2, 0,
            width / 2, height / 2, Math.max(width, height) / 2
        );
        gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
        gradient.addColorStop(1, 'rgba(10, 10, 12, 0.3)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw quantum grid
        this.drawQuantumGrid();
        
        // Draw archetype positions if any are selected
        this.drawArchetypeConnections();
    }
    
    drawQuantumGrid() {
        const { width, height } = this.canvas;
        const gridSize = 50;
        
        this.ctx.strokeStyle = 'rgba(212, 177, 146, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let x = 0; x < width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
        
        // Draw quantum dots at intersections
        this.ctx.fillStyle = 'rgba(0, 229, 255, 0.2)';
        for (let x = gridSize / 2; x < width; x += gridSize) {
            for (let y = gridSize / 2; y < height; y += gridSize) {
                this.ctx.beginPath();
                this.ctx.arc(x, y, 1, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
    
    drawArchetypeConnections() {
        const selectedCards = document.querySelectorAll('.archetype-card.selected');
        if (selectedCards.length < 2) return;
        
        const canvasRect = this.canvas.getBoundingClientRect();
        const points = [];
        
        // Get center points of selected cards
        selectedCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            points.push({
                x: rect.left - canvasRect.left + rect.width / 2,
                y: rect.top - canvasRect.top + rect.height / 2,
                color: card.querySelector('.archetype-icon').style.color || '#d4b192'
            });
        });
        
        // Draw connections
        this.ctx.strokeStyle = 'rgba(212, 177, 146, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        for (let i = 0; i < points.length - 1; i++) {
            for (let j = i + 1; j < points.length; j++) {
                this.ctx.beginPath();
                this.ctx.moveTo(points[i].x, points[i].y);
                this.ctx.lineTo(points[j].x, points[j].y);
                this.ctx.stroke();
            }
        }
        
        this.ctx.setLineDash([]);
        
        // Draw points
        points.forEach(point => {
            this.ctx.fillStyle = point.color;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
            this.ctx.stroke();
        });
    }
    
    async loadUserData() {
        try {
            // Load from localStorage
            const savedData = localStorage.getItem('athanor_user_data');
            
            if (savedData) {
                const data = JSON.parse(savedData);
                
                // Restore state
                if (data.activeElements) {
                    this.state.activeElements = new Set(data.activeElements);
                }
                
                if (data.precision) {
                    this.state.precision = data.precision;
                }
                
                // Restore progression
                if (data.progression) {
                    this.components.progression.load(data.progression);
                }
                
                console.log('📂 Dados do usuário carregados');
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
        }
    }
    
    saveUserData() {
        try {
            const data = {
                activeElements: Array.from(this.state.activeElements),
                precision: this.state.precision,
                progression: this.components.progression.export(),
                savedAt: new Date().toISOString()
            };
            
            localStorage.setItem('athanor_user_data', JSON.stringify(data));
            this.state.unsavedChanges = false;
            
            console.log('💾 Dados do usuário salvos');
            showSnackbar('Progresso salvo', 'success');
        } catch (error) {
            console.error('❌ Erro ao salvar dados:', error);
            showSnackbar('Erro ao salvar progresso', 'error');
        }
    }
    
    hasUnsavedChanges() {
        return this.state.unsavedChanges;
    }
    
    getArchetypeIcon(archetypeId) {
        const archetype = window.athanorDatabase?.archetypes?.[archetypeId];
        return archetype?.icon || '✨';
    }
    
    // Public API
    clearCanvas() {
        this.drawLabyrinth();
        showSnackbar('Labirinto limpo', 'info');
    }
    
    resetTransmutation() {
        this.state.activeElements.clear();
        this.updateCauldronDisplay();
        
        document.querySelectorAll('.archetype-card.selected').forEach(card => {
            card.classList.remove('selected');
        });
        
        const indicator = document.getElementById('transmutationReady');
        if (indicator) {
            indicator.setAttribute('hidden', 'true');
        }
        
        showSnackbar('Transmutação resetada', 'info');
    }
    
    exportCanvas() {
        const dataUrl = this.canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `athanor-labirinto-${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();
        
        showSnackbar('Labirinto exportado como imagem', 'success');
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.QuantumAthanor = QuantumAthanor;
}