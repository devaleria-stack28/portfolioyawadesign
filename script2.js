// Tableau des images du portfolio - CORRESPONDANT AU HTML
const images = [
    {
        src: "Evenementiel/3.jpg",
        alt: "1 minute pour soutcher 2025"
    },
    {
        src: "Evenementiel/EGLISE-OK.jpg",
        alt: "Projet 2"
    },
    {
        src: "Evenementiel/invitation cendra.jpg",
        alt: "Projet 3"
    },
    {
        src: "Evenementiel/Nuit d'Or & de Diamant 1.jpg",
        alt: "Projet 4"
    },
    {
        src: "Evenementiel/4 (1).webp",
        alt: "Projet 5"
    },
    {
        src: "Evenementiel/4 (2).webp",
        alt: "Projet 6"
    },
    {
        src: "Evenementiel/4 (3).webp",
        alt: "Projet 7"
    },
    {
        src: "Evenementiel/4 (4).webp",
        alt: "Projet 8"
    }
];

let currentImageIndex = 0;

// Ouvrir la lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Vérifier que l'image existe dans le tableau
    if (images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
    }
}

// Fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Rétablir le défilement
}

// Changer d'image dans la lightbox
function changeImage(direction) {
    currentImageIndex += direction;
    
    // Boucler les images
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    if (images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    }
}

// Fermer la lightbox avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    } else if (event.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (event.key === 'ArrowRight') {
        changeImage(1);
    }
});

// Fermer la lightbox en cliquant à l'extérieur de l'image
document.getElementById('lightbox').addEventListener('click', function(event) {
    if (event.target === this) {
        closeLightbox();
    }
});

// Empêcher la fermeture quand on clique sur l'image elle-même
document.querySelector('.lightbox-content').addEventListener('click', function(event) {
    event.stopPropagation();
});