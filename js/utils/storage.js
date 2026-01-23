// storage.js - Handles data persistence

class StorageManager {
    constructor() {
        this.prefix = 'athanor_';
        this.backupInterval = 5 * 60 * 1000; // 5 minutes
        this.backupTimer = null;
        
        console.log('💾 StorageManager inicializado');
    }
    
    // Generic storage methods
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, serialized);
            return true;
        } catch (error) {
            console.error(`❌ Erro ao salvar ${key}:`, error);
            return false;
        }
    }
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`❌ Erro ao carregar ${key}:`, error);
            return defaultValue;
        }
    }
    
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error(`❌ Erro ao remover ${key}:`, error);
            return false;
        }
    }
    
    clear() {
        try {
            // Remove only athanor items
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('❌ Erro ao limpar storage:', error);
            return false;
        }
    }
    
    // Specific data methods
    saveUserData(data) {
        return this.set('user_data', {
            ...data,
            savedAt: new Date().toISOString(),
            version: '1.0.0'
        });
    }
    
    loadUserData() {
        return this.get('user_data', {
            activeElements: [],
            precision: 0,
            discoveredFusions: [],
            achievements: [],
            playTime: 0,
            firstVisit: new Date().toISOString()
        });
    }
    
    saveProgress(progressData) {
        return this.set('progress', progressData);
    }
    
    loadProgress() {
        return this.get('progress', {
            level: 1,
            experience: 0,
            transmutations: [],
            sessionStart: new Date().toISOString()
        });
    }
    
    saveSettings(settings) {
        return this.set('settings', {
            ...settings,
            updatedAt: new Date().toISOString()
        });
    }
    
    loadSettings() {
        return this.get('settings', {
            soundVolume: 0.7,
            musicVolume: 0.5,
            showTutorial: true,
            highContrast: false,
            fontSize: 'medium',
            theme: 'dark',
            autoSave: true
        });
    }
    
    // Journal methods
    saveJournalEntries(entries) {
        return this.set('journal_entries', entries);
    }
    
    loadJournalEntries() {
        return this.get('journal_entries', []);
    }
    
    // Backup system
    startAutoBackup() {
        if (this.backupTimer) {
            clearInterval(this.backupTimer);
        }
        
        this.backupTimer = setInterval(() => {
            this.createBackup();
        }, this.backupInterval);
        
        console.log('💾 Backup automático ativado');
    }
    
    stopAutoBackup() {
        if (this.backupTimer) {
            clearInterval(this.backupTimer);
            this.backupTimer = null;
        }
        
        console.log('💾 Backup automático desativado');
    }
    
    createBackup() {
        try {
            const backup = {
                metadata: {
                    createdAt: new Date().toISOString(),
                    app: 'Athanor',
                    version: '1.0.0'
                },
                data: {
                    user: this.loadUserData(),
                    progress: this.loadProgress(),
                    settings: this.loadSettings(),
                    journal: this.loadJournalEntries()
                }
            };
            
            // Save backup with timestamp
            const timestamp = new Date().getTime();
            this.set(`backup_${timestamp}`, backup);
            
            // Keep only last 5 backups
            this.cleanupOldBackups(5);
            
            console.log('💾 Backup criado:', new Date().toLocaleTimeString());
            return true;
        } catch (error) {
            console.error('❌ Erro ao criar backup:', error);
            return false;
        }
    }
    
    cleanupOldBackups(maxBackups = 5) {
        try {
            // Get all backup keys
            const backupKeys = Object.keys(localStorage)
                .filter(key => key.startsWith(this.prefix + 'backup_'))
                .sort();
            
            // Remove oldest backups if we have more than max
            while (backupKeys.length > maxBackups) {
                const oldestKey = backupKeys.shift();
                localStorage.removeItem(oldestKey);
            }
        } catch (error) {
            console.error('❌ Erro ao limpar backups antigos:', error);
        }
    }
    
    listBackups() {
        try {
            return Object.keys(localStorage)
                .filter(key => key.startsWith(this.prefix + 'backup_'))
                .map(key => ({
                    key,
                    timestamp: parseInt(key.replace(this.prefix + 'backup_', '')),
                    data: this.get(key.replace(this.prefix, ''))
                }))
                .sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error('❌ Erro ao listar backups:', error);
            return [];
        }
    }
    
    restoreBackup(backupKey) {
        try {
            const backup = this.get(backupKey.replace(this.prefix, ''));
            if (!backup || !backup.data) {
                throw new Error('Backup inválido');
            }
            
            // Restore all data
            this.saveUserData(backup.data.user);
            this.saveProgress(backup.data.progress);
            this.saveSettings(backup.data.settings);
            this.saveJournalEntries(backup.data.journal);
            
            console.log('💾 Backup restaurado:', backupKey);
            return true;
        } catch (error) {
            console.error('❌ Erro ao restaurar backup:', error);
            return false;
        }
    }
    
    // Export/Import
    exportData(format = 'json') {
        try {
            const data = {
                metadata: {
                    exportedAt: new Date().toISOString(),
                    app: 'Athanor: Alquimia Quântica',
                    version: '1.0.0'
                },
                user: this.loadUserData(),
                progress: this.loadProgress(),
                settings: this.loadSettings(),
                journal: this.loadJournalEntries()
            };
            
            if (format === 'json') {
                return JSON.stringify(data, null, 2);
            } else {
                throw new Error('Formato não suportado');
            }
        } catch (error) {
            console.error('❌ Erro ao exportar dados:', error);
            return null;
        }
    }
    
    importData(jsonData, options = {}) {
        try {
            const data = JSON.parse(jsonData);
            
            if (!data.metadata || !data.metadata.app || data.metadata.app !== 'Athanor: Alquimia Quântica') {
                throw new Error('Arquivo de importação inválido');
            }
            
            // Merge or replace based on options
            if (options.mode === 'merge') {
                // Merge user data
                const currentUser = this.loadUserData();
                const mergedUser = { ...currentUser, ...data.user };
                this.saveUserData(mergedUser);
                
                // Merge progress
                const currentProgress = this.loadProgress();
                const mergedProgress = { ...currentProgress, ...data.progress };
                this.saveProgress(mergedProgress);
                
                // Merge settings
                const currentSettings = this.loadSettings();
                const mergedSettings = { ...currentSettings, ...data.settings };
                this.saveSettings(mergedSettings);
                
                // Merge journal entries
                const currentJournal = this.loadJournalEntries();
                const mergedJournal = [...currentJournal, ...data.journal];
                this.saveJournalEntries(mergedJournal);
            } else {
                // Replace all data
                this.saveUserData(data.user);
                this.saveProgress(data.progress);
                this.saveSettings(data.settings);
                this.saveJournalEntries(data.journal);
            }
            
            console.log('💾 Dados importados com sucesso');
            return true;
        } catch (error) {
            console.error('❌ Erro ao importar dados:', error);
            return false;
        }
    }
    
    // Statistics
    getStorageStats() {
        try {
            let totalSize = 0;
            let athanorSize = 0;
            let athanorItems = 0;
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const itemSize = (key.length + value.length) * 2; // Approximate size in bytes
                
                totalSize += itemSize;
                
                if (key.startsWith(this.prefix)) {
                    athanorSize += itemSize;
                    athanorItems++;
                }
            }
            
            return {
                totalItems: localStorage.length,
                totalSize: totalSize,
                totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
                athanorItems,
                athanorSize,
                athanorSizeMB: (athanorSize / 1024 / 1024).toFixed(2),
                percentUsed: ((athanorSize / totalSize) * 100).toFixed(1)
            };
        } catch (error) {
            console.error('❌ Erro ao calcular estatísticas:', error);
            return null;
        }
    }
    
    // Cleanup
    cleanup() {
        try {
            const stats = this.getStorageStats();
            const maxSize = 5 * 1024 * 1024; // 5MB limit
            const currentSize = stats?.athanorSize || 0;
            
            if (currentSize > maxSize) {
                console.log('🧹 Limpando dados antigos...');
                
                // Remove oldest backups first
                const backups = this.listBackups();
                while (currentSize > maxSize && backups.length > 1) {
                    const oldestBackup = backups.pop();
                    this.remove(oldestBackup.key.replace(this.prefix, ''));
                }
                
                // If still too large, remove old journal entries
                if (currentSize > maxSize) {
                    const journal = this.loadJournalEntries();
                    if (journal.length > 50) {
                        const newJournal = journal.slice(-50); // Keep only last 50 entries
                        this.saveJournalEntries(newJournal);
                    }
                }
                
                console.log('🧹 Limpeza concluída');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('❌ Erro durante limpeza:', error);
            return false;
        }
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.StorageManager = StorageManager;
}