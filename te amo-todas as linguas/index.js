const frases = [
    "I love you ",
    " Te amo ",
    "Je t'aime ",
    "Ti amo ",
    "Te quiero ",
    "Ich liebe dich ",
    "我爱你 ",
    "사랑해요 ",
    "Я тебя люблю ",
    "أحبك ",
    "Σ'αγαπώ ",
    "Jag älskar dig ",
    "Ik hou van jou ",
    "Te dua ",
    "Kocham cię ",
    "Miluji tě ",
    "Ljubim te ",
    "Naku penda ",
    "Mahal kita ",
    "Ngiyakuthanda "

];

let fraseAtual = -1;

function mudarFrase() {
    const elemento = document.getElementById('fraseAmor');
    elemento.style.animation = 'none';
    elemento.offsetHeight;
    elemento.style.animation = null;
    
    do {
        novaFrase = Math.floor(Math.random() * frases.length);
    } while (novaFrase === fraseAtual);
    
    fraseAtual = novaFrase;
    elemento.textContent = frases[fraseAtual];
    criarCoracao(); 
}

function criarCoracao() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.color = `hsl(${Math.random() * 40 + 340}, 100%, 65%)`;
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(criarCoracao, 300);