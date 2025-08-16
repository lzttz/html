document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const heartsContainer = document.querySelector('.hearts-container');
    let currentSlide = 0;

    // Mostrar a primeira foto
    slides[currentSlide].classList.add('active');

    // Função para mudar slides
    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Botão Próximo
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Botão Anterior
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Auto-play (opcional, descomente para ativar)
    /*
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    */

    // Criar corações flutuantes (reutilizando a lógica do index.js)
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

    createHearts();
});