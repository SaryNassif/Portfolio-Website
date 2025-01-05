const scrollContainer = document.querySelector('.scrollcontainer');
let isScrolling = false;

// Function to handle scroll
function handleScroll(delta) {
    if (!isScrolling) {
        isScrolling = true;
        
        const direction = delta > 0 ? 1 : -1;
        const sections = document.querySelectorAll('section');
        const currentScroll = scrollContainer.scrollTop;
        const sectionHeight = window.innerHeight;
        
        const targetSection = Math.round(currentScroll / sectionHeight) + direction;
        
        if (targetSection >= 0 && targetSection < sections.length) {
            scrollContainer.scrollTo({
                top: targetSection * sectionHeight,
                behavior: 'smooth'
            });
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
}

// Wheel event (mouse wheel)
scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    handleScroll(e.deltaY);
}, { passive: false });

// Touch events (for trackpad)
let touchStart = 0;
scrollContainer.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientY;
});

scrollContainer.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const delta = touchStart - e.touches[0].clientY;
    handleScroll(delta);
}, { passive: false });