document.addEventListener('DOMContentLoaded', function() {
    let storedTicScore = JSON.parse(localStorage.getItem('ticScore')) || { X: 0, O: 0, Tie: 0 };
    
    // Display scores on the separate page
    document.getElementById('scoreX').textContent = 'Score X: ' + storedTicScore.X;
    document.getElementById('scoreO').textContent = 'Score O: ' + storedTicScore.O;
    document.getElementById('scoreTie').textContent = 'Ties: ' + storedTicScore.Tie;
});
