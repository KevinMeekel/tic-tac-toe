const resetButton = document.querySelector('.reset');
const displayElement = document.querySelector('.display');
const colorSpan = document.querySelector('.current-color');
const redRound = document.querySelector('.red-round');
const greenRound = document.querySelector('.green-round');
const player1WinsSpan = document.querySelector('.player1-wins');
const player2WinsSpan = document.querySelector('.player2-wins');

function player(color) {
    let wins = 0;

    const updateScore = () => {
        wins++;
    };

    const getWins = () => {
        return wins;
    };

    const resetWins = () => {
        wins = 0;
    }

    return { color, updateScore, getWins, resetWins };
};

const player1 = player("Red");
const player2 = player("Green");

const board = (function () {
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const reset = function () {
        boardState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(function(cell) {
            cell.style.backgroundColor = "white";
        });
    };

    const makeMove = function (index, color) {
        if (boardState[index] === "") {
            boardState[index] = color;
            return true; // Move successful
        }
        return false; // Move unsuccessful
    };

    const getBoardState = function () {
        return boardState;
    };

    return { makeMove, reset, getBoardState };
})();

const game = () => {
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        console.log(`${currentPlayer.color} has made a move.`);
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`current player: ${currentPlayer.color}`);
    };

    const colorTile = (index) => {
        cells[index].style.backgroundColor = currentPlayer.color;
    }

    const checkLine = (index1, index2, index3) => {
        const boardState = board.getBoardState();
        console.log(boardState);
        return boardState[index1] !== '' && boardState[index1] === boardState[index2] && boardState[index2] === boardState[index3];
    };
    
    const checkWin = () => {
        const lines = [
            checkLine(0, 1, 2),
            checkLine(3, 4, 5),
            checkLine(6, 7, 8),
            checkLine(0, 3, 6),
            checkLine(1, 4, 7),
            checkLine(2, 5, 8),
            checkLine(0, 4, 8),
            checkLine(2, 4, 6)
        ];

        if (lines.includes(true)) {
            gameOver = true;
            currentPlayer.updateScore();
            displayWins();
            displayRound();
            console.log(`${currentPlayer.color} wins!`);
            console.log(`${currentPlayer.color} wins: ${currentPlayer.getWins()}`);
        }
    };

    const makeMove = (index) => {
        if (!gameOver) {
            const color = currentPlayer.color;
            if (board.makeMove(index, color)) {
                colorTile(index);
                checkWin();
                switchPlayer();
                playerDisplay(currentPlayer);
                colorDisplay();
                checkVictory();
            } else {
                console.log("Invalid move!");
            }
        } else {
            console.log("Game over!");
        }
    };

    const reset = () => {
        board.reset();
        currentPlayer = player1;
        gameOver = false;
        redRound.style = 'display: none';
        greenRound.style = 'display: none';
    };

    return { currentPlayer, makeMove, reset };
};

const ticTacToe = game();
const cells = document.querySelectorAll('.cell');

cells.forEach(function(cell) {
    cell.addEventListener('click', function(){
        ticTacToe.makeMove(cell.id);
    })
});

resetButton.addEventListener('click', function() {
    ticTacToe.reset();
    playerDisplay(ticTacToe.currentPlayer);

    const displayElement = document.querySelector('.display');
    const victoryMessage = document.querySelector('.victory');
    
    if (displayElement.style.backgroundColor != "ghostwhite") {
        displayElement.style.backgroundColor = "ghostwhite";
    }

    if (victoryMessage) {
        displayElement.removeChild(victoryMessage);
    }
    displayWins();
    return;
});

function colorDisplay() {
    if (colorSpan.textContent === 'Red') {
        colorSpan.style.color = 'red';
    } else if (colorSpan.textContent === 'Green') {
        colorSpan.style.color = 'green';
    }
};

function playerDisplay(currentPlayer) {
    if (currentPlayer === player2) {
        colorSpan.textContent = 'Green';
    } else {
        colorSpan.textContent = 'Red';
    }
    colorDisplay();
};

function displayRound() {
    if (colorSpan.style.color === 'red') {
        redRound.style = 'display: block';
    } else if (colorSpan.style.color === 'green') {
        greenRound.style = 'display: block';
    }
};

function redVictory() {
    console.log('redVictory function triggered');
    displayElement.style.backgroundColor = "lightcoral";
    const victoryMessage = document.createElement('h1');
    victoryMessage.classList.add('victory');
    victoryMessage.textContent = 'Red wins the best of 5!';
    displayElement.appendChild(victoryMessage);
    player1.resetWins();
    player2.resetWins();
};

function greenVictory() {
    console.log('greenVictory function triggered');
    displayElement.style.backgroundColor = "lightgreen";
    const victoryMessage = document.createElement('h1');
    victoryMessage.classList.add('victory');
    victoryMessage.textContent = 'Green wins the best of 5!';
    displayElement.appendChild(victoryMessage);
    player1.resetWins();
    player2.resetWins();
};

function checkVictory() {
    const player1Wins = player1.getWins();
    const player2Wins = player2.getWins();
    if (player1Wins === 3) {
        redVictory();        
    } else if (player2Wins === 3) {
        greenVictory();
    } return;
};

function displayWins() {
    player1WinsSpan.innerHTML = player1.getWins();
    player2WinsSpan.innerHTML = player2.getWins();
};

colorDisplay();
playerDisplay();
