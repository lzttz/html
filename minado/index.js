// Configurações do jogo
let board = [];
let mines = [];
let flags = [];
let gameStarted = false;
let gameOver = false;
let timer = null;
let timeElapsed = 0;
let isFlagMode = false;
let playerName = '';
let points = 0;
let totalMines = 0;
let currentDifficulty = '';
let remainingFlags = 0;

// Dificuldades do jogo
const difficulties = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
};

// Inicialização do jogo
function initGame(rows, cols, mineCount) {
    try {
        board = Array(rows).fill().map(() => Array(cols).fill(0));
        mines = [];
        flags = [];
        gameStarted = false;
        gameOver = false;
        timeElapsed = 0;
        points = 0;
        totalMines = mineCount;
        remainingFlags = mineCount;
        isFlagMode = false;
        
        // Atualiza a interface
        document.getElementById('time').textContent = '00:00';
        document.getElementById('points').textContent = '0';
        document.getElementById('bombs').textContent = remainingFlags;
        document.getElementById('flag-btn').textContent = 'Modo Revelar';
        
        // Cria o tabuleiro
        createBoard(rows, cols);
        
        // Esconde o menu e mostra o jogo
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('.game-container').style.display = 'block';
    } catch (error) {
        console.error('Erro ao inicializar o jogo:', error);
        alert('Erro ao inicializar o jogo. Por favor, tente novamente.');
    }
}

// Cria o tabuleiro visual
function createBoard(rows, cols) {
    try {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        boardElement.style.gridTemplateColumns = `repeat(${cols}, var(--cell-size))`;
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                cell.addEventListener('click', handleCellClick);
                cell.addEventListener('contextmenu', handleCellRightClick);
                
                boardElement.appendChild(cell);
            }
        }
    } catch (error) {
        console.error('Erro ao criar o tabuleiro:', error);
        alert('Erro ao criar o tabuleiro. Por favor, tente novamente.');
    }
}

// Gerencia o clique na célula
function handleCellClick(event) {
    try {
        if (gameOver) return;
        
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        
        if (isNaN(row) || isNaN(col)) {
            console.error('Coordenadas inválidas:', row, col);
            return;
        }
        
        if (flags.includes(`${row},${col}`)) return;
        
        if (!gameStarted) {
            startGame(row, col);
        }
        
        if (isFlagMode) {
            toggleFlag(row, col);
        } else {
            revealCell(row, col);
        }
    } catch (error) {
        console.error('Erro ao processar clique:', error);
    }
}

// Gerencia o clique direito na célula
function handleCellRightClick(event) {
    try {
        event.preventDefault();
        if (gameOver) return;
        
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        
        if (isNaN(row) || isNaN(col)) {
            console.error('Coordenadas inválidas:', row, col);
            return;
        }
        
        toggleFlag(row, col);
    } catch (error) {
        console.error('Erro ao processar clique direito:', error);
    }
}

// Inicia o jogo
function startGame(firstRow, firstCol) {
    try {
        gameStarted = true;
        placeMines(firstRow, firstCol);
        calculateNumbers();
        startTimer();
    } catch (error) {
        console.error('Erro ao iniciar o jogo:', error);
        alert('Erro ao iniciar o jogo. Por favor, tente novamente.');
    }
}

// Coloca as minas no tabuleiro
function placeMines(firstRow, firstCol) {
    try {
        const rows = board.length;
        const cols = board[0].length;
        let attempts = 0;
        const maxAttempts = 1000;
        
        while (mines.length < totalMines && attempts < maxAttempts) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            
            if (!mines.includes(`${row},${col}`) && 
                (Math.abs(row - firstRow) > 1 || Math.abs(col - firstCol) > 1)) {
                mines.push(`${row},${col}`);
                board[row][col] = -1;
            }
            attempts++;
        }
        
        if (mines.length < totalMines) {
            throw new Error('Não foi possível colocar todas as minas');
        }
    } catch (error) {
        console.error('Erro ao colocar minas:', error);
        alert('Erro ao gerar o tabuleiro. Por favor, tente novamente.');
    }
}

