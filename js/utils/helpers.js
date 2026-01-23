// helpers.js - Utility functions

class Helpers {
    // DOM Manipulation
    static createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else if (key.startsWith('data-')) {
                element.setAttribute(key, value);
            } else if (key === 'style') {
                Object.assign(element.style, value);
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
    
    static removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    
    static showElement(element) {
        element.style.display = '';
        element.removeAttribute('hidden');
    }
    
    static hideElement(element) {
        element.style.display = 'none';
        element.setAttribute('hidden', 'true');
    }
    
    static toggleElement(element) {
        if (element.style.display === 'none' || element.hasAttribute('hidden')) {
            this.showElement(element);
        } else {
            this.hideElement(element);
        }
    }
    
    // String Utilities
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    static camelToTitle(text) {
        return text
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }
    
    static truncate(text, length = 100, suffix = '...') {
        if (text.length <= length) return text;
        return text.substring(0, length - suffix.length) + suffix;
    }
    
    static generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Array Utilities
    static shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    static sample(array, count = 1) {
        const shuffled = this.shuffle(array);
        return count === 1 ? shuffled[0] : shuffled.slice(0, count);
    }
    
    static chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    
    // Object Utilities
    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    
    static merge(...objects) {
        return objects.reduce((merged, current) => ({ ...merged, ...current }), {});
    }
    
    static filterObject(obj, predicate) {
        return Object.fromEntries(
            Object.entries(obj).filter(([key, value]) => predicate(key, value))
        );
    }
    
    // Number Utilities
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    
    static lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    
    static map(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
    
    // Color Utilities
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    static rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    
    static lightenColor(hex, percent) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        
        const r = Math.min(255, rgb.r + (255 - rgb.r) * percent);
        const g = Math.min(255, rgb.g + (255 - rgb.g) * percent);
        const b = Math.min(255, rgb.b + (255 - rgb.b) * percent);
        
        return this.rgbToHex(Math.floor(r), Math.floor(g), Math.floor(b));
    }
    
    static darkenColor(hex, percent) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        
        const r = Math.max(0, rgb.r * (1 - percent));
        const g = Math.max(0, rgb.g * (1 - percent));
        const b = Math.max(0, rgb.b * (1 - percent));
        
        return this.rgbToHex(Math.floor(r), Math.floor(g), Math.floor(b));
    }
    
    // Date Utilities
    static formatDate(date, format = 'pt-BR') {
        return new Intl.DateTimeFormat(format, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
    
    static timeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        const intervals = {
            ano: 31536000,
            mês: 2592000,
            semana: 604800,
            dia: 86400,
            hora: 3600,
            minuto: 60,
            segundo: 1
        };
        
        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return interval === 1 ? `há 1 ${unit}` : `há ${interval} ${unit}s`;
            }
        }
        
        return 'agora mesmo';
    }
    
    // Animation Utilities
    static animate(element, keyframes, options = {}) {
        return element.animate(keyframes, {
            duration: 300,
            fill: 'both',
            ...options
        });
    }
    
    static fadeIn(element, duration = 300) {
        return this.animate(element, [
            { opacity: 0 },
            { opacity: 1 }
        ], { duration });
    }
    
    static fadeOut(element, duration = 300) {
        return this.animate(element, [
            { opacity: 1 },
            { opacity: 0 }
        ], { duration });
    }
    
    static slideIn(element, duration = 300) {
        return this.animate(element, [
            { transform: 'translateY(-20px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ], { duration });
    }
    
    static slideOut(element, duration = 300) {
        return this.animate(element, [
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(20px)', opacity: 0 }
        ], { duration });
    }
    
    // Event Utilities
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Storage Utilities
    static getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage key "${key}":`, error);
            return defaultValue;
        }
    }
    
    static setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage key "${key}":`, error);
            return false;
        }
    }
    
    static removeStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing from localStorage key "${key}":`, error);
            return false;
        }
    }
    
    static clearStorage() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
    
    // Validation
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    static isEmpty(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return value.trim() === '';
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    }
    
    // Math
    static distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
    static angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }
    
    static normalize(value, min, max) {
        return (value - min) / (max - min);
    }
    
    // Audio
    static playAudio(src, volume = 0.7) {
        const audio = new Audio(src);
        audio.volume = volume;
        audio.play().catch(e => console.log('Audio play failed:', e));
        return audio;
    }
    
    // Device Detection
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    static isDarkMode() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Performance
    static measurePerformance(name, func) {
        const start = performance.now();
        const result = func();
        const end = performance.now();
        console.log(`${name} took ${end - start}ms`);
        return result;
    }
    
    static async measureAsyncPerformance(name, asyncFunc) {
        const start = performance.now();
        const result = await asyncFunc();
        const end = performance.now();
        console.log(`${name} took ${end - start}ms`);
        return result;
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.Helpers = Helpers;
}

console.log('✅ Helpers carregados');