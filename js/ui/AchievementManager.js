// AchievementManager.js - Handles achievements and milestones

class AchievementManager {
    constructor() {
        this.achievements = this.loadAchievements();
        this.unlocked = new Set();
        this.modal = null;
        
        console.log('🏆 AchievementManager inicializado');
    }
    
    init() {
        this.modal = document.getElementById('achievementsModal');
        if (!this.modal) {
            console.warn('⚠️ Modal de conquistas não encontrado');
            return;
        }
        
        this.setupEventListeners();
        this.loadUnlocked();
        return this;
    }
    
    setupEventListeners() {
        // Close button
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
        
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }
    
    loadAchievements() {
        return [
            {
                id: 'first_transmutation',
                name: 'Primeira Transmutação',
                description: 'Realize sua primeira combinação alquímica',
                icon: '🥇',
                color: '#fbbf24',
                requirement: (stats) => stats.transmutations >= 1,
                secret: false
            },
            {
                id: 'elemental_master',
                name: 'Mestre Elemental',
                description: 'Descubra todas as combinações elementais básicas',
                icon: '🌊',
                color: '#3b82f6',
                requirement: (stats) => stats.discoveredFusions >= 4,
                secret: false
            },
            {
                id: 'quantum_entangler',
                name: 'Emaranhador Quântico',
                description: 'Crie 10 transmutações diferentes',
                icon: '🌀',
                color: '#8b5cf6',
                requirement: (stats) => stats.transmutations >= 10,
                secret: false
            },
            {
                id: 'shadow_worker',
                name: 'Trabalhador das Sombras',
                description: 'Integre um arquétipo sombra em uma transmutação',
                icon: '🌑',
                color: '#6b7280',
                requirement: (stats) => stats.usedShadowArchetype,
                secret: true
            },
            {
                id: 'alchemical_scholar',
                name: 'Erudito Alquímico',
                description: 'Alcance o nível 5 de alquimia',
                icon: '📚',
                color: '#22c55e',
                requirement: (stats) => stats.level >= 5,
                secret: false
            },
            {
                id: 'perfect_fusion',
                name: 'Fusão Perfeita',
                description: 'Crie uma fusão quádrupla',
                icon: '💎',
                color: '#ec4899',
                requirement: (stats) => stats.createdQuadFusion,
                secret: true
            },
            {
                id: 'speed_alchemist',
                name: 'Alquimista Veloz',
                description: 'Complete 3 transmutações em menos de 1 minuto',
                icon: '⚡',
                color: '#f59e0b',
                requirement: (stats) => stats.fastTransmutations >= 3,
                secret: true
            },
            {
                id: 'collection_complete',
                name: 'Coleção Completa',
                description: 'Descubra todos os arquétipos disponíveis',
                icon: '🏆',
                color: '#d4b192',
                requirement: (stats) => stats.discoveredArchetypes >= 10,
                secret: false
            },
            {
                id: 'journal_keeper',
                name: 'Guardião do Diário',
                description: 'Registre 50 entradas no diário',
                icon: '📖',
                color: '#0ea5e9',
                requirement: (stats) => stats.journalEntries >= 50,
                secret: false
            },
            {
                id: 'master_transmutator',
                name: 'Mestre Transmutador',
                description: 'Realize 100 transmutações',
                icon: '👑',
                color: '#dc2626',
                requirement: (stats) => stats.transmutations >= 100,
                secret: false
            }
        ];
    }
    
    loadUnlocked() {
        const saved = localStorage.getItem('athanor_achievements');
        if (saved) {
            try {
                this.unlocked = new Set(JSON.parse(saved));
            } catch (error) {
                console.error('❌ Erro ao carregar conquistas:', error);
                this.unlocked = new Set();
            }
        }
    }
    
    saveUnlocked() {
        localStorage.setItem('athanor_achievements', JSON.stringify(Array.from(this.unlocked)));
    }
    
    checkTransmutationAchievements(archetypes, fusion) {
        const stats = this.getCurrentStats();
        
        // Update stats based on this transmutation
        stats.transmutations++;
        
        if (fusion && fusion.id) {
            stats.discoveredFusions++;
        }
        
        if (archetypes.some(arch => arch === 'sombra')) {
            stats.usedShadowArchetype = true;
        }
        
        if (archetypes.length === 4) {
            stats.createdQuadFusion = true;
        }
        
        // Check all achievements
        this.achievements.forEach(achievement => {
            if (!this.unlocked.has(achievement.id) && achievement.requirement(stats)) {
                this.unlock(achievement.id);
            }
        });
    }
    
    getCurrentStats() {
        // Get basic stats from progression system if available
        const progression = window.athanorApp?.components?.progression?.getStats?.() || {};
        
        return {
            transmutations: progression.transmutations || 0,
            discoveredFusions: progression.discoveredFusions?.size || 0,
            level: progression.level || 1,
            journalEntries: progression.transmutations || 0,
            discoveredArchetypes: Object.keys(window.athanorDatabase?.archetypes || {}).length,
            usedShadowArchetype: false,
            createdQuadFusion: false,
            fastTransmutations: 0
        };
    }
    
    unlock(achievementId) {
        if (this.unlocked.has(achievementId)) return false;
        
        this.unlocked.add(achievementId);
        this.saveUnlocked();
        
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement) {
            this.showUnlockNotification(achievement);
            this.emit('unlocked', { achievement });
            return true;
        }
        
        return false;
    }
    
    showUnlockNotification(achievement) {
        console.log(`🏆 Conquista desbloqueada: ${achievement.name}`);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--ui-background);
            border: 2px solid ${achievement.color};
            border-radius: 12px;
            padding: 16px;
            max-width: 300px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="font-size: 32px;">${achievement.icon}</div>
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: ${achievement.color};">${achievement.name}</div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${achievement.description}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Also show snackbar if function exists
        if (typeof showSnackbar === 'function') {
            showSnackbar(`🏆 Conquista desbloqueada: ${achievement.name}`, 'success');
        }
    }
    
    renderAchievements() {
        const container = document.getElementById('achievementsGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const isUnlocked = this.unlocked.has(achievement.id);
            const element = this.createAchievementElement(achievement, isUnlocked);
            container.appendChild(element);
        });
    }
    
    createAchievementElement(achievement, unlocked) {
        const element = document.createElement('div');
        element.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
        element.dataset.id = achievement.id;
        
        if (!unlocked && achievement.secret) {
            element.innerHTML = `
                <div class="achievement-icon">❓</div>
                <div class="achievement-name">Conquista Secreta</div>
                <div class="achievement-description">Continue explorando para descobrir</div>
            `;
        } else {
            element.innerHTML = `
                <div class="achievement-icon" style="color: ${achievement.color}">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-status">
                    ${unlocked ? '✅ Desbloqueada' : '🔒 Bloqueada'}
                </div>
            `;
        }
        
        return element;
    }
    
    show() {
        if (!this.modal) this.init();
        
        this.modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        this.renderAchievements();
        
        console.log('🏆 Conquistas abertas');
    }
    
    hide() {
        if (!this.modal) return;
        
        this.modal.setAttribute('hidden', 'true');
        document.body.style.overflow = '';
    }
    
    toggle() {
        if (this.modal?.hasAttribute('hidden')) {
            this.show();
        } else {
            this.hide();
        }
    }
    
    getProgress() {
        const total = this.achievements.length;
        const unlocked = this.unlocked.size;
        const percent = (unlocked / total) * 100;
        
        return {
            unlocked,
            total,
            percent,
            secret: this.achievements.filter(a => a.secret).length
        };
    }
    
    reset() {
        this.unlocked.clear();
        localStorage.removeItem('athanor_achievements');
        return true;
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
    window.AchievementManager = AchievementManager;
}