// Calcula os números para cada célula
function calculateNumbers() {
    try {
        const rows = board.length;
        const cols = board[0].length;
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (board[i][j] === -1) continue;
                
                let count = 0;
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        const ni = i + di;
                        const nj = j + dj;
                        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && 
                            board[ni][nj] === -1) {
                            count++;
                        }
                    }
                }
                board[i][j] = count;
            }
        }
    } catch (error) {
        console.error('Erro ao calcular números:', error);
        alert('Erro ao calcular números. Por favor, tente novamente.');
    }
}

// Revela uma célula
function revealCell(row, col) {
    try {
        if (board[row][col] === -1) {
            gameOver = true;
            revealAllMines();
            clearInterval(timer);
            alert('Game Over!');
            return;
        }
        
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!cell) {
            console.error('Célula não encontrada:', row, col);
            return;
        }
        
        if (cell.classList.contains('revealed')) return;
        
        cell.classList.add('revealed');
        cell.textContent = board[row][col] || '';
        
        if (board[row][col] === 0) {
            const rows = board.length;
            const cols = board[0].length;
            
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    const ni = row + di;
                    const nj = col + dj;
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                        revealCell(ni, nj);
                    }
                }
            }
        }
        
        checkWin();
    } catch (error) {
        console.error('Erro ao revelar célula:', error);
    }
}

// Alterna a bandeira em uma célula
function toggleFlag(row, col) {
    try {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!cell) {
            console.error('Célula não encontrada:', row, col);
            return;
        }
        
        const key = `${row},${col}`;
        
        if (cell.classList.contains('revealed')) return;
        
        if (flags.includes(key)) {
            flags = flags.filter(f => f !== key);
            cell.classList.remove('flag');
            remainingFlags++;
            document.getElementById('bombs').textContent = remainingFlags;
        } else if (remainingFlags > 0) {
            flags.push(key);
            cell.classList.add('flag');
            remainingFlags--;
            document.getElementById('bombs').textContent = remainingFlags;
        } else {
            alert('Você não tem mais bandeiras disponíveis!');
        }
        
        checkWin();
    } catch (error) {
        console.error('Erro ao alternar bandeira:', error);
    }
}

// Verifica se o jogador venceu
function checkWin() {
    try {
        const rows = board.length;
        const cols = board[0].length;
        let revealedCount = 0;
        let correctFlags = 0;
        
        // Conta células reveladas
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                if (cell && cell.classList.contains('revealed')) revealedCount++;
            }
        }
        
        // Verifica se as bandeiras estão corretas
        flags.forEach(flag => {
            if (mines.includes(flag)) correctFlags++;
        });
        
        // Verifica vitória
        if (revealedCount === (rows * cols - totalMines) || 
            (correctFlags === totalMines && flags.length === totalMines)) {
            gameOver = true;
            clearInterval(timer);
            points = calculatePoints();
            updateRanking();
            alert('Parabéns! Você venceu!');
        }
    } catch (error) {
        console.error('Erro ao verificar vitória:', error);
    }
}

// Revela todas as minas
function revealAllMines() {
    try {
        mines.forEach(mine => {
            const [row, col] = mine.split(',').map(Number);
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('mine');
                cell.textContent = '💣';
            }
        });
    } catch (error) {
        console.error('Erro ao revelar minas:', error);
    }
}

