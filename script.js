
const board = document.getElementById('board');
let currentPlayer = 'X';
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => handleMove(rowIndex, colIndex));
            rowElement.appendChild(cellElement);
        });
        board.appendChild(rowElement);
    });
}

function handleMove(row, col) {
    if (gameBoard[row][col] === '' && !checkForWinner()) {
        gameBoard[row][col] = currentPlayer;
        renderBoard();
        if (checkForWinner()) {
            alert(`Player ${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            alert("It's a tie!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkForWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] !== '' && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][0] === gameBoard[i][2]) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (gameBoard[0][i] !== '' && gameBoard[0][i] === gameBoard[1][i] && gameBoard[0][i] === gameBoard[2][i]) {
            return true;
        }
    }
    // Check diagonals
    if (gameBoard[0][0] !== '' && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) {
        return true;
    }
    if (gameBoard[0][2] !== '' && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0]) {
        return true;
    }
    return false;
}

function isBoardFull() {
    return gameBoard.every(row => row.every(cell => cell !== ''));
}

renderBoard();
