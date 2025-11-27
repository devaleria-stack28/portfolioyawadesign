// Tableau des images du portfolio - CORRESPONDANT AU HTML
const images = [
    {
        src: "logo/logo_Plan de travail 1 copie 10.jpg",
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