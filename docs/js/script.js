console.log("rapreh")
const scrollContainer = document.querySelector('.scrollcontainer');
let isScrolling = false;

scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (!isScrolling) {
        isScrolling = true;
        
        const direction = e.deltaY > 0 ? 1 : -1;
        const sections = document.querySelectorAll('section');
        const currentScroll = scrollContainer.scrollTop;
        const sectionHeight = window.innerHeight;
        
        // Calculate target section
        const targetSection = Math.round(currentScroll / sectionHeight) + direction;
        
        // Ensure target is within bounds
        if (targetSection >= 0 && targetSection < sections.length) {
            scrollContainer.scrollTo({
                top: targetSection * sectionHeight,
                behavior: 'smooth'
            });
        }
        
        // Reset scroll flag after animation
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
}, { passive: false });