function player(name, symbol) {
    let wins = 0;

    const updateScore = () => {
        wins++;
    }
    return { name, symbol, updateScore };
}

const board = (function () {
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const reset = function () {
        boardState = ['', '', '', '', '', '', '', '', ''];
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

const player1 = player("Kevin", "X");
const player2 = player("Shrimpy", "O");

const game = () => {
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

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
            board.reset();
            console.log(`${currentPlayer.name} wins!`);
        }
    };

    const makeMove = (index) => {
        if (!gameOver) {
            const symbol = currentPlayer.symbol;
            if (board.makeMove(index, symbol)) {
                checkWin();
                switchPlayer();
            } else {
                console.log("Invalid move!");
            }
        } else {
            console.log("Game over!");
        }
    };

    return { makeMove };
}

const ticTacToe = game();
ticTacToe.makeMove(0);
ticTacToe.makeMove(2);
ticTacToe.makeMove(3);
ticTacToe.makeMove(4);
ticTacToe.makeMove(8);
ticTacToe.makeMove(6);