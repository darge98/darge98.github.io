function updateThemeAwareImages(theme) {
    const images = document.querySelectorAll('.theme-aware-image');
    images.forEach(img => {
        const src = theme === 'light' ? 
            img.getAttribute('data-light-src') : 
            img.getAttribute('data-dark-src');
        if (src) {
            img.src = src;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Controlla se c'è una preferenza salvata
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
    updateThemeAwareImages(currentTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.add('theme-transition');
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        updateThemeAwareImages(newTheme);
        
        window.setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
    
    function updateIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (e) => {
        document.body.classList.add('theme-transition');
        
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        updateThemeAwareImages(newTheme);
        
        window.setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
}); 