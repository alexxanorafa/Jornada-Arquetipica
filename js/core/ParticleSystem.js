// ParticleSystem.js - Handles particle effects and animations

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = null;
        this.isRunning = false;
        
        console.log('✨ ParticleSystem inicializado');
    }
    
    init(containerId = 'particleContainer') {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.warn('⚠️ Container de partículas não encontrado');
            this.container = document.createElement('div');
            this.container.id = 'particleContainer';
            this.container.style.position = 'absolute';
            this.container.style.top = '0';
            this.container.style.left = '0';
            this.container.style.width = '100%';
            this.container.style.height = '100%';
            this.container.style.pointerEvents = 'none';
            this.container.style.zIndex = '1';
            document.body.appendChild(this.container);
        }
        
        this.start();
        return this;
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.update();
    }
    
    stop() {
        this.isRunning = false;
    }
    
    update() {
        if (!this.isRunning) return;
        
        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            
            if (particle.isDead()) {
                particle.remove();
                this.particles.splice(i, 1);
            }
        }
        
        // Continue animation loop
        requestAnimationFrame(() => this.update());
    }
    
    createTrail(fromX, fromY, toX, toY, color = '#d4b192', count = 3) {
        for (let i = 0; i < count; i++) {
            const particle = new Particle({
                x: fromX + (Math.random() - 0.5) * 10,
                y: fromY + (Math.random() - 0.5) * 10,
                color,
                size: Math.random() * 3 + 1,
                life: 0.5,
                velocity: {
                    x: (toX - fromX) * 0.1 + (Math.random() - 0.5) * 2,
                    y: (toY - fromY) * 0.1 + (Math.random() - 0.5) * 2
                },
                container: this.container
            });
            
            this.particles.push(particle);
        }
    }
    
    createAttraction(fromX, fromY, toX, toY, archetype, count = 5) {
        const colors = {
            agua: '#3b82f6',
            fogo: '#ef4444',
            terra: '#22c55e',
            ar: '#8b5cf6',
            espirito: '#ec4899',
            sombra: '#6b7280',
            luz: '#fbbf24'
        };
        
        const color = colors[archetype] || '#d4b192';
        
        for (let i = 0; i < count; i++) {
            const particle = new Particle({
                x: fromX,
                y: fromY,
                color,
                size: Math.random() * 4 + 2,
                life: 1.5,
                velocity: {
                    x: (toX - fromX) * 0.05 + (Math.random() - 0.5) * 1,
                    y: (toY - fromY) * 0.05 + (Math.random() - 0.5) * 1
                },
                gravity: { x: 0, y: 0 },
                container: this.container
            });
            
            this.particles.push(particle);
        }
    }
    
    createExplosion(x, y, color = '#ef4444', count = 15) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            
            const particle = new Particle({
                x,
                y,
                color,
                size: Math.random() * 5 + 2,
                life: 1,
                velocity: {
                    x: Math.cos(angle) * speed,
                    y: Math.sin(angle) * speed
                },
                gravity: { x: 0, y: 0.1 },
                container: this.container
            });
            
            this.particles.push(particle);
        }
    }
    
    createSymbolEffect(x, y, symbol, color = '#d4b192') {
        // Create symbol particle
        const particle = new Particle({
            x,
            y,
            symbol,
            color,
            size: 48,
            life: 2,
            velocity: { x: 0, y: -1 },
            gravity: { x: 0, y: 0.05 },
            container: this.container,
            type: 'symbol'
        });
        
        this.particles.push(particle);
        
        // Create surrounding particles
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const particle = new Particle({
                x,
                y,
                color,
                size: Math.random() * 4 + 2,
                life: 1.5,
                velocity: {
                    x: Math.cos(angle) * 2,
                    y: Math.sin(angle) * 2
                },
                gravity: { x: 0, y: 0.1 },
                container: this.container
            });
            
            this.particles.push(particle);
        }
    }
    
    clear() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }
}

class Particle {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.color = options.color || '#ffffff';
        this.size = options.size || 2;
        this.life = options.life || 1;
        this.maxLife = this.life;
        this.velocity = options.velocity || { x: 0, y: 0 };
        this.gravity = options.gravity || { x: 0, y: 0 };
        this.container = options.container;
        this.type = options.type || 'circle';
        this.symbol = options.symbol;
        
        this.element = this.createElement();
        this.container.appendChild(this.element);
        this.updatePosition();
    }
    
    createElement() {
        const element = document.createElement('div');
        element.className = 'particle';
        element.style.position = 'absolute';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1000';
        
        if (this.type === 'symbol') {
            element.style.fontSize = `${this.size}px`;
            element.textContent = this.symbol;
            element.style.color = this.color;
            element.style.textShadow = `0 0 10px ${this.color}`;
        } else {
            element.style.width = `${this.size}px`;
            element.style.height = `${this.size}px`;
            element.style.backgroundColor = this.color;
            element.style.borderRadius = '50%';
            element.style.boxShadow = `0 0 ${this.size}px ${this.color}`;
        }
        
        return element;
    }
    
    update() {
        // Apply velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Apply gravity
        this.velocity.x += this.gravity.x;
        this.velocity.y += this.gravity.y;
        
        // Decrease life
        this.life -= 0.016; // ~60 FPS
        
        // Update opacity based on life
        const opacity = this.life / this.maxLife;
        this.element.style.opacity = opacity;
        
        // Update size based on life
        if (this.type !== 'symbol') {
            const currentSize = this.size * (0.5 + opacity * 0.5);
            this.element.style.width = `${currentSize}px`;
            this.element.style.height = `${currentSize}px`;
        }
        
        this.updatePosition();
    }
    
    updatePosition() {
        this.element.style.transform = `translate(${this.x - this.size / 2}px, ${this.y - this.size / 2}px)`;
    }
    
    isDead() {
        return this.life <= 0;
    }
    
    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.ParticleSystem = ParticleSystem;
}