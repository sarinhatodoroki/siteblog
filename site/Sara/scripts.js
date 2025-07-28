document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todos os carrosséis
    document.querySelectorAll('.carousel-container').forEach(carousel => {
        const content = carousel.querySelector('.carousel-content');
        const nextBtn = carousel.querySelector('.next');
        const prevBtn = carousel.querySelector('.prev');
        const items = carousel.querySelectorAll('.carousel-item');
        
        if (!items.length) return;
        
        let currentIndex = 0;
        const itemWidth = items[0].offsetWidth + 15; // Largura do item + gap

        // Atualiza a visibilidade dos botões
        const updateButtons = () => {
            prevBtn.style.display = currentIndex <= 0 ? 'none' : 'flex';
            nextBtn.style.display = currentIndex >= items.length - 1 ? 'none' : 'flex';
        };

        // Rola para um item específico
        const scrollToItem = (index) => {
            if (index < 0 || index >= items.length) return;
            
            currentIndex = index;
            content.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
            updateButtons();
        };

        // Event listeners para os botões
        nextBtn.addEventListener('click', () => scrollToItem(currentIndex + 1));
        prevBtn.addEventListener('click', () => scrollToItem(currentIndex - 1));

        // Controle por arraste (touch/swipe)
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
            
            // Snap to nearest item
            const snapIndex = Math.round(content.scrollLeft / itemWidth);
            scrollToItem(snapIndex);
        };

        // Event listeners para mouse
        content.addEventListener('mousedown', handleDragStart);
        content.addEventListener('mousemove', handleDragMove);
        content.addEventListener('mouseup', handleDragEnd);
        content.addEventListener('mouseleave', handleDragEnd);

        // Event listeners para touch
        content.addEventListener('touchstart', handleDragStart, { passive: false });
        content.addEventListener('touchmove', handleDragMove, { passive: false });
        content.addEventListener('touchend', handleDragEnd, { passive: true });

        // Inicialização
        updateButtons();
        content.style.cursor = 'grab';
    });

    // Efeitos de hover para imagens
    document.querySelectorAll('.gallery img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.boxShadow = '0 0 15px rgba(234, 0, 255, 0.7)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = 'none';
        });
    });
});