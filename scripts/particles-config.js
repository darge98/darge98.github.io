document.addEventListener('DOMContentLoaded', function() {
    const particlesConfig = {
        particles: {
            number: {
                value: 90,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#cccccc"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.6,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.3,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    size_min: 1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#cccccc",
                opacity: 0.5,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 150,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    };

    // Funzione per aggiornare i colori delle particelle in base al tema
    function updateParticlesColors(theme) {
        const color = theme === 'dark' ? "#3a3a3a" : "#cccccc";
        if (window.pJSDom && window.pJSDom[0]) {
            const particlesJS = window.pJSDom[0].pJS;
            particlesJS.particles.color.value = color;
            particlesJS.particles.line_linked.color = color;
            
            // Aggiorna tutte le particelle esistenti
            particlesJS.particles.array.forEach(particle => {
                particle.color.value = color;
            });
            
            // Aggiorna le linee
            particlesJS.particles.line_linked.color_rgb_line = hexToRgb(color);
        }
    }

    // Funzione helper per convertire colore hex in RGB
    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Aggiungi il div per le particelle
    const particlesDiv = document.createElement('div');
    particlesDiv.id = 'particles-js';
    particlesDiv.style.position = 'fixed';
    particlesDiv.style.top = '0';
    particlesDiv.style.left = '0';
    particlesDiv.style.width = '100%';
    particlesDiv.style.height = '100%';
    particlesDiv.style.zIndex = '0';
    particlesDiv.style.pointerEvents = 'none';
    document.body.prepend(particlesDiv);

    // Inizializza particles.js
    particlesJS('particles-js', particlesConfig);

    // Osserva i cambiamenti del tema
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const theme = document.documentElement.getAttribute('data-theme');
                updateParticlesColors(theme);
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Imposta il colore iniziale in base al tema corrente
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateParticlesColors(initialTheme);
}); 