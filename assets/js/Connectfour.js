const ROWS = 6;
const COLS = 7;
const RED = 'red';
const BLACK = 'black';

let board = []
let currentPlayer = null;
let gameRunning = false;

document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGameBtn');
    const colorForm = document.getElementById('colorForm');
    const gameBoard = document.getElementById('gameBoard');
    const message = document.createElement('p'); 
    message.classList.add('subtitle', 'is-5', 'has-text-centered');
    gameBoard.appendChild(message); 
   
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
            alert('Column is full! Please choose another column.');
            return;
        }

        board[row][col] = currentPlayer;
        renderBoard();

        if (checkWin(row, col)) {
            gameRunning = false;
            setTimeout(() => {
                alert(`${currentPlayer.toUpperCase()} wins!`);
                resetGame();
            }, 100);
            return;
        }

        if (checkTie()) {
            gameRunning = false;
            setTimeout(() => {
                alert('It\'s a tie!');
                resetGame();
            }, 100);
            return;
        }

        currentPlayer = currentPlayer === RED ? BLACK : RED;
        message.textContent = `Current turn: ${currentPlayer}`;
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
        for (let c = 0; c < COLS; c++) {
            if (board[row][c] === currentPlayer) {
                count++;
                if (count >= 4) return true;
            } else {
                count = 0;
            }
        }

        count = 0;
        for (let r = 0; r < ROWS; r++) {
            if (board[r][col] === currentPlayer) {
                count++;
                if (count >= 4) return true;
            } else {
                count = 0;
            }
        }

        count = 0;
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
            alert('Please select a color to start the game.');
            return;
        }

        if (selectedColor.value === 'red') {
            currentPlayer = RED;
        } else if (selectedColor.value === 'black') {
            currentPlayer = BLACK;
        }

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
});





function updateConScore() {
    localStorage.setItem('ConStats', JSON.stringify(conStorage))
}

