const container = document.getElementById('carousel');
const track = document.getElementById('track');
const cards = document.querySelectorAll('.card');

let isDragging = false;
let startY = 0;
let currentIndex = 1; // Start with 2nd card

const cardHeight = 150; // Updated to match actual .project_wrap height

function updateCarousel() {
  currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));

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

// Mouse Drag Events
container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
  track.style.transition = 'none';
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const currentY = e.clientY;
  const diff = currentY - startY;
  
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

window.addEventListener('load', updateCarousel);