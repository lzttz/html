// Objeto para armazenar as respostas
const respostas = {};
let progresso = 0; // Variável para armazenar o progresso

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
    } else if (dia > 18) {
        resultado.textContent = "Já realizamos nosso sonho, vida! Foram os 5 dias mais incríveis da minha vida. Obrigado!";
    } else if (dia === 18) {
        resultado.textContent = "É hoje, princesa! Chegou o grande dia!";
    }

    return;
    // Mostra a próxima seção após a verificação
    mostrarProximaSecao('local-encontro');
}

// Função para responder sobre o local do encontro
function responderLocal() {
    const opcao = document.getElementById('opcao-local').value;
    const resultado = document.getElementById('resultado-local');

    if (opcao === "1") {
        resultado.textContent = "Por favor, selecione uma opção válida.";
        return;
    }

    switch (opcao) {
        case '4':
            resultado.textContent = "Você errou, amor. Não conhece nossa história?";
            return;
        case '3':
            resultado.textContent = "Você errou, amor. Não conhece nossa história?";
            return;
        case '2':
            resultado.textContent = "Você acertou, \nparabéns, princesa!";
            ;
        default:
            resultado.textContent = "Opção inválida! Tente novamente.";
    }

    // Armazena a resposta
    respostas.local = opcao;

    // Mostra a próxima seção após a resposta
    mostrarProximaSecao('primeiro-assunto');
}

// Função para responder sobre o primeiro assunto íntimo
function responderAssunto() {
    const opcao = document.getElementById('opcao-assunto').value;
    const resultado = document.getElementById('resultado-assunto');

    if (opcao === "4") {
        resultado.textContent = "Por favor, selecione uma opção válida.";
        return;
    }

    switch (opcao) {
        case '1':
            resultado.textContent = "Você errou, não conhece nossa história?";
            return;
        case '2':
            resultado.textContent = "Você errou, não conhece nossa história?";
            break;
        case '3':
            resultado.textContent = "Você acertou, \nparabéns, princesa!";
            break;
        default:
            resultado.textContent = "Opção inválida! Tente novamente.";
    }

    // Armazena a resposta
    respostas.assunto = opcao;

    // Mostra a próxima seção após a resposta
    mostrarProximaSecao('data-encontro'); // Substitua pelo ID da próxima seção
}

// Adicione funções semelhantes para as outras seções do quiz