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
        {
            category: 'all',
            name: 'Voltar ao Ecosystem',
            url: 'https://alexxanorafa.github.io/ecosystem/'
        }
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
