document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.querySelector('.envelope');
    const openBtn = document.getElementById('openBtn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const heartsContainer = document.querySelector('.hearts-container');
    const signatureName = document.getElementById('signatureName');
    const fullscreenLetter = document.getElementById('fullscreenLetter');
    const closeBtn = document.getElementById('closeBtn');
    
    // Substitua pelo nome do seu/sua amado(a)
    const lovedOneName = "Meu Amor";
    
    // Substitua pelo seu nome
    const yourName = "Luiz Felipe";
    
    // Personalizar a assinatura
    signatureName.textContent = yourName;
    
    // Abrir carta em tela cheia
    openBtn.addEventListener('click', function() {
        // Animação do envelope
        envelope.classList.add('open');
        
        // Mostrar carta em tela cheia
        fullscreenLetter.classList.remove('hidden');
        setTimeout(() => {
            fullscreenLetter.classList.add('show');
        }, 10);
        
        // Mostrar botão de música
        musicBtn.classList.remove('hidden');
        
        // Criar corações
        createHearts();
    });
    
    // Fechar carta
    closeBtn.addEventListener('click', function() {
        fullscreenLetter.classList.remove('show');
        setTimeout(() => {
            fullscreenLetter.classList.add('hidden');
            envelope.classList.remove('open');
        }, 500);
    });
    
    // Controle de música
    musicBtn.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.textContent = '🔇 Desligar Música';
        } else {
            bgMusic.pause();
            musicBtn.textContent = '🎵 Ligar Música';
        }
    });
    
    // Criar corações flutuantes
    function createHearts() {
        // Limpa corações antigos
        heartsContainer.innerHTML = '';
        
        // Cria novos corações
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                
                // Posição aleatória na tela
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = Math.random() * 100 + 'vh';
                
                // Tamanho aleatório
                const size = Math.random() * 20 + 10;
                heart.style.width = size + 'px';
                heart.style.height = size + 'px';
                
                // Duração da animação aleatória
                heart.style.animationDuration = Math.random() * 3 + 2 + 's';
                
                heartsContainer.appendChild(heart);
                
                // Remove o coração após a animação terminar
                setTimeout(() => {
                    heart.remove();
                }, 4000);
            }, i * 300);
        }
        
        // Continua criando corações enquanto a carta estiver aberta
        if (fullscreenLetter.classList.contains('show')) {
            setTimeout(createHearts, 3000);
        }
    }
    
    // Efeito de digitação na carta (opcional)
    const letterContent = document.querySelector('.fullscreen-letter .content');
    const originalContent = letterContent.innerHTML;
    
    function typeWriterEffect() {
        letterContent.innerHTML = '';
        let i = 0;
        const speed = 20;
        
        function typing() {
            if (i < originalContent.length) {
                letterContent.innerHTML += originalContent.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }
    
    // Descomente a linha abaixo para ativar o efeito de digitação
    // typeWriterEffect();
});