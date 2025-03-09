document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os corações
    const hearts = document.querySelectorAll('.heart-container');
    
    // Cores disponíveis para alternar
    const colors = ['red', 'blue', 'purple', 'green'];
    
    // Adicionar evento de clique a cada coração
    hearts.forEach(heartContainer => {
        // Contador para alternar cores
        let colorIndex = 0;
        
        // Estado da animação
        let isAnimating = true;
        
        heartContainer.addEventListener('click', function() {
            const heart = this.querySelector('.heart');
            
            // Alternar entre pausar e retomar a animação
            if (isAnimating) {
                heart.classList.add('paused');
                isAnimating = false;
            } else {
                heart.classList.remove('paused');
                isAnimating = true;
            }
            
            // Alternar cores
            heart.classList.remove('blue', 'purple', 'green');
            colorIndex = (colorIndex + 1) % colors.length;
            
            if (colors[colorIndex] !== 'red') {
                heart.classList.add(colors[colorIndex]);
            }
            
            // Efeito de clique
            heartContainer.style.transform = 'scale(0.9)';
            setTimeout(() => {
                heartContainer.style.transform = '';
            }, 150);
        });
    });
    
    // Adicionar efeito de duplo clique para animação especial
    hearts.forEach(heartContainer => {
        heartContainer.addEventListener('dblclick', function() {
            const heart = this.querySelector('.heart');
            
            // Adicionar classe para animação especial
            heart.style.animationDuration = '0.3s';
            
            // Restaurar após 2 segundos
            setTimeout(() => {
                if (heartContainer.id === 'heart-1') {
                    heart.style.animationDuration = '1s';
                } else if (heartContainer.id === 'heart-2') {
                    heart.style.animationDuration = '1.5s';
                } else if (heartContainer.id === 'heart-3') {
                    heart.style.animationDuration = '0.8s';
                }
            }, 2000);
        });
    });
});