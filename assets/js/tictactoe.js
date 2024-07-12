const grid = document.getElementById('grid');
const msg = document.getElementById('message');
const choice = document.querySelector('form');
const playerXScore = document.querySelector('.playerXScore');
const playerOScore = document.querySelector('.playerOScore');
const playerTScore = document.querySelector('.playerTScore');
const modal = document.querySelector("#myModal");
const closeModal = document.querySelector(".modal-close");
const resetButton = document.querySelector('#reset');
const clearScoresButton = document.getElementById('clearScores');
let mark;
let cells;
let gameEnded = false;


let ticScore = JSON.parse(localStorage.getItem('ticScore')) || { X: 0, O: 0 };

function updateTicScore() {
    if (mark === 'X') {
        ticScore.X++;
    } else if (mark === 'O') {
        ticScore.O++;
    }
    localStorage.setItem('ticScore', JSON.stringify(ticScore));
    syncScoreTic();
}

function syncScoreTic() {
    playerXScore.textContent = 'Score X: ' + (ticScore.X || 0); 
    playerOScore.textContent = 'Score O: ' + (ticScore.O || 0);
    playerTScore.textContent = 'Ties: ' + (ticScore.Tie || 0);
}

function setMark(e) {
    mark = e.target.value;
    msg.textContent = mark + ', click to make a move!';
    choice.classList.add('good-luck');
    e.target.checked = false;
    buildGame();
}

function playerTurn(e) {
    if (gameEnded || e.target.textContent !== '__' || checkRow()) {
        return; 
    }

    e.target.textContent = mark;
    if (checkRow()) {
        endGame();
        return;
    }
    switchMark();
    computerTurn();
}

function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', playerTurn));

    if (checkRow()) {
        if (msg.textContent.includes('It\'s a tie!')) {
            modal.style.display = 'block';
            declareTie(); 
        } else {
            gameEnded = false; 
        }
    }
}

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

function resetGame() {
    mark = 'X';
    cells.forEach(cell => {
        cell.textContent = '__';
        cell.classList.remove('winner');
    });
    msg.textContent = 'Choose your player:';
    choice.classList.remove('good-luck');
    gameEnded = false; 
}

function checkRow() {
    if (
        winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')) ||
        winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6')) ||
        winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9')) ||
        winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7')) ||
        winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8')) ||
        winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9')) ||
        winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9')) ||
        winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'))
    ) {
        return true; 
    }
      // Check for a tie if all cells are filled
      if (cells.every(cell => cell.textContent !== '__')) {
        declareTie();
        return true;
      }
    return false; 
}

function declareTie() {
    msg.textContent = 'It\'s a tie!';
    
    ticScore.Tie = (ticScore.Tie || 0) + 1;
    localStorage.setItem('ticScore', JSON.stringify(ticScore));
    syncScoreTic();
}

function computerTurn() {
    let emptyCells = cells.filter(cell => cell.textContent === '__');

    if (emptyCells.length > 0) {
        let random = Math.floor(Math.random() * emptyCells.length);
        emptyCells[random].textContent = mark;
        checkRow();
        switchMark();
    } else {
        
    }
}

function switchMark() {
    if (mark == 'X') {
        mark = 'O';
    } else {
        mark = 'X';
    }
}

function winner(a, b, c) {
    if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
        msg.textContent = mark + ' is the winner!';
        a.classList.add('winner');
        b.classList.add('winner');
        c.classList.add('winner');
        if (updateTicScore()) { 
            return true;
        }
    }
    return false;
}
function buildGame() {
    if (cells && cells.length > 0) {
        return; 
    }
    for (let i = 1; i <= 9; i++) {
        let cell = document.createElement('li');
        cell.id = 'c' + i;
        cell.textContent = '__'
        cell.addEventListener('click', playerTurn, false);
        grid.appendChild(cell);
    }

    cells = Array.prototype.slice.call(grid.getElementsByTagName('li'));
}

let players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function(choice){
    choice.addEventListener('click', setMark, false);
});

const resetModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    resetGame();
});

clearScoresButton.addEventListener('click', function() {
    ticScore.X = 0;
    ticScore.O = 0;
    ticScore.Tie = 0;
    localStorage.setItem('ticScore', JSON.stringify(ticScore));
    syncScoreTic();
});

syncScoreTic();
