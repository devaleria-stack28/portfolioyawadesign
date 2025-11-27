// Gestion du theme sombre/clair
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Vérifier la préférence système ou le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'light';
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Appliquer le thème initial
if (savedTheme === 'dark' || (savedTheme === 'system' && systemPrefersDark)) {
    body.setAttribute('data-theme', 'dark');
} else {
    body.setAttribute('data-theme', 'light');
}

// Fonction pour basculer le thème
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Ajouter la classe de transition
    body.classList.add('theme-transition');
    
    // Changer le thème
    body.setAttribute('data-theme', newTheme);
    
    // Sauvegarder la préférence
    localStorage.setItem('theme', newTheme);
    
    // Retirer la classe de transition après l'animation
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 300);
}

// Événement du bouton toggle
themeToggle.addEventListener('click', toggleTheme);

// Écouter les changements de préférence système
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
        body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// Navigation mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Changement de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Ici vous ajouterez l'envoi vers votre backend
        console.log('Formulaire soumis:', { name, email, message });
        
        // Message de succès
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        contactForm.reset();
    });
}

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Amélioration de l'accessibilité du toggle theme
themeToggle.setAttribute('aria-label', 'Basculer entre le mode sombre et clair');
themeToggle.setAttribute('role', 'button');

// Ajouter des transitions fluides pour tous les éléments
document.documentElement.style.setProperty('--transition', 'all 0.3s ease');