const ticArea = document.querySelector('.TicArea');
const conArea = document.querySelector('.ConArea');

const ticscore = JSON.parse(localStorage.getItem('ticscore'));
const conscore = JSON.parse(localStorage.getItem('conscore'));

// let ticStorage = JSON.parse(localStorage.getItem('TicStats')) || [];
// let conStorage = JSON.parse(localStorage.getItem('constats')) || [];

// function winLossTic() {
//     const evaluateTic = Math.random();
//     if(evaluateTic > 0 && evaluateTic <=0.5) {
//         ticscore.lose++;
//     } else if (evaluateTic > 0.5 && evaluateTic <= 1) {
//         ticscore.win++;
//     }
// }

// ticScore = isNaN(Number(ticScore)) ? 0 : Number(ticScore);


function displayTic(type, message) {
    ticArea.textContent = message;
    ticArea.setAttribute('class', type);
}

function displayCon(type, message) {
    conArea.textContent = message;
    conArea.setAttribute('class', type);
}

function renderTicScore() {
    const ticscore = localStorage.getItem('ticScore');

    ticScore.textContent = ticScore
}

function renderConScore() {
    const conscore = localStorage.getItem('ConStats');

    conscore.textContent = conscore
}

// function updateTicScore() {
//     localStorage.setItem('TicStats', JSON.stringify(ticStorage))
// }

// function updateConScore() {
//     localStorage.setItem('ConStats', JSON.stringify(conStorage))
// }

