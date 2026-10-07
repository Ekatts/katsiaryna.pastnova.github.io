const container = document.getElementById('carousel');
const track = document.getElementById('track');
const cards = document.querySelectorAll('.card');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let isDragging = false;
let startY = 0;
let currentIndex = 1; // starting from 2nd card active by default
let hasDragged = false;

// actual card height (for responsive design and pc/ mobile accommodation)
function getCardHeight() {
    if (cards.length === 0) return 150; 
    const cardMargin = 24; /* gap: 1.5rem = 24px */
    return (cards[0].offsetHeight || 120) + cardMargin;
}

function updateCarousel() {
    currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));

    const cardHeight = getCardHeight();
    const containerCenter = container.offsetHeight / 2;
    const targetOffset = containerCenter - (currentIndex * cardHeight + cardHeight / 2);

    track.style.transform = `translateY(${targetOffset}px)`;

    cards.forEach((card, index) => {
        if (index === currentIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// navigation arrows
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        track.style.transition = 'transform 0.3s ease-out';
        currentIndex--;
        updateCarousel();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        track.style.transition = 'transform 0.3s ease-out';
        currentIndex++;
        updateCarousel();
    });
}

// Mouse Drag Events
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasDragged = false;
    startY = e.clientY;
    track.style.transition = 'none';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const currentY = e.clientY;
    const diff = currentY - startY;

    if (Math.abs(diff) > 5) {
        hasDragged = true;
    }
    
    const cardHeight = getCardHeight();
    const containerCenter = container.offsetHeight / 2;
    const baseOffset = containerCenter - (currentIndex * cardHeight + cardHeight / 2);
    track.style.transform = `translateY(${baseOffset + diff}px)`;
});

window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.3s ease-out';

    const diff = e.clientY - startY;

    if (diff < -40) {
        currentIndex += 1;
    } else if (diff > 40) {
        currentIndex -= 1;
    }

    updateCarousel();
});

// Touch Events for swipes
container.addEventListener('touchstart', (e) => {
    isDragging = true;
    hasDragged = false;
    startY = e.touches[0].clientY;
    track.style.transition = 'none';
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (Math.abs(diff) > 5) {
        hasDragged = true;
    }

    const cardHeight = getCardHeight();
    const containerCenter = container.offsetHeight / 2;
    const baseOffset = containerCenter - (currentIndex * cardHeight + cardHeight / 2);
    track.style.transform = `translateY(${baseOffset + diff}px)`;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.3s ease-out';

    const endY = e.changedTouches[0].clientY;
    const diff = endY - startY;

    if (diff < -40) {
        currentIndex += 1;
    } else if (diff > 40) {
        currentIndex -= 1;
    }

    updateCarousel();
});

document.querySelectorAll('.a_block').forEach(link => {
    link.addEventListener('click', (e) => {
        if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});

window.addEventListener('load', updateCarousel);
window.addEventListener('resize', updateCarousel);