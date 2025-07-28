document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todos os carrosséis
    document.querySelectorAll('.carousel-container').forEach(carousel => {
        const content = carousel.querySelector('.carousel-content');
        const nextBtn = carousel.querySelector('.next');
        const prevBtn = carousel.querySelector('.prev');
        const items = carousel.querySelectorAll('.carousel-item');
        
        if (!items.length) return;
        
        let currentIndex = 0;
        const itemWidth = items[0].offsetWidth + 15;

        const updateButtons = () => {
            prevBtn.style.display = currentIndex <= 0 ? 'none' : 'flex';
            nextBtn.style.display = currentIndex >= items.length - 1 ? 'none' : 'flex';
        };

        const scrollToItem = (index) => {
            if (index < 0 || index >= items.length) return;
            
            currentIndex = index;
            content.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
            updateButtons();
        };

        nextBtn.addEventListener('click', () => scrollToItem(currentIndex + 1));
        prevBtn.addEventListener('click', () => scrollToItem(currentIndex - 1));

        let isDragging = false;
        let startPos = 0;
        let scrollLeft = 0;

        const handleDragStart = (e) => {
            isDragging = true;
            startPos = e.pageX || e.touches[0].pageX;
            scrollLeft = content.scrollLeft;
            content.style.scrollBehavior = 'auto';
            content.style.cursor = 'grabbing';
        };

        const handleDragMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = (e.pageX || e.touches[0].pageX) - content.offsetLeft;
            const walk = (x - startPos) * 2;
            content.scrollLeft = scrollLeft - walk;
        };

        const handleDragEnd = () => {
            isDragging = false;
            content.style.scrollBehavior = 'smooth';
            content.style.cursor = 'grab';
            
            const snapIndex = Math.round(content.scrollLeft / itemWidth);
            scrollToItem(snapIndex);
        };

        content.addEventListener('mousedown', handleDragStart);
        content.addEventListener('mousemove', handleDragMove);
        content.addEventListener('mouseup', handleDragEnd);
        content.addEventListener('mouseleave', handleDragEnd);

        content.addEventListener('touchstart', handleDragStart, { passive: false });
        content.addEventListener('touchmove', handleDragMove, { passive: false });
        content.addEventListener('touchend', handleDragEnd, { passive: true });

        updateButtons();
        content.style.cursor = 'grab';
    });
});