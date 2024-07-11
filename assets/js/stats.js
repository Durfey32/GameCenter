// const conStats = document.querySelector('.HangStats');
const ticArea = document.querySelector('.TicArea');
const conArea = document.querySelector('.HangArea');

const ticscore = JSON.parse(localStorage.getItem('ticScore'));
const conscore = JSON.parse(localStorage.getItem('conScore'));

let ticStorage = JSON.parse(localStorage.getItem('TicStats')) || [];
let conStorage = JSON.parse(localStorage.getItem('ConStats')) || [];

function winLossTic() {
    const evaluateTic = Math.random();
    if(evaluateTic > 0 && evaluateTic <=0.5) {
        ticscore.lose++;
    } else if (evaluateTic > 0.5 && evaluateTic <= 1) {
        ticscore.win++;
    }
}

function winLossCon() {
    const evaluateCon = Math.random();
    if(evaluateCon > 0 && evaluateCon <=0.5) {
        conscore.lose++;
    } else if (evaluateTic > 0.5 && evaluateCon <= 1) {
        conscore.win++;
    }
}

localStorage.setItem('ticscore', JSON.stringify(ticStorage))

let hangStorage = JSON.parse(localStorage.getItem('HangStats')) ||[];

function displayTic(type, message) {
    ticArea.textContent = message;
    ticArea.setAttribute('class', type);
}

function displayCon(type, message) {
    hangArea.textContent = message;
    hangArea.setAttribute('class', type);
}

function renderTicScore() {
    const ticScore = localStorage.getItem('TicStats');

    ticStats.textContent = ticScore
}

function renderHangScore() {
    const conScore = localStorage.getItem('ConStats');

    hangStats.textContent = conScore
}

function updateTicScore() {
    localStorage.setItem('TicStats', JSON.stringify(ticStorage))
}

function updateConScore() {
    localStorage.setItem('ConStats', JSON.stringify(conStorage))
}

