
document.addEventListener('DOMContentLoaded', function() {
    let storedTicScore = JSON.parse(localStorage.getItem('ticScore')) || { X: 0, O: 0, Tie: 0 };
    
    // Display scores on the separate page
    document.getElementById('scoreX').textContent = 'Score X: ' + storedTicScore.X;
    document.getElementById('scoreO').textContent = 'Score O: ' + storedTicScore.O;
    document.getElementById('scoreTie').textContent = 'Ties: ' + storedTicScore.Tie;
});

/*⠀⠀⠀⠀⣀⣤⣴⣶⣶⣶⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⢿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣾⣿⣿⣿⣿⣿⣿⣿⣅⢀⣽⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀
⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠁⠀⠀⣴⣶⡄⠀⣶⣶⡄⠀⣴⣶⡄Developer code split
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⠀⠙⠋⠁⠀⠉⠋⠁⠀⠙⠋⠀
⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠙⠿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀*/
document.addEventListener('DOMContentLoaded', () => {

    function loadScores() {
       
        let conStats = JSON.parse(localStorage.getItem('ConStats')) || {
            redWins: 0,
            redLosses: 0,
            blackWins: 0,
            blackLosses: 0
        };

        document.getElementById('redWins').textContent = conStats.redWins;
        document.getElementById('redLosses').textContent = conStats.redLosses;
        document.getElementById('blackWins').textContent = conStats.blackWins;
        document.getElementById('blackLosses').textContent = conStats.blackLosses;
    }

    loadScores();
});
