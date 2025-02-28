// Seleciona os elementos do DOM
const titulo = document.getElementById('titulo');
const mensagem = document.getElementById('mensagem');
const botao = document.getElementById('botao');

// Função para iniciar a sequência de ações
botao.addEventListener('click', function() {
    // Primeira ação: Altera a mensagem
    mensagem.textContent = 'Processando...';

    // Segunda ação: Após 2 segundos, muda a mensagem novamente
    setTimeout(function() {
        mensagem.textContent = 'Ação concluída!';
        titulo.textContent = 'Obrigado!';
        botao.textContent = 'Recomeçar';
        botao.removeEventListener('click', arguments.callee); // Remove o evento anterior
        botao.addEventListener('click', recomecar); // Adiciona novo evento
    }, 2000); // 2000 milissegundos = 2 segundos
});

// Função para recomeçar
function recomecar() {
    titulo.textContent = 'Bem-vindo!';
    mensagem.textContent = 'Clique no botão para começar.';
    botao.textContent = 'Iniciar';
    botao.removeEventListener('click', recomecar); // Remove o evento anterior
    botao.addEventListener('click', arguments.callee); // Adiciona o evento inicial
}