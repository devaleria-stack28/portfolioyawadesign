// ===== NAVBAR : lien actif au clic =====
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// ===== NAVBAR : lien actif au scroll =====
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        }
    });
});

// ===== FILTRES PROJETS =====
function filterCards(cat) {
    // Cartes
    document.querySelectorAll(".card").forEach(card => {
        if (cat === "all" || card.dataset.cat === cat) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    // Sections (wrapper .cards)
    const uxSection = document.querySelector(".ux-section");
    const gdSection = document.querySelector(".gd-section");
    const uxLabel  = document.querySelector(".ux-label");
    const gdLabel  = document.querySelector(".gd-label");

    if (cat === "all") {
        [uxSection, gdSection, uxLabel, gdLabel].forEach(el => { if (el) el.style.display = ""; });
    } else if (cat === "ux") {
        if (uxSection) uxSection.style.display = "";
        if (uxLabel)   uxLabel.style.display   = "inline-block";
        if (gdSection) gdSection.style.display = "none";
        if (gdLabel)   gdLabel.style.display   = "none";
    } else if (cat === "gd") {
        if (gdSection) gdSection.style.display = "";
        if (gdLabel)   gdLabel.style.display   = "inline-block";
        if (uxSection) uxSection.style.display = "none";
        if (uxLabel)   uxLabel.style.display   = "none";
    }
}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        filterCards(this.dataset.filter);
    });
});

// Initialisation : tout afficher
filterCards("all");

// ===== LIGHTBOX =====
const images = [
    { src: "flyers/1-minute-pour-soutcher-2025.jpg", alt: "1 minute pour soutcher 2025" },
    { src: "flyers/2.jpg", alt: "Projet 2" },
    { src: "flyers/3.jpg", alt: "Projet 3" },
    { src: "flyers/4.jpg", alt: "Projet 4" },
    { src: "flyers/5.jpg", alt: "Projet 5" },
    { src: "flyers/6.jpg", alt: "Projet 6" },
    { src: "flyers/7.png", alt: "Projet 7" },
    { src: "flyers/YNNOTECH.jpg", alt: "Projet 8" }
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox    = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (lightbox && lightboxImg && images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    const lightboxImg = document.getElementById("lightbox-img");
    if (lightboxImg && images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    }
}

// Clavier
document.addEventListener("keydown", e => {
    if (e.key === "Escape")       closeLightbox();
    else if (e.key === "ArrowLeft")  changeImage(-1);
    else if (e.key === "ArrowRight") changeImage(1);
});

// Clic hors lightbox pour fermer
const lightboxEl = document.getElementById("lightbox");
if (lightboxEl) {
    lightboxEl.addEventListener("click", e => {
        if (e.target === lightboxEl) closeLightbox();
    });
}

const lightboxContent = document.querySelector(".lightbox-content");
if (lightboxContent) {
    lightboxContent.addEventListener("click", e => e.stopPropagation());
}
