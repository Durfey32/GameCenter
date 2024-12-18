document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGameBtn');
    const colorForm = document.getElementById('colorForm');
    const gameBoard = document.getElementById('gameBoard');
    const message = document.createElement('p');
    message.classList.add('subtitle', 'is-5', 'has-text-centered');
    gameBoard.appendChild(message);

    const ROWS = 6;
    const COLS = 7;
    const RED = 'red';
    const BLACK = 'black';

    let board = [];
    let currentPlayer = null;
    let gameRunning = false;

    let redWins = 0;
    let redLosses = 0;
    let redTies = 0;

    let blackWins = 0;
    let blackLosses = 0;
    let blackTies = 0;

    function updateLocalStorage() {
        const conStats = {
            redWins,
            redLosses,
            redTies,
            blackWins,
            blackLosses,
            blackTies
        };
        localStorage.setItem('ConStats', JSON.stringify(conStats));
    }

    function loadFromLocalStorage() {
        const conStats = JSON.parse(localStorage.getItem('ConStats')) || {};
        redWins = conStats.redWins || 0;
        redLosses = conStats.redLosses || 0;
        redTies = conStats.redTies || 0;
        blackWins = conStats.blackWins || 0;
        blackLosses = conStats.blackLosses || 0;
        blackTies = conStats.blackTies || 0;
        updateScoreboard();
    }

    function updateScoreboard() {
        document.getElementById('redWins').textContent = redWins;
        document.getElementById('redLosses').textContent = redLosses;
        document.getElementById('redTies').textContent = redTies;

        document.getElementById('blackWins').textContent = blackWins;
        document.getElementById('blackLosses').textContent = blackLosses;
        document.getElementById('blackTies').textContent = blackTies;

        updateLocalStorage();
    }

    function resetScores() {
        redWins = 0;
        redLosses = 0;
        redTies = 0;

        blackWins = 0;
        blackLosses = 0;
        blackTies = 0;

        updateScoreboard();
    }

    function initializeBoard() {
        board = [];
        for (let row = 0; row < ROWS; row++) {
            board[row] = [];
            for (let col = 0; col < COLS; col++) {
                board[row][col] = null;
            }
        }
    }

    function renderBoard() {
        gameBoard.innerHTML = '';

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (board[row][col] === RED) {
                    cell.classList.add('red');
                } else if (board[row][col] === BLACK) {
                    cell.classList.add('black');
                }
                cell.addEventListener('click', () => handleMove(col));
                gameBoard.appendChild(cell);
            }
        }
    }

    function handleMove(col) {
        if (!gameRunning) return;

        let row = dropPiece(col);

        if (row === -1) {
            showModal('Column is full! Please choose another column.');
            return;
        }

        board[row][col] = currentPlayer;
        renderBoard();

        if (checkWin(row, col)) {
            gameRunning = false;
            if (currentPlayer === RED) {
                redWins++;
                blackLosses++;
            } else {
                blackWins++;
                redLosses++;
            }
            updateScoreboard();
            showModal(`${currentPlayer.toUpperCase()} wins!`, resetGame);
            return;
        }

        if (checkTie()) {
            gameRunning = false;
            if (currentPlayer === RED) {
                redTies++;
            } else {
                blackTies++;
            }
            updateScoreboard();
            showModal('It\'s a tie!', resetGame);
            return;
        }

        currentPlayer = currentPlayer === RED ? BLACK : RED;
        message.textContent = `Current turn: ${currentPlayer}`;

        // Computer makes a move
        if (currentPlayer === BLACK && gameRunning) {
            setTimeout(() => {
                let computerCol;
                do {
                    computerCol = Math.floor(Math.random() * COLS);
                } while (board[0][computerCol] !== null); // Check if column is not full

                let computerRow = dropPiece(computerCol);
                board[computerRow][computerCol] = BLACK;
                renderBoard();

                if (checkWin(computerRow, computerCol)) {
                    gameRunning = false;
                    blackWins++;
                    redLosses++;
                    updateScoreboard();
                    showModal('BLACK wins!', resetGame);
                    return;
                }

                if (checkTie()) {
                    gameRunning = false;
                    blackTies++;
                    updateScoreboard();
                    showModal('It\'s a tie!', resetGame);
                    return;
                }

                currentPlayer = RED; // Switch back to user's turn
                message.textContent = 'Current turn: Red';
            }, 1000); // Delay for computer move for better user experience (1 second)
        }
    }

    function showModal(message, callback = null) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.classList.add('is-active');

        modal.addEventListener('click', function(event) {
            if (event.target === modal || event.target === document.getElementById('modal-ok')) {
                modal.classList.remove('is-active');
                if (callback) callback();
            }
        });
    }

    function dropPiece(col) {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][col] === null) {
                return row;
            }
        }
        return -1;
    }

    function checkWin(row, col) {
        let count = 0;
        // Check horizontally
        for (let c = 0; c < COLS; c++) {
            if (board[row][c] === currentPlayer) {
                count++;
                if (count >= 4) return true;
            } else {
                count = 0;
            }
        }

        count = 0;
        // Check vertically
        for (let r = 0; r < ROWS; r++) {
            if (board[r][col] === currentPlayer) {
                count++;
                if (count >= 4) return true;
            } else {
                count = 0;
            }
        }

        count = 0;
        // Check diagonally (top-left to bottom-right)
        let r = row, c = col;
        while (r > 0 && c > 0) {
            r--;
            c--;
        }
        while (r < ROWS && c < COLS) {
            if (board[r][c] === currentPlayer) {
                count++;
                if (count >= 4) return true;
            } else {
                count = 0;
            }
            r++;
            c++;
        }

        count = 0;
        // Check diagonally (top-right to bottom-left)
        r = row, c = col;
        while (r > 0 && c < COLS - 1) {
            r--;
            c++;
        }
        while (r < ROWS && c >= 0) {
            if (board[r][c] === currentPlayer) {
                count++;
                if (count >= 4) return true;
            } else {
                count = 0;
            }
            r++;
            c--;
        }

        return false;
    }

    function checkTie() {
        for (let col = 0; col < COLS; col++) {
            if (board[0][col] === null) {
                return false;
            }
        }
        return true;
    }

    function startConnectFour() {
        const selectedColor = colorForm.querySelector('input[name="color"]:checked');

        if (!selectedColor) {
            showModal('Please select a color to start the game.');
            return;
        }

        currentPlayer = selectedColor.value === 'red' ? RED : BLACK;

        initializeBoard();
        renderBoard();
        gameRunning = true;
        message.textContent = `Current turn: ${currentPlayer}`;
    }

    function resetGame() {
        initializeBoard();
        renderBoard();
        gameRunning = false;
        currentPlayer = null;
        message.textContent = 'Choose Red or Black';
    }

    startGameBtn.addEventListener('click', startConnectFour);

    const resetScoreBtn = document.getElementById('resetScoreBtn');
    resetScoreBtn.addEventListener('click', () => {
        resetScores();
    });

    loadFromLocalStorage();
});
