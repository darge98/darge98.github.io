// Funzione per aggiungere la classe "active" al link del nav
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach((section, index) => {
        let rect = section.getBoundingClientRect();
        // Se la sezione è visibile nella finestra (mezzo della sezione è visibile)
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navLinks[index].classList.add('active');
        } else {
            navLinks[index].classList.remove('active');
        }
    });
});

// Gestire l'attivazione iniziale quando la pagina viene caricata
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach((section, index) => {
        let rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navLinks[index].classList.add('active');
        }
    });
});