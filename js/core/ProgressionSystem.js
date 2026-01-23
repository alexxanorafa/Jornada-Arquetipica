// ProgressionSystem.js - Handles user progression and achievements

class ProgressionSystem {
    constructor() {
        this.userData = {
            level: 1,
            experience: 0,
            transmutations: [],
            discoveredFusions: new Set(),
            achievements: new Set(),
            playTime: 0,
            sessionStart: new Date()
        };
        
        this.levels = [
            { level: 1, xpRequired: 0, title: "Aprendiz" },
            { level: 2, xpRequired: 100, title: "Noviço" },
            { level: 3, xpRequired: 300, title: "Adepto" },
            { level: 4, xpRequired: 600, title: "Mago" },
            { level: 5, xpRequired: 1000, title: "Arquimago" },
            { level: 6, xpRequired: 1500, title: "Alquimista" },
            { level: 7, xpRequired: 2100, title: "Mestre Alquimista" },
            { level: 8, xpRequired: 2800, title: "Grão-Mestre" },
            { level: 9, xpRequired: 3600, title: "Iluminado" },
            { level: 10, xpRequired: 4500, title: "Transmutador Supremo" }
        ];
        
        console.log('📊 ProgressionSystem inicializado');
    }
    
    load(savedData) {
        if (savedData) {
            this.userData = { ...this.userData, ...savedData };
            this.userData.discoveredFusions = new Set(savedData.discoveredFusions || []);
            this.userData.achievements = new Set(savedData.achievements || []);
            console.log('📂 Dados de progresso carregados');
        }
    }
    
    save() {
        const dataToSave = {
            ...this.userData,
            discoveredFusions: Array.from(this.userData.discoveredFusions),
            achievements: Array.from(this.userData.achievements)
        };
        
        localStorage.setItem('athanor_progression', JSON.stringify(dataToSave));
        return dataToSave;
    }
    
    addTransmutation(fusion) {
        const transmutation = {
            id: fusion.id || Date.now().toString(),
            fusion: fusion.name,
            elements: fusion.elements || [],
            result: fusion.result,
            timestamp: new Date(),
            xp: fusion.xp || 50
        };
        
        this.userData.transmutations.push(transmutation);
        
        // Add to discovered fusions
        if (fusion.id) {
            this.userData.discoveredFusions.add(fusion.id);
        }
        
        // Add XP
        this.addExperience(fusion.xp || 50);
        
        // Check for level up
        this.checkLevelUp();
        
        return transmutation;
    }
    
    addExperience(xp) {
        this.userData.experience += xp;
        
        // Update play time
        this.userData.playTime = Date.now() - this.userData.sessionStart;
        
        return this.userData.experience;
    }
    
    checkLevelUp() {
        const currentLevel = this.getCurrentLevel();
        const nextLevel = this.levels.find(l => l.level === currentLevel.level + 1);
        
        if (nextLevel && this.userData.experience >= nextLevel.xpRequired) {
            this.userData.level = nextLevel.level;
            this.onLevelUp(nextLevel);
            return true;
        }
        
        return false;
    }
    
    getCurrentLevel() {
        return this.levels.find(l => l.level === this.userData.level) || this.levels[0];
    }
    
    getNextLevel() {
        return this.levels.find(l => l.level === this.userData.level + 1);
    }
    
    getProgress() {
        const currentLevel = this.getCurrentLevel();
        const nextLevel = this.getNextLevel();
        
        if (!nextLevel) {
            return { percent: 100, currentXP: this.userData.experience, requiredXP: 0 };
        }
        
        const xpInCurrentLevel = this.userData.experience - currentLevel.xpRequired;
        const xpNeeded = nextLevel.xpRequired - currentLevel.xpRequired;
        const percent = (xpInCurrentLevel / xpNeeded) * 100;
        
        return {
            percent: Math.min(100, Math.max(0, percent)),
            currentXP: xpInCurrentLevel,
            requiredXP: xpNeeded,
            currentLevel: currentLevel,
            nextLevel: nextLevel
        };
    }
    
    onLevelUp(level) {
        console.log(`🎉 Nível alcançado: ${level.title} (${level.level})`);
        
        // Show notification
        if (typeof showSnackbar === 'function') {
            showSnackbar(`🎊 Nível ${level.level} alcançado: ${level.title}!`, 'success');
        }
        
        // Trigger event
        this.emit('levelUp', { level });
    }
    
    addAchievement(achievementId) {
        if (!this.userData.achievements.has(achievementId)) {
            this.userData.achievements.add(achievementId);
            this.emit('achievementUnlocked', { achievementId });
            return true;
        }
        return false;
    }
    
    getStats() {
        return {
            level: this.userData.level,
            experience: this.userData.experience,
            transmutations: this.userData.transmutations.length,
            discoveredFusions: this.userData.discoveredFusions.size,
            achievements: this.userData.achievements.size,
            playTime: this.userData.playTime,
            currentLevel: this.getCurrentLevel(),
            progress: this.getProgress()
        };
    }
    
    export() {
        return this.save();
    }
    
    reset() {
        this.userData = {
            level: 1,
            experience: 0,
            transmutations: [],
            discoveredFusions: new Set(),
            achievements: new Set(),
            playTime: 0,
            sessionStart: new Date()
        };
        localStorage.removeItem('athanor_progression');
        return this.userData;
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
    window.ProgressionSystem = ProgressionSystem;
}