const grid = document.getElementById('grid');
const msg = document.getElementById('message');
const choice = document.querySelector('form');
const ticStats = document.querySelector('.TicStats');
const player1 = document.querySelector('#choose');
let mark;
let cells;

// const ticscore = JSON.parse(localStorage.getItem('ticscore'));

let ticStorage = JSON.parse(localStorage.getItem('ticscore')) ||[];

let ticScore = localStorage.setItem('ticscore', JSON.stringify(ticStorage))

function displayTic(type, message) {
    ticArea.textContent = message;
    ticArea.setAttribute('class', type);
}

function updateTicScore() {
    localStorage.setItem('TicStats', JSON.stringify(ticStorage))
}

function winLossTic() {
    const evaluateTic = Math.random();
    if(evaluateTic > 0 && evaluateTic <=0.5) {
        ticscore.lose++;
    } else if (evaluateTic > 0.5 && evaluateTic <= 1) {
        ticscore.win++;
    }
}

function setMark(e) {
    mark = e.target.value;
    msg.textContent = mark + ', click on a square to make your move!';
    choice.classList.add('good-luck');
    e.target.checked = false;
    buildGame();
}

function playerTurn(e) { 
    console.log(e.target.textContent)
    if (e.target.textContent == '__') {
        e.target.textContent = mark;
        checkRow();
        switchMark();
        computerTurn();
    }
}

function computerTurn (e) {
    let emptyCells = [];
    let random;
    mark = e.target.value;
    cells.forEach(function(cell){
        if (cell.textContent == '') {
            emptyCells.push(cell);
        }
    });

random = Math.ceil(Math.random() * emptyCells.length) -1;
emptyCells[random].textContent = mark;
checkRow();
switchMark();
}

function switchMark() {
    if (mark == 'X') {
        mark = 'O';
    } else {
        mark = 'X';
    }
}

function winner(a, b, c) {
    if (a.textContent == mark && b.textContent == mark && c.textContent ==mark) {
        msg.textContent = mark + ' is the winner!';
        a.classList.add('winner');
        b.classList.add('winner');
        c.classList.add('winner');
        return true;
    } else {
        return false;
    }
}

function checkRow() {
    winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')); 
    winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'));
    winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9'));
    winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7'));
    winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8'));
    winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9'));
    winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9'));
    winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'));
}

function resetGame() {
    mark = 'X';

    cells.forEach(function(e) {
        cell.textContent = '__';
        cell.classList.remove('winner');
    });
    msg.textContent = 'Choose your player:';
    choice.classList.remove('good-luck');
    grid.innerHTML = '__';
}
 
function buildGame() {
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

let resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    resetGame();
});