// Inicia o timer
function startTimer() {
    try {
        if (timer) clearInterval(timer);
        timeElapsed = 0;
        
        timer = setInterval(() => {
            timeElapsed++;
            const minutes = Math.floor(timeElapsed / 60);
            const seconds = timeElapsed % 60;
            document.getElementById('time').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    } catch (error) {
        console.error('Erro ao iniciar timer:', error);
    }
}

// Calcula os pontos
function calculatePoints() {
    try {
        const basePoints = 1000;
        const timeBonus = Math.max(0, 500 - timeElapsed * 10);
        const difficultyMultiplier = {
            easy: 1,
            medium: 1.5,
            hard: 2
        }[currentDifficulty] || 1;
        
        return Math.floor((basePoints + timeBonus) * difficultyMultiplier);
    } catch (error) {
        console.error('Erro ao calcular pontos:', error);
        return 0;
    }
}

// Atualiza o ranking
function updateRanking() {
    try {
        let ranking = JSON.parse(localStorage.getItem('minesweeperRanking') || '[]');
        
        // Validação dos dados
        if (!Array.isArray(ranking)) {
            ranking = [];
        }
        
        // Adiciona nova pontuação
        ranking.push({
            name: playerName,
            points: points,
            difficulty: currentDifficulty,
            date: new Date().toISOString(),
            time: timeElapsed
        });
        
        // Ordena por pontos (decrescente)
        ranking.sort((a, b) => b.points - a.points);
        
        // Mantém apenas os 10 melhores
        ranking = ranking.slice(0, 10);
        
        // Salva no localStorage
        localStorage.setItem('minesweeperRanking', JSON.stringify(ranking));
        
        // Atualiza a exibição do ranking
        showRanking();
    } catch (error) {
        console.error('Erro ao atualizar ranking:', error);
    }
}

// Mostra o ranking
function showRanking() {
    try {
        const ranking = JSON.parse(localStorage.getItem('minesweeperRanking') || '[]');
        const rankingList = document.getElementById('ranking-list');
        rankingList.innerHTML = '';
        
        if (ranking.length === 0) {
            rankingList.innerHTML = '<p>Nenhuma pontuação registrada ainda.</p>';
            return;
        }
        
        ranking.forEach((entry, index) => {
            const div = document.createElement('div');
            div.className = 'ranking-entry';
            
            const date = new Date(entry.date).toLocaleDateString('pt-BR');
            const time = Math.floor(entry.time / 60) + ':' + 
                        (entry.time % 60).toString().padStart(2, '0');
            
            div.innerHTML = `
                <div class="rank-number">${index + 1}</div>
                <div class="rank-name">${entry.name}</div>
                <div class="rank-difficulty">${entry.difficulty}</div>
                <div class="rank-points">${entry.points}</div>
                <div class="rank-time">${time}</div>
                <div class="rank-date">${date}</div>
            `;
            rankingList.appendChild(div);
        });
        
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('.ranking').style.display = 'block';
    } catch (error) {
        console.error('Erro ao mostrar ranking:', error);
        alert('Erro ao carregar o ranking. Por favor, tente novamente.');
    }
}

// Inicia um novo jogo
function newGame(custom = false) {
    try {
        // Solicita o nome do jogador primeiro
        playerName = prompt('Digite seu nome:', 'Jogador');
        if (!playerName) playerName = 'Anônimo';
        
        // Atualiza o nome do jogador na interface
        document.getElementById('player-name').textContent = playerName;
        
        if (custom) {
            const rows = parseInt(prompt('Número de linhas (9-30):', '9'));
            const cols = parseInt(prompt('Número de colunas (9-30):', '9'));
            const mines = parseInt(prompt('Número de minas:', '10'));
            
            if (isNaN(rows) || isNaN(cols) || isNaN(mines) ||
                rows < 9 || rows > 30 || cols < 9 || cols > 30 ||
                mines < 1 || mines >= rows * cols) {
                alert('Valores inválidos!');
                return;
            }
            
            currentDifficulty = 'custom';
            initGame(rows, cols, mines);
        } else {
            const diff = prompt('Escolha a dificuldade (1-Fácil, 2-Médio, 3-Difícil):', '1');
            let config;
            
            switch (diff) {
                case '1': 
                    config = difficulties.easy;
                    currentDifficulty = 'Fácil';
                    break;
                case '2': 
                    config = difficulties.medium;
                    currentDifficulty = 'Médio';
                    break;
                case '3': 
                    config = difficulties.hard;
                    currentDifficulty = 'Difícil';
                    break;
                default: 
                    config = difficulties.easy;
                    currentDifficulty = 'Fácil';
            }
            
            initGame(config.rows, config.cols, config.mines);
        }
    } catch (error) {
        console.error('Erro ao iniciar novo jogo:', error);
        alert('Erro ao iniciar o jogo. Por favor, tente novamente.');
    }
}

// Funções de interface
function toggleFlagMode() {
    try {
        isFlagMode = !isFlagMode;
        const btn = document.getElementById('flag-btn');
        if (btn) {
            btn.textContent = isFlagMode ? 'Modo Bandeira' : 'Modo Revelar';
            btn.style.backgroundColor = isFlagMode ? '#fbbf24' : 'rgba(255, 0, 0, 0.562)';
        }
    } catch (error) {
        console.error('Erro ao alternar modo bandeira:', error);
    }
}

function giveUp() {
    try {
        if (confirm('Tem certeza que deseja desistir?')) {
            gameOver = true;
            revealAllMines();
            clearInterval(timer);
            alert('Game Over!');
        }
    } catch (error) {
        console.error('Erro ao desistir:', error);
    }
}

function backToMenu() {
    try {
        if (gameStarted && !gameOver && !confirm('Tem certeza que deseja voltar ao menu?')) {
            return;
        }
        
        if (timer) clearInterval(timer);
        
        document.querySelector('.game-container').style.display = 'none';
        document.querySelector('.menu').style.display = 'block';
    } catch (error) {
        console.error('Erro ao voltar ao menu:', error);
    }
}

function showHelp() {
    try {
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('.help').style.display = 'block';
    } catch (error) {
        console.error('Erro ao mostrar ajuda:', error);
    }
}

function hideHelp() {
    try {
        document.querySelector('.help').style.display = 'none';
        document.querySelector('.menu').style.display = 'block';
    } catch (error) {
        console.error('Erro ao esconder ajuda:', error);
    }
}

function hideRanking() {
    try {
        document.querySelector('.ranking').style.display = 'none';
        document.querySelector('.menu').style.display = 'block';
    } catch (error) {
        console.error('Erro ao esconder ranking:', error);
    }
}

function confirmExit() {
    try {
        if (confirm('Tem certeza que deseja sair?')) {
            if (timer) clearInterval(timer);
            window.close();
        }
    } catch (error) {
        console.error('Erro ao sair:', error);
    }
}

// Salvar e carregar jogo
function saveGame() {
    try {
        const gameState = {
            board,
            mines,
            flags,
            gameStarted,
            gameOver,
            timeElapsed,
            points,
            playerName,
            totalMines,
            currentDifficulty
        };
        
        localStorage.setItem('minesweeperSave', JSON.stringify(gameState));
        alert('Jogo salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar jogo:', error);
        alert('Erro ao salvar o jogo. Por favor, tente novamente.');
    }
}

function loadGame() {
    try {
        const savedGame = localStorage.getItem('minesweeperSave');
        if (!savedGame) {
            alert('Nenhum jogo salvo encontrado!');
            return;
        }
        
        const gameState = JSON.parse(savedGame);
        board = gameState.board;
        mines = gameState.mines;
        flags = gameState.flags;
        gameStarted = gameState.gameStarted;
        gameOver = gameState.gameOver;
        timeElapsed = gameState.timeElapsed;
        points = gameState.points;
        playerName = gameState.playerName;
        totalMines = gameState.totalMines;
        currentDifficulty = gameState.currentDifficulty;
        
        createBoard(board.length, board[0].length);
        document.getElementById('time').textContent = 
            `${Math.floor(timeElapsed / 60).toString().padStart(2, '0')}:${(timeElapsed % 60).toString().padStart(2, '0')}`;
        document.getElementById('points').textContent = points;
        document.getElementById('bombs').textContent = totalMines;
        
        if (gameStarted) {
            startTimer();
        }
        
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('.game-container').style.display = 'block';
    } catch (error) {
        console.error('Erro ao carregar jogo:', error);
        alert('Erro ao carregar o jogo. Por favor, tente novamente.');
    }
}

function resumeGame() {
    loadGame();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Limpa qualquer timer pendente
        if (timer) clearInterval(timer);
        
        // Verifica se há um jogo salvo
        const savedGame = localStorage.getItem('minesweeperSave');
        if (savedGame) {
            const gameState = JSON.parse(savedGame);
            if (gameState.gameStarted && !gameState.gameOver) {
                if (confirm('Há um jogo em andamento. Deseja continuar?')) {
                    loadGame();
                }
            }
        }
    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
});