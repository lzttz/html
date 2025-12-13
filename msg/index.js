document.addEventListener('DOMContentLoaded', function() {
    const mensagem1 = document.getElementById('mensagem1');
    const mensagem2 = document.getElementById('mensagem2');
    const btnAnimacao = document.getElementById('btnAnimacao');
    
    let animacaoAtiva = false;
    
    // Array de animações disponíveis
    const animacoes = ['flutuar', 'pular', 'girar', 'zoom', 'piscar'];
    
    function getAnimacaoAleatoria() {
        return animacoes[Math.floor(Math.random() * animacoes.length)];
    }
    
    function iniciarAnimacoes() {
        if (animacaoAtiva) return;
        
        animacaoAtiva = true;
        btnAnimacao.style.display = 'none';
        
        // Mostrar primeira mensagem
        setTimeout(() => {
            mensagem1.classList.add('ativo');
            mensagem1.classList.add(getAnimacaoAleatoria());
        }, 500);
        
        // Mostrar segunda mensagem
        setTimeout(() => {
            mensagem2.classList.add('ativo');
            mensagem2.classList.add(getAnimacaoAleatoria());
        }, 1500);
        
        // Mudar animações a cada 3 segundos
        setInterval(() => {
            // Remover animações atuais
            mensagem1.classList.remove(...animacoes);
            mensagem2.classList.remove(...animacoes);
            
            // Adicionar novas animações
            setTimeout(() => {
                mensagem1.classList.add(getAnimacaoAleatoria());
                mensagem2.classList.add(getAnimacaoAleatoria());
            }, 100);
        }, 3000);
        
        // Efeitos extras aleatórios
        setInterval(() => {
            // Mudar cores aleatórias
            const cores = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
            const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
            
            mensagem1.style.color = corAleatoria;
            mensagem2.style.color = corAleatoria;
            
            // Efeito de tremor ocasional
            if (Math.random() > 0.7) {
                mensagem1.style.animation = 'tremor 0.5s ease';
                setTimeout(() => mensagem1.style.animation = '', 500);
            }
        }, 2000);
    }
    
    // Adicionar CSS para tremor
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tremor {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    btnAnimacao.addEventListener('click', iniciarAnimacoes);
    
    // Iniciar automaticamente após 2 segundos (opcional)
    setTimeout(() => {
        if (!animacaoAtiva) {
            iniciarAnimacoes();
        }
    }, 2000);
});