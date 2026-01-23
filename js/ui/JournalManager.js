// JournalManager.js - Handles the alchemical journal

class JournalManager {
    constructor() {
        this.entries = [];
        this.modal = null;
        this.currentFilter = 'all';
        
        console.log('📖 JournalManager inicializado');
    }
    
    init() {
        this.modal = document.getElementById('journalModal');
        if (!this.modal) {
            console.warn('⚠️ Modal de diário não encontrado');
            return;
        }
        
        this.setupEventListeners();
        this.loadEntries();
        return this;
    }
    
    setupEventListeners() {
        // Close button
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
        
        // Export button
        const exportBtn = document.getElementById('exportJournal');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.export());
        }
        
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
        
        // Filter buttons
        const filterButtons = document.querySelectorAll('.journal-filter');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
    }
    
    loadEntries() {
        const savedEntries = localStorage.getItem('athanor_journal_entries');
        if (savedEntries) {
            try {
                this.entries = JSON.parse(savedEntries);
                console.log(`📖 ${this.entries.length} entradas carregadas`);
            } catch (error) {
                console.error('❌ Erro ao carregar entradas:', error);
                this.entries = [];
            }
        }
    }
    
    saveEntries() {
        try {
            localStorage.setItem('athanor_journal_entries', JSON.stringify(this.entries));
            return true;
        } catch (error) {
            console.error('❌ Erro ao salvar entradas:', error);
            return false;
        }
    }
    
    addEntry(archetypes, fusion, reflection = '') {
        const entry = {
            id: Date.now(),
            timestamp: new Date(),
            archetypes: Array.isArray(archetypes) ? archetypes : [archetypes],
            fusion: typeof fusion === 'string' ? fusion : fusion?.name || 'Transmutação desconhecida',
            result: fusion?.result || '',
            icon: fusion?.icon || '✨',
            color: fusion?.color || '#d4b192',
            reflection: reflection || this.generateReflection(archetypes, fusion),
            favorite: false
        };
        
        this.entries.unshift(entry); // Add to beginning
        this.saveEntries();
        
        // Update display if journal is open
        if (!this.modal.hasAttribute('hidden')) {
            this.renderEntries();
        }
        
        // Show notification
        if (this.entries.length === 1) {
            this.showTip('Primeira entrada adicionada ao diário!');
        }
        
        return entry;
    }
    
    generateReflection(archetypes, fusion) {
        const reflections = [
            `Combinação interessante de ${archetypes.join(' e ')}.`,
            `A transmutação resultou em ${fusion?.result || 'algo novo'}.`,
            `Estou começando a ver padrões nas combinações.`,
            `Cada transmutação revela algo sobre mim mesmo.`,
            `Os arquétipos parecem conversar entre si.`
        ];
        
        return reflections[Math.floor(Math.random() * reflections.length)];
    }
    
    removeEntry(entryId) {
        const index = this.entries.findIndex(entry => entry.id === entryId);
        if (index !== -1) {
            this.entries.splice(index, 1);
            this.saveEntries();
            this.renderEntries();
            return true;
        }
        return false;
    }
    
    toggleFavorite(entryId) {
        const entry = this.entries.find(e => e.id === entryId);
        if (entry) {
            entry.favorite = !entry.favorite;
            this.saveEntries();
            this.renderEntries();
            return entry.favorite;
        }
        return false;
    }
    
    renderEntries() {
        const container = document.getElementById('journalEntries');
        if (!container) return;
        
        // Clear container
        container.innerHTML = '';
        
        // Filter entries
        let filteredEntries = this.entries;
        if (this.currentFilter === 'favorites') {
            filteredEntries = this.entries.filter(entry => entry.favorite);
        } else if (this.currentFilter === 'recent') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            filteredEntries = this.entries.filter(entry => new Date(entry.timestamp) > oneWeekAgo);
        }
        
        // Update stats
        this.updateStats();
        
        if (filteredEntries.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <div class="empty-state-icon">📖</div>
                <h3>Diário Vazio</h3>
                <p>Realize transmutações para registrar suas descobertas aqui.</p>
            `;
            container.appendChild(emptyState);
            return;
        }
        
        // Render entries
        filteredEntries.forEach(entry => {
            const entryElement = this.createEntryElement(entry);
            container.appendChild(entryElement);
        });
    }
    
    createEntryElement(entry) {
        const element = document.createElement('div');
        element.className = 'journal-entry';
        element.dataset.id = entry.id;
        
        const date = new Date(entry.timestamp);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const archetypeIcons = entry.archetypes.map(arch => {
            const archetype = window.athanorDatabase?.archetypes?.[arch];
            return archetype?.icon || '✨';
        }).join(' ');
        
        element.innerHTML = `
            <div class="entry-header">
                <div class="entry-date">${formattedDate}</div>
                <div class="entry-actions">
                    <button class="btn-icon favorite-btn" title="${entry.favorite ? 'Desfavoritar' : 'Favoritar'}">
                        <i class="fas fa-star${entry.favorite ? '' : '-o'}"></i>
                    </button>
                    <button class="btn-icon delete-btn" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="entry-elements">
                <span class="entry-archetypes">${archetypeIcons}</span>
                <span class="entry-fusion" style="color: ${entry.color}">→ ${entry.fusion}</span>
            </div>
            <div class="entry-result">
                <strong>Resultado:</strong> ${entry.result}
            </div>
            <div class="entry-reflection">
                ${entry.reflection}
            </div>
        `;
        
        // Add event listeners
        const favoriteBtn = element.querySelector('.favorite-btn');
        const deleteBtn = element.querySelector('.delete-btn');
        
        favoriteBtn.addEventListener('click', () => {
            this.toggleFavorite(entry.id);
        });
        
        deleteBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja excluir esta entrada?')) {
                this.removeEntry(entry.id);
            }
        });
        
        return element;
    }
    
    updateStats() {
        const totalElement = document.getElementById('totalTransmutations');
        const combinationsElement = document.getElementById('uniqueCombinations');
        const levelElement = document.getElementById('alchemicalLevel');
        
        if (totalElement) {
            totalElement.textContent = this.entries.length;
        }
        
        if (combinationsElement) {
            // Count unique archetype combinations
            const combinations = new Set(
                this.entries.map(entry => entry.archetypes.sort().join(','))
            );
            combinationsElement.textContent = combinations.size;
        }
        
        if (levelElement) {
            // Calculate alchemical level based on entries
            const level = Math.min(10, Math.floor(this.entries.length / 5) + 1);
            const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
            levelElement.textContent = romanNumerals[level - 1] || 'I';
        }
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.renderEntries();
        
        // Update active filter button
        document.querySelectorAll('.journal-filter').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }
    
    show() {
        if (!this.modal) this.init();
        
        this.modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        this.renderEntries();
        
        console.log('📖 Diário aberto');
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
    
    export() {
        const data = {
            metadata: {
                exportedAt: new Date().toISOString(),
                app: 'Athanor: Alquimia Quântica',
                version: '1.0.0'
            },
            entries: this.entries
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `athanor-journal-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show notification
        if (typeof showSnackbar === 'function') {
            showSnackbar('Diário exportado com sucesso!', 'success');
        }
    }
    
    import(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.entries && Array.isArray(data.entries)) {
                this.entries = [...this.entries, ...data.entries];
                this.saveEntries();
                this.renderEntries();
                return true;
            }
        } catch (error) {
            console.error('❌ Erro ao importar diário:', error);
        }
        return false;
    }
    
    clear() {
        if (confirm('Tem certeza que deseja limpar todo o diário? Esta ação não pode ser desfeita.')) {
            this.entries = [];
            this.saveEntries();
            this.renderEntries();
            return true;
        }
        return false;
    }
    
    showTip(message) {
        if (typeof showSnackbar === 'function') {
            showSnackbar(message, 'info');
        }
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.JournalManager = JournalManager;
}