// Ecosystem Manager - Simple and Effective
document.addEventListener('DOMContentLoaded', function() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'ecosystem-overlay';
    document.body.appendChild(overlay);
    
    // Get elements
    const ecosystemButton = document.getElementById('ecosystemButton');
    const ecosystemPanel = document.getElementById('ecosystemPanel');
    const closeButton = document.getElementById('closeEcosystemPanel');
    const linksContainer = document.getElementById('ecosystemLinks');
    
    // Your applications data
    const applications = [
        { category: 'sentiment', name: 'Alquimia dos Sentimentos', url: 'https://alexxanorafa.github.io/Alquimia-dos-Sentimentos/' },
        { category: 'quantum', name: 'Almas Conectadas', url: 'https://alexxanorafa.github.io/Almas-Conectadas/' },
        { category: 'myth', name: 'Anéis da Sabedoria', url: 'https://alexxanorafa.github.io/Aneis_da_Sabedoria/' },
        { category: 'sentiment', name: 'ANIMA', url: 'https://alexxanorafa.github.io/ANIMA/' },
        { category: 'sentiment', name: 'ANIMA II', url: 'https://alexxanorafa.github.io/ANIMA-II/' },
        { category: 'myth', name: 'Animais de Poder', url: 'https://alexxanorafa.github.io/Animais-de-Poder/' },
        { category: 'myth', name: 'Árvore da Vida', url: 'https://alexxanorafa.github.io/Arvore-da-Vida/' },
        { category: 'quantum', name: 'Biblioteca Onírica', url: 'https://alexxanorafa.github.io/Biblioteca-Onirica/' },
        { category: 'oracle', name: 'Búzios', url: 'https://alexxanorafa.github.io/Buzios/' },
        { category: 'oracle', name: 'Cartas de Sibila', url: 'https://alexxanorafa.github.io/Cartas-de-Sibila/' },
        { category: 'sentiment', name: 'Do you love me?', url: 'https://alexxanorafa.github.io/Do-you-love-me/' },
        { category: 'quantum', name: 'ECO-SAPIENS', url: 'https://alexxanorafa.github.io/ECO-SAPIENS/' },
        { category: 'quantum', name: 'Entrecamadas', url: 'https://alexxanorafa.github.io/Entrecamadas-Telepatia-Proposito/' },
        { category: 'sentiment', name: 'Experiência Sensorial', url: 'https://alexxanorafa.github.io/Experiencia-Sensorial/' },
        { category: 'oracle', name: 'I Ching Virtual', url: 'https://alexxanorafa.github.io/I-Ching-Virtual/' },
        { category: 'myth', name: 'Jornada Arquetípica', url: 'https://alexxanorafa.github.io/Jornada-Arquetipica/' },
        { category: 'myth', name: 'Jornada Mitológica', url: 'https://alexxanorafa.github.io/Jornadas-Mitologica/' },
        { category: 'quantum', name: 'Livro das Sombras', url: 'https://alexxanorafa.github.io/Livro-das-Sombras/' },
        { category: 'sentiment', name: 'Magia das Cores', url: 'https://alexxanorafa.github.io/Magia-das-Cores/' },
        { category: 'oracle', name: 'Murmúrios do Destino', url: 'https://alexxanorafa.github.io/Murmurios-do-Destino/' },
        { category: 'oracle', name: 'Nexus', url: 'https://alexxanorafa.github.io/Nexus/' },
        { category: 'quantum', name: 'O Construtor do Destino', url: 'https://alexxanorafa.github.io/O-Construtor-do-Destino/' },
        { category: 'oracle', name: 'Oráculo das Pedras', url: 'https://alexxanorafa.github.io/Oraculo-das-Pedras/' },
        { category: 'oracle', name: 'Oráculo dos Deuses', url: 'https://alexxanorafa.github.io/Oraculo-dos-Deuses/' },
        { category: 'oracle', name: 'Oráculo Numerológico', url: 'https://alexxanorafa.github.io/Oraculo-Numerologico/' },
        { category: 'oracle', name: 'Pêndulo Divinatório', url: 'https://alexxanorafa.github.io/Pendulo-Divinatorio/' },
        { category: 'quantum', name: 'Portal das Almas', url: 'https://alexxanorafa.github.io/Portal-das-Almas/' },
        { category: 'quantum', name: 'Potencial Coletivo', url: 'https://alexxanorafa.github.io/Potencial-Coletivo/' },
        { category: 'quantum', name: 'PROJECT AETHER', url: 'https://alexxanorafa.github.io/PROJECT-AETHER/' },
        { category: 'quantum', name: 'Quantum Oracle', url: 'https://alexxanorafa.github.io/Quantum-Oracle/' },
        { category: 'oracle', name: 'Runas Celtas', url: 'https://alexxanorafa.github.io/Runas-Celtas/' },
        { category: 'oracle', name: 'Runas Estelares', url: 'https://alexxanorafa.github.io/Runas-Estelares/' },
        { category: 'oracle', name: 'Runas Nórdicas', url: 'https://alexxanorafa.github.io/Runas-do-Destino/' },
        { category: 'quantum', name: 'Simulador Quântico', url: 'https://alexxanorafa.github.io/Simulador-Quantico/' },
        { category: 'quantum', name: 'Tabuleiro Quântico', url: 'https://alexxanorafa.github.io/Tabuleiro-Quantico/' },
        { category: 'oracle', name: 'Tarô de Marselha', url: 'https://alexxanorafa.github.io/TarodeMarselha/' },
        { category: 'oracle', name: 'Tasseografia', url: 'https://alexxanorafa.github.io/Tasseografia/' },
        { category: 'quantum', name: 'Tempo e Sonhos', url: 'https://alexxanorafa.github.io/Tempo_e_Sonhos/' },
        { category: 'myth', name: 'The Da Vinci Code', url: 'https://alexxanorafa.github.io/The-Da-Vinci-Code/' },
        { category: 'quantum', name: 'Velvet Quantum', url: 'https://alexxanorafa.github.io/Velvet-Quantum/' },
        { category: 'quantum', name: 'Vitruvian Resonance', url: 'https://alexxanorafa.github.io/Vitruvian-Resonance/' },
        { category: 'quantum', name: 'Whispering Shadows', url: 'https://alexxanorafa.github.io/Whispering-Shadows/' },
        { category: 'quantum', name: 'Whispering Shadows 2', url: 'https://alexxanorafa.github.io/Whispering-Shadows-2/' },
        { category: 'quantum', name: 'Whispering Shadows 3', url: 'https://alexxanorafa.github.io/Whispering-Shadows-3/' },
        { category: 'myth', name: 'Xamanismo Animal', url: 'https://alexxanorafa.github.io/Xamanismo-Animal/' }
    ];
    
    // Populate links
    applications.forEach(app => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = app.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = app.name;
        
        // Add category icon
        const icon = document.createElement('span');
        icon.style.marginRight = '10px';
        icon.textContent = getCategoryIcon(app.category);
        a.prepend(icon);
        
        li.appendChild(a);
        linksContainer.appendChild(li);
    });
    
    // Open panel
    ecosystemButton.addEventListener('click', function() {
        ecosystemPanel.classList.add('open');
        overlay.classList.add('active');
    });
    
    // Close panel
    function closePanel() {
        ecosystemPanel.classList.remove('open');
        overlay.classList.remove('active');
    }
    
    closeButton.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePanel();
        }
    });
    
    // Helper function to get category icon
    function getCategoryIcon(category) {
        const icons = {
            sentiment: '❤️',
            quantum: '🌀',
            myth: '🏛️',
            oracle: '🔮'
        };
        return icons[category] || '🔗';
    }
    
    console.log('✅ Ecosystem panel loaded with ' + applications.length + ' applications');
});