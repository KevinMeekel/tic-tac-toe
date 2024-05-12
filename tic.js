function player(name, symbol, color) {
    let wins = 0;

    const updateScore = () => {
        wins++;
    };

    const getWins = () => {
        return wins;
    };

    return { name, symbol, color, updateScore, getWins };
};

const board = (function () {
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const reset = function () {
        boardState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(function(cell) {
            cell.style.backgroundColor = "white";
        });
    };

    const makeMove = function (index, symbol) {
        if (boardState[index] === "") {
            boardState[index] = symbol;
            return true; // Move successful
        }
        return false; // Move unsuccessful
    };

    const getBoardState = function () {
        return boardState;
    };

    return { makeMove, reset, getBoardState };
})();

const player1 = player("Kevin", "X", "red");
const player2 = player("Shrimpy", "O", "green");

const game = () => {
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        console.log(`${currentPlayer.name} has made a move.`);
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`current player: ${currentPlayer.name}`);
    };

    const colorTile = (index) => {
        cells[index].style.backgroundColor = currentPlayer.color;
        console.log('colortile triggered');
    }

    const checkLine = (index1, index2, index3) => {
        const boardState = board.getBoardState();
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
            console.log(`${currentPlayer.name} wins!`);
            console.log(`${currentPlayer.name} wins: ${currentPlayer.getWins()}`);
        }
    };

    const makeMove = (index) => {
        if (!gameOver) {
            const symbol = currentPlayer.symbol;
            if (board.makeMove(index, symbol)) {
                colorTile(index);
                checkWin();
                switchPlayer();
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
    };

    return { makeMove, reset };
};

const ticTacToe = game();

const cells = document.querySelectorAll('.cell');

cells.forEach(function(cell) {
    cell.addEventListener('click', function(){
        ticTacToe.makeMove(cell.id);
    })
});

const resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', function() {
    board.reset();
    ticTacToe.reset();
});

// ticTacToe.makeMove(0);
// ticTacToe.makeMove(2);
// ticTacToe.makeMove(3);
// ticTacToe.makeMove(4);
// ticTacToe.makeMove(8);
// ticTacToe.makeMove(6);