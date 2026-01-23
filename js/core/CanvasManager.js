// CanvasManager.js - Handles canvas drawing and rendering

class CanvasManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.currentPath = [];
        this.paths = [];
        this.gridVisible = true;
        
        console.log('🎨 CanvasManager inicializado');
    }
    
    init(canvasId = 'labyrinthCanvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('❌ Canvas não encontrado:', canvasId);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.resize();
        
        // Draw initial grid
        this.drawGrid();
        
        return this;
    }
    
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Touch events
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Window resize
        window.addEventListener('resize', () => this.resize());
    }
    
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.startDrawing(x, y);
    }
    
    handleMouseMove(e) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.draw(x, y);
    }
    
    handleMouseUp() {
        this.stopDrawing();
    }
    
    handleMouseLeave() {
        this.stopDrawing();
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        this.startDrawing(x, y);
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.isDrawing) return;
        
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        this.draw(x, y);
    }
    
    handleTouchEnd() {
        this.stopDrawing();
    }
    
    startDrawing(x, y) {
        this.isDrawing = true;
        this.lastX = x;
        this.lastY = y;
        this.currentPath = [{x, y}];
        
        // Start new path
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'rgba(212, 177, 146, 0.8)';
        
        // Emit event
        this.emit('drawStart', {x, y});
    }
    
    draw(x, y) {
        if (!this.isDrawing) return;
        
        // Draw line
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        // Add to current path
        this.currentPath.push({x, y});
        
        // Update last position
        this.lastX = x;
        this.lastY = y;
        
        // Emit event
        this.emit('draw', {x, y, path: this.currentPath});
    }
    
    stopDrawing() {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        this.ctx.closePath();
        
        // Save path
        if (this.currentPath.length > 1) {
            this.paths.push([...this.currentPath]);
        }
        
        // Emit event
        this.emit('drawEnd', {path: this.currentPath});
        
        // Clear current path
        this.currentPath = [];
    }
    
    drawGrid() {
        if (!this.gridVisible || !this.ctx) return;
        
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
    }
    
    toggleGrid() {
        this.gridVisible = !this.gridVisible;
        this.clear();
        if (this.gridVisible) {
            this.drawGrid();
        }
        this.redrawPaths();
        return this.gridVisible;
    }
    
    clear() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
    }
    
    redrawPaths() {
        if (!this.ctx) return;
        
        // Redraw all saved paths
        this.paths.forEach(path => {
            if (path.length < 2) return;
            
            this.ctx.beginPath();
            this.ctx.moveTo(path[0].x, path[0].y);
            this.ctx.lineWidth = 3;
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = 'rgba(212, 177, 146, 0.8)';
            
            for (let i = 1; i < path.length; i++) {
                this.ctx.lineTo(path[i].x, path[i].y);
            }
            
            this.ctx.stroke();
            this.ctx.closePath();
        });
    }
    
    resize() {
        if (!this.canvas) return;
        
        const container = this.canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = container.clientWidth * dpr;
        this.canvas.height = container.clientHeight * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = `${container.clientWidth}px`;
        this.canvas.style.height = `${container.clientHeight}px`;
        
        // Redraw
        this.clear();
        this.redrawPaths();
    }
    
    exportAsImage() {
        if (!this.canvas) return null;
        
        return this.canvas.toDataURL('image/png');
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
    window.CanvasManager = CanvasManager;
}