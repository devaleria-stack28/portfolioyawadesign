// ═══════════════════════════════
// MENU BURGER — RESPONSIVE
// ═══════════════════════════════
const navToggle   = document.querySelector('.nav-toggle');
const navPanel    = document.querySelector('.nav-panel');
const navClose    = document.querySelector('.nav-close');
const navBackdrop = document.querySelector('.nav-backdrop');
const navLinks    = document.querySelectorAll('.nav-link');

function openMenu() {
    navPanel.classList.add('open');
    navBackdrop.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navPanel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    navPanel.classList.remove('open');
    navBackdrop.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navPanel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (navToggle) navToggle.addEventListener('click', openMenu);
if (navClose)  navClose.addEventListener('click', closeMenu);
if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fermer avec la touche Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// ═══════════════════════════════
// NAVBAR — changement au scroll
// ═══════════════════════════════
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ═══════════════════════════════
// LIEN ACTIF selon la section visible
// ═══════════════════════════════
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ═══════════════════════════════
// FILTRES PROJETS
// ═══════════════════════════════
const filterBtns = document.querySelectorAll('.filter-btn');
const uxSection  = document.querySelector('.ux-section');
const gdSection  = document.querySelector('.gd-section');
const uxLabel    = document.querySelector('.ux-label');
const gdLabel    = document.querySelector('.gd-label');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        if (filter === 'all') {
            [uxSection, gdSection, uxLabel, gdLabel].forEach(el => { if(el) el.style.display = ''; });
        } else if (filter === 'ux') {
            if(uxSection) uxSection.style.display = '';
            if(uxLabel) uxLabel.style.display = '';
            if(gdSection) gdSection.style.display = 'none';
            if(gdLabel) gdLabel.style.display = 'none';
        } else if (filter === 'gd') {
            if(gdSection) gdSection.style.display = '';
            if(gdLabel) gdLabel.style.display = '';
            if(uxSection) uxSection.style.display = 'none';
            if(uxLabel) uxLabel.style.display = 'none';
        }
    });
});

// ═══════════════════════════════
// ANIMATIONS AU SCROLL
// ═══════════════════════════════
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    const animated = document.querySelectorAll('.product-card, .about-inner, .contact-content');
    animated.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ═══════════════════════════════
// FORMULAIRE DE CONTACT
// ═══════════════════════════════
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name    = contactForm.querySelector('input[type="text"]').value;
        const email   = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        console.log('Message envoyé :', { name, email, message });
        alert('Merci pour votre message ! Je vous répondrai très bientôt.');
        contactForm.reset();
    });
}

// ═══════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
