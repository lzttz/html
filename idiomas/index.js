document.addEventListener('DOMContentLoaded', function () {
    // Definição dos idiomas
    const languages = [
        { code: "en", name: "English", flag: "🇬🇧", greeting: "I love you!" },
        { code: "zh", name: "中文", flag: "🇨🇳", greeting: "我爱你!" },
        { code: "es", name: "Español", flag: "🇪🇸", greeting: "Te quiero!" },
        { code: "fr", name: "Français", flag: "🇫🇷", greeting: "Je t'aime!" },
        { code: "de", name: "Deutsch", flag: "🇩🇪", greeting: "Ich liebe dich!" },
        { code: "pt", name: "Português", flag: "🇧🇷", greeting: "Te amo!" },
        { code: "it", name: "Italiano", flag: "🇮🇹", greeting: "Ti amo!" },
        { code: "ru", name: "Русский", flag: "🇷🇺", greeting: "Я тебя люблю!" },
        { code: "ja", name: "日本語", flag: "🇯🇵", greeting: "愛してる！" },
        { code: "ar", name: "العربية", flag: "🇸🇦", greeting: "أحبك!" },
        { code: "ko", name: "한국어", flag: "🇰🇷", greeting: "사랑해!" },
        { code: "hi", name: "हिन्दी", flag: "🇮🇳", greeting: "मैं तुमसे प्यार करता हूँ!" },
        { code: "nl", name: "Nederlands", flag: "🇳🇱", greeting: "Ik hou van jou!" },
        { code: "tr", name: "Türkçe", flag: "🇹🇷", greeting: "Seni seviyorum!" },
        { code: "pl", name: "Polski", flag: "🇵🇱", greeting: "Kocham cię!" },
        { code: "sv", name: "Svenska", flag: "🇸🇪", greeting: "Jag älskar dig!" },
        { code: "no", name: "Norsk", flag: "🇳🇴", greeting: "Jeg elsker deg!" },
        { code: "da", name: "Dansk", flag: "🇩🇰", greeting: "Jeg elsker dig!" },
        { code: "fi", name: "Suomi", flag: "🇫🇮", greeting: "Rakastan sinua!" },
        { code: "cs", name: "Čeština", flag: "🇨🇿", greeting: "Miluji tě!" },
        { code: "pl", name: "Polski", flag: "🇵🇱", greeting: "Kocham cię!" },
        { code: "he", name: "עברית", flag: "🇮🇱", greeting: "אני אוהב אותך!" },
        { code: "th", name: "ไทย", flag: "🇹🇭", greeting: "รักคุณ!" },
        { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", greeting: "Anh yêu em!" },
        { code: "sw", name: "Kiswahili", flag: "🇰🇪", greeting: "Nakupenda!" },
        { code: "ml", name: "മലയാളം", flag: "🇮🇳", greeting: "ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു!" },
        { code: "ta", name: "தமிழ்", flag: "🇮🇳", greeting: "நான் உன்னை காதலிக்கிறேன்!" },
        { code: "ur", name: "اردو", flag: "🇵🇰", greeting: "میں تم سے محبت کرتا ہوں!" },
        { code: "el", name: "Ελληνικά", flag: "🇬🇷", greeting: "Σ' αγαπώ!" },
        { code: "ro", name: "Română", flag: "🇷🇴", greeting: "Te iubesc!" },
        { code: "bg", name: "Български", flag: "🇧🇬", greeting: "Обичам те!" },
        { code: "sr", name: "Српски", flag: "🇷🇸", greeting: "Волим те!" },
        { code: "hr", name: "Hrvatski", flag: "🇭🇷", greeting: "Volim te!" },
        { code: "sk", name: "Slovenčina", flag: "🇸🇰", greeting: "Ľúbim ťa!" },
        { code: "lt", name: "Lietuvių", flag: "🇱🇹", greeting: "Aš tave myliu!" },
        { code: "lv", name: "Latviešu", flag: "🇱🇻", greeting: "Es tevi miilu!" },
        { code: "sq", name: "Shqip", flag: "🇦🇱", greeting: "Te dua!" },
        { code: "mk", name: "Македонски", flag: "🇲🇰", greeting: "Те сакам!" },
        { code: "ja", name: "日本語", flag: "🇯🇵", greeting: "愛してる！" },
        { code: "tl", name: "Filipino", flag: "🇵🇭", greeting: "Mahal kita!" },
        { code: "km", name: "ខ្មែរ", flag: "🇰🇭", greeting: "ខ្ញុំស្រឡាញ់អ្នក!" },
        { code: "my", name: "မြန်မာ", flag: "🇲🇲", greeting: "မင်္ဂလာပါ ချစ်တယ်!" },
        { code: "bs", name: "Bosanski", flag: "🇧🇦", greeting: "Volim te!" },
        { code: "ja", name: "日本語", flag: "🇯🇵", greeting: "愛してる！" },
        { code: "eu", name: "Euskara", flag: "🇪🇸", greeting: "Maite zaitut!" }



    ];

    // Elementos do DOM
    const languageButton = document.getElementById('language-button');
    const languageContent = document.getElementById('language-content');
    const currentFlag = document.getElementById('current-flag');
    const currentLanguage = document.getElementById('current-language');
    const currentGreeting = document.getElementById('current-greeting');
    const globeIcon = document.querySelector('.globe-icon');

    // Estado atual
    let currentIndex = 0;

    // Função para atualizar o conteúdo do idioma
    function updateLanguageContent() {
        const language = languages[currentIndex];
    
        // Animar a saída do conteúdo atual
        languageContent.classList.add('fade-out');

        // Animar o ícone do globo
        globeIcon.classList.add('globe-spin');

        // Após a animação de saída, atualizar o conteúdo e animar a entrada
        setTimeout(() => {
            currentFlag.textContent = language.flag;
            currentLanguage.textContent = language.name;
            currentGreeting.textContent = language.greeting;

            languageContent.classList.remove('fade-out');
            languageContent.classList.add('fade-in');

            // Remover a classe de animação após a conclusão
            setTimeout(() => {
                languageContent.classList.remove('fade-in');
                globeIcon.classList.remove('globe-spin');
            }, 500);
        }, 300);
    }

    // Inicializar o conteúdo
    updateLanguageContent();

    // Adicionar evento de clique ao botão
    languageButton.addEventListener('click', function () {
        // Avançar para o próximo idioma
        currentIndex = (currentIndex + 1) % languages.length;
        updateLanguageContent();
    });

    function criarCoracao() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
    
        // Definir posição horizontal e vertical de forma mais espalhada
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
    
        // Gerar posições aleatórias dentro da área visível da tela
        const randomX = Math.random() * (screenWidth - 50); // Subtrair 50 para evitar que saia da tela
        const randomY = Math.random() * (screenHeight - 50);
    
        heart.style.left = randomX + 'px';
        heart.style.top = randomY + 'px';
    
        // Definir tamanho e duração da animação de forma aleatória
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.color = `hsl(${Math.random() * 40 + 340}, 100%, 65%)`;
    
        // Adicionar o coração ao corpo do documento
        document.body.appendChild(heart);
    
        // Remover o coração após a animação terminar
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    // Gerar corações a cada 300ms
    setInterval(criarCoracao, 300);

});

