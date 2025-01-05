const scrollContainer = document.querySelector('.scrollcontainer');
let isScrolling = false;
let lastScrollTime = Date.now();
const scrollCooldown = 50; // milliseconds between scroll events

function handleScroll(delta) {
    const currentTime = Date.now();
    if (!isScrolling && (currentTime - lastScrollTime) > scrollCooldown) {
        isScrolling = true;
        lastScrollTime = currentTime;
        
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

// Mouse wheel event
scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    handleScroll(e.deltaY);
}, { passive: false });

// Regular scroll event
scrollContainer.addEventListener('scroll', (e) => {
    e.preventDefault();
    const delta = scrollContainer.scrollTop - (scrollContainer.lastScrollTop || 0);
    scrollContainer.lastScrollTop = scrollContainer.scrollTop;
    handleScroll(delta);
}, { passive: false });

// Arrow key navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleScroll(-100);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleScroll(100);
    }
});

// Touch events
let touchStart = 0;
let touchStartY = 0;

scrollContainer.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientY;
    touchStartY = scrollContainer.scrollTop;
}, { passive: false });

scrollContainer.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const delta = touchStart - e.touches[0].clientY;
    handleScroll(delta);
}, { passive: false });