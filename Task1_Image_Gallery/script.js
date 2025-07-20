const galleryData = [
    { 
        id: 1, 
        title: "Mountain Landscape", 
        category: "nature", 
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 2, 
        title: "City Skyline", 
        category: "city", 
        img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 3, 
        title: "Wild Lion", 
        category: "animals", 
        img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 4, 
        title: "Beach Sunset", 
        category: "travel", 
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 5, 
        title: "Forest Path", 
        category: "nature", 
        img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 6, 
        title: "Night City", 
        category: "city", 
        img: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 7, 
        title: "Tropical Birds", 
        category: "animals", 
        img: "https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 8, 
        title: "Desert Adventure", 
        category: "travel", 
        img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 9, 
        title: "Waterfall", 
        category: "nature", 
        img: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80" 
    }
];

const gallery = document.querySelector('.gallery');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function initGallery() {
    gallery.innerHTML = '';
    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.id = item.id;
        galleryItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
        `;
        gallery.appendChild(galleryItem);
        
        galleryItem.addEventListener('click', () => openLightbox(item.id));
    });
}

function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function openLightbox(id) {
    const item = galleryData.find(img => img.id === id);
    lightboxImg.src = item.img;
    lightboxImg.alt = item.title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    currentIndex = galleryData.findIndex(img => img.id === id);
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

let currentIndex = 0;

function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightbox();
}

function updateLightbox() {
    const item = galleryData[currentIndex];
    lightboxImg.src = item.img;
    lightboxImg.alt = item.title;
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterGallery(btn.dataset.filter);
    });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

initGallery();