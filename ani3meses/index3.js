document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.querySelector('.hearts-container');

    // Start hearts animation
    createHearts();

    // Create floating hearts
    function createHearts() {
        heartsContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = Math.random() * 100 + 'vh';
                const size = Math.random() * 15 + 10;
                heart.style.width = size + 'px';
                heart.style.height = size + 'px';
                heart.style.animationDuration = Math.random() * 3 + 2 + 's';
                heartsContainer.appendChild(heart);
                setTimeout(() => {
                    heart.remove();
                }, 4000);
            }, i * 300);
        }
        setTimeout(createHearts, 3000);
    }
});