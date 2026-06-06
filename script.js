// Tableau des images du portfolio - CORRESPONDANT AU HTML
const images = [
    {
        src: "flyers/1-minute-pour-soutcher-2025.jpg",
        alt: "1 minute pour soutcher 2025"
    },
    {
        src: "flyers/2.jpg",
        alt: "Projet 2"
    },
    {
        src: "flyers/3.jpg",
        alt: "Projet 3"
    },
    {
        src: "flyers/4.jpg",
        alt: "Projet 4"
    },
    {
        src: "flyers/5.jpg",
        alt: "Projet 5"
    },
    {
        src: "flyers/6.jpg",
        alt: "Projet 6"
    },
    {
        src: "flyers/7.png",
        alt: "Projet 7"
    },
    {
        src: "flyers/YNNOTECH.jpg",
        alt: "Projet 8"
    }
];

let currentImageIndex = 0;

// Ouvrir la lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg && images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Changer d'image dans la lightbox
function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg && images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    } else if (event.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (event.key === 'ArrowRight') {
        changeImage(1);
    }
});

const lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
    lightboxEl.addEventListener('click', function(event) {
        if (event.target === this) {
            closeLightbox();
        }
    });
}

const lightboxContent = document.querySelector('.lightbox-content');
if (lightboxContent) {
    lightboxContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

function filterCards(cat) {
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
    });

    document.querySelectorAll('.section-label').forEach(label => {
        if (cat === 'all') {
            label.style.display = 'inline-block';
        } else if (label.classList.contains('ux-label') && cat === 'ux') {
            label.style.display = 'inline-block';
        } else if (label.classList.contains('gd-label') && cat === 'gd') {
            label.style.display = 'inline-block';
        } else {
            label.style.display = 'none';
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const cat = this.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterCards(cat);
    });
});

filterCards('all');

// Effet scroll reveal sur la section portfolio
const portfolioRevealElements = document.querySelectorAll('#projects .section-title, #projects .project-filters, #projects .section-label, #projects .card');
const portfolioObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

portfolioRevealElements.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    el.style.transitionDelay = `${index * 50}ms`;
    portfolioObserver.observe(el);
});

const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const navPanel = document.querySelector('.nav-panel');
const navBackdrop = document.querySelector('.nav-backdrop');

const setMenuOpen = (isOpen) => {
    if (!navPanel || !navBackdrop || !navToggle) return;

    navPanel.classList.toggle('open', isOpen);
    navBackdrop.classList.toggle('open', isOpen);
    navPanel.setAttribute('aria-hidden', !isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
};

if (navToggle && navPanel && navBackdrop) {
    navToggle.addEventListener('click', () => {
        setMenuOpen(!navPanel.classList.contains('open'));
    });

    if (navClose) {
        navClose.addEventListener('click', () => setMenuOpen(false));
    }

    navBackdrop.addEventListener('click', () => setMenuOpen(false));

    navPanel.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });
}

const contactForm = document.querySelector('.contact-form');
console.log('Contact form element:', contactForm);
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const phone = contactForm.querySelector('input[type="tel"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        const text = `Bonjour, je souhaite avoir plus d'informations.\n\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`;
        const whatsappUrl = `https://wa.me/22899878826?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, '_blank');
    });
}