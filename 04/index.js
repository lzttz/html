let progresso = 0; // Variável para armazenar o progresso

// Função para aumentar o progresso
function aumentarProgresso() {
    if (progresso <= 100) {
        progresso += 10; // Aumenta o progresso em 10%
        document.getElementById('progress').style.width = progresso + '%';
    } // Muda a cor da barra de progresso quando atinge 100%
    if (progresso === 100) {
        document.getElementById('progress').style.backgroundColor = '#4CAF50'; // Verde
        alert("Você conseguiu, princesa!");
        // Oculta a barra de progresso e exibe o quiz
        document.getElementById('progresso-container').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
    }
}



// Objeto para armazenar as respostas do quiz
const respostas = {};

// Função para mostrar a próxima seção do quiz
function mostrarProximaSecao(proximaSecaoId) {
    // Oculta todas as seções
    document.querySelectorAll('.quiz-section').forEach(sec => {
        sec.style.display = 'none';
    });

    // Mostra a próxima seção
    const proximaSecao = document.getElementById(proximaSecaoId);
    if (proximaSecao) {
        proximaSecao.style.display = 'block';
    }
}

// Função para verificar o dia
function verificarDia() {
    const dia = parseInt(document.getElementById('dia').value);
    const resultado = document.getElementById('resultado-dia');

    if (dia < 18) {
        const diasFaltantes = 18 - dia;
        const horasFaltantes = 24 * diasFaltantes;
        const segundosFaltantes = 3600 * horasFaltantes;
        resultado.innerHTML = `Faltam incríveis ${diasFaltantes} dias para realizarmos nosso sonho! <br> São ${horasFaltantes} horas e ${segundosFaltantes} segundos.`;
        return;
    } else if (dia > 18) {
        resultado.textContent = "Já realizamos nosso sonho, vida! Foram os 5 dias mais incríveis da minha vida. Obrigado!";
        return;
    } else if (dia === 18) {
        resultado.textContent = "É hoje, princesa! Chegou o grande dia!";
        return;
    }

    // Mostra a próxima seção após a verificação.
    mostrarProximaSecao('local-encontro');
}

// Função para responder sobre o local do encontro.
function responderLocal() {
    const opcao = document.getElementById('opcao-local').value;
    const resultado = document.getElementById('resultado-local');

    if (opcao === "1") {
        resultado.textContent = "Por favor, selecione uma opção válida.";
        return;
    }

    switch (opcao) {
        case '2':
            resultado.textContent = "Você errou, amor. Não conhece nossa história?";
            break;
        case '3':
            resultado.textContent = "Você errou, amor. Não conhece nossa história?";
            return;
        case '4':
            resultado.textContent = "Você errou, amor. Não conhece nossa história?";
            return;
        default:
            resultado.textContent = "Opção inválida! Tente novamente.";
    }

    // Mostra a próxima seção após a resposta.
    mostrarProximaSecao('primeiro-assunto');
}

// Função para responder sobre o primeiro assunto íntimo.
function responderAssunto() {
    const opcao = document.getElementById('opcao-assunto').value;
    const resultado = document.getElementById('resultado-assunto');


    switch (opcao) {
        case '1':
            resultado.textContent = "Você errou, não conhece nossa história?";
            return;
        case '2':
            resultado.textContent = "Você errou, não conhece nossa história?";
            return;
        case '3':
            resultado.textContent = "Você errou, não conhece nossa história?";
            return;
        case '4':
            resultado.textContent = "Você errou, não conhece nossa história?";
            break;
        default:
            resultado.textContent = "Opção inválida! Tente novamente.";
    }
    mostrarProximaSecao('primeira-data');
}

function responderData() {
    const opcao = document.getElementById('opcao-data').value;
    const resultado = document.getElementById('resultado-data');


    switch (opcao) {
        case '1':
            resultado.textContent = "Você errou, não conhece nossa história?";
            return;
        case '2':
            resultado.textContent = "Você errou, não conhece nossa história?";
            break;
        case '3':
            resultado.textContent = "Você errou, não conhece nossa história?";
            return;
        case '4':
            resultado.textContent = "Você errou, não conhece nossa história?";
            return;
        default:
            resultado.textContent = "Opção inválida! Tente novamente.";
    }
    //proxima funçao.
    mostrarProximaSecao('primeiro-presente');
}

function responderPresente() {
    const opcao = document.getElementById('opcao-presente').value;
    const resultado = document.getElementById('resultado-presente');


    switch (opcao) {
        case '1':
            resultado.textContent = "Kkkk, acreditou mesmo que ia acabar com a surpresa? Vai descobrir só no dia, meu amor!!!!";
            break;
        case '2':
            resultado.textContent = "Kkkk, acreditou mesmo que ia acabar com a surpresa? Vai descobrir só no dia, meu amor!!!!";
            return;
        case '3':
            resultado.textContent = "Kkkk, acreditou mesmo que ia acabar com a surpresa? Vai descobrir só no dia, meu amor!!!!";
            return;
        case '4':
            resultado.textContent = "Kkkk, acreditou mesmo que ia acabar com a surpresa? Vai descobrir só no dia, meu amor!!!!";
            return;
        default:
            resultado.textContent = "Opção inválida! Tente novamente.";
    }
    mostrarProximaSecao('primeiro-cabelo');
}

function responderCabelo() {
    const opcao = document.getElementById('opcao-cabelo').value;
    const resultado = document.getElementById('resultado-cabelo');


    switch (opcao) {
        case '1':
            resultado.textContent = "Amo você de todos os jeitos, bobinha. Você é perfeita!";
            break;
        case '2':
            resultado.textContent = "Amo você de todos os jeitos, bobinha. Você é perfeita!";
            return;
        case '3':
            resultado.textContent = "Amo você de todos os jeitos, bobinha. Você é perfeita!";
            return;
        case '4':
            resultado.textContent = "Amo você de todos os jeitos, bobinha. Você é perfeita!";
            return;
        case '5':
            resultado.textContent = "Amo você de todos os jeitos, bobinha. Você é perfeita!";
            break;
        default:
            resultado.textContent = "Opção inválida! Tente novamente.";
    }
    mostrarProximaSecao('primeiro-msg');
}

function responderMsg() {
    const opcao = document.getElementById('opcao-msg').value;
    const resultado = document.getElementById('resultado-msg');


    switch (opcao) {
        case '1':
            resultado.textContent = "Estou muito feliz por estar realizando esse sonho da gente se ver. Sinto que este é o começo de algo mais especial do que já é. Cada momento ao seu lado vai ser incrível, e mal posso esperar para ver onde essa conexão nos levará. Obrigado por ser quem você é, e por me deixar fazer parte da sua vida. Que este seja apenas o começo de muitas memórias inesquecíveis que vamos construir juntos.";
            return;
        case '2':
            resultado.textContent = "Cada dia contigo é uma nova experiência, e a cada instante me encanto mais com quem você é. A sua presença traz tranquilidade ao meu coração e felicidade à minha existência de uma forma que eu nunca pensei sentir.";
            return;
        case '3':
            resultado.textContent = "Só de pensar em você, meu dia já fica melhor. Sou grato por ter você ao meu lado, e mal posso esperar para viver muitos outros momentos incríveis juntos. Te amo mais do que palavras podem expressar.";
            return;
        case '4':
            resultado.textContent = "Saber que você está ao meu lado faz tudo mais fácil. Sua presença é meu maior conforto, e eu sou muito grato por ter você na minha vida. Te amo imensamente!";
            return;
        case '5':
            resultado.textContent = "Quando penso em você, vejo o melhor de tudo o que a vida tem a oferecer no amor. Você me faz querer ser uma pessoa melhor e me faz acreditar que o amor verdadeiro existe. A cada dia te amo mais!";
            return;
        case '6':
            resultado.textContent = "Estar ao seu lado é a melhor parte de cada dia, porque o seu sorriso ilumina tudo ao meu redor e faz meu coração bater mais forte.";
            return;
        case '7':
            resultado.textContent = "Desde que você entrou na minha vida, tudo ganhou mais cor, mais brilho. Te amar é a melhor parte do meu dia, e eu só quero fazer você feliz sempre";
            return;
        case '8':
            resultado.textContent = "Amo você de todos os jeitos, bobinha. Você é perfeita!";
            break;
        default:
            resultado.textContent = "Opção inválida! Tente novamente.";
    }
}