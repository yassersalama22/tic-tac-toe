// Function to check if the string is Empty or Null
function isEmptyOrNull(str) {
    return typeof str !== 'string' || str.trim() === '';
}

// Function to validate the board
function isValidBoard(board) {
    // Check if the board is a 3x3 array
    if (!Array.isArray(board) || board.length !== 3 || board.some(row => row.length !== 3)) {
        console.error('Invalid board. The board must be a 3x3 array.');
        return false;
    }
    return true;
}

// Function to validate the mark
function isValidMark(mark) {
    // Values of valid marks
    const validMarks = ['X', 'O'];

    // Check if the mark is valid
    if (!validMarks.includes(mark)) {
        console.error('Invalid mark. Please use "X" or "O".');
        return false;
    }
    return true;
}

// Define Player class
class Player {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }

    updateName(newName) {
        if (!isEmptyOrNull(newName)) {
            this.name = newName;
        }
    }
}

// Create two players to play the game
let player1 = new Player('Player 1', 'X');
let player2 = new Player('Player 2', 'O');

// Initialize the board
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'player1';

// Function to open the dialog to update player name
function openDialog(player) {
    document.getElementById('update-dialog').style.display = 'block';
    document.getElementById('update-dialog').setAttribute('data-player', player);
}

// Function to close the dialog
function closeDialog() {
    document.getElementById('update-dialog').style.display = 'none';
}

// Function to update the player name
function updatePlayerName() {
    const player = document.getElementById('update-dialog').getAttribute('data-player');
    const newName = document.getElementById('new-player-name').value;

    if (!isEmptyOrNull(newName)) {
        document.getElementById(`${player}-name`).innerHTML = `${newName}: <span>${player === 'player1' ? 'X' : 'O'}</span>`;
        closeDialog();
        if (player === 'player1') {
            player1.updateName(newName);
        } else {
            player2.updateName(newName);
        }
    }
}

// Function to make a move
function makeMove(board, row, cell, mark) {
    // Check if the board is valid
    if (!isValidBoard(board))
        return false;

    // Check if the mark is valid
    if (!isValidMark(mark))
        return false;

    // Check if row and cell indices are within bounds
    if (row < 0 || row > 2 || cell < 0 || cell > 2) {
        console.error('Invalid row or column. They must be between 0 and 2.');
        return false;
    }

    // Apply mark if the cell is empty
    if (board[row][cell] === '') {
        board[row][cell] = mark;
        return true;
    }

    console.error('The cell is already occupied.');
    return false;
}

// Function to check for a win
function checkWin(board, mark) {
    // Check if the board is valid
    if (!isValidBoard(board))
        return false;

    // Check if the mark is valid
    if (!isValidMark(mark))
        return false;

    // Check rows for win
    for (let row of board) {
        if (row.every(cell => cell === mark)) {
            return true;
        }
    }

    // Check columns for win
    for (let col = 0; col < 3; col++) {
        if (board.every(row => row[col] === mark)) {
            return true;
        }
    }

    // Check diagonals for win
    if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) {
        return true;
    }

    if (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark) {
        return true;
    }

    return false;
}

// Function to check for a draw
function checkDraw(board) {
    if (!isValidBoard(board)) {
        return false;
    }
    return board.flat().every(cell => cell !== '');
}

// Function to render the game board
function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click',()=> handleCellClick(row,col));
            cell.textContent = board[row][col];
            gameBoard.appendChild(cell);
        }
    }
}

// Function to handle cell click
function handleCellClick(row, col) {
    const currentMark = currentPlayer === 'player1' ? 'X' : 'O';

    // Check if the game is ended (win or draw) to reset the board and start new game
    if(document.getElementById('game-status').textContent !== ''){
        resetGame();
        return;
    }
       

    if(makeMove(board,row, col, currentMark)){

        renderBoard();

        if(checkWin(board, currentMark)){
            document.getElementById('game-status').textContent = `${currentPlayer} wins!`;
        }
        else if(checkDraw(board)){
            document.getElementById('game-status').textContent = 'It\'s draw!';
        }
        else {
            currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
            document.getElementById('player1-status').classList.toggle('current-player', currentPlayer === 'player1');
            document.getElementById('player2-status').classList.toggle('current-player', currentPlayer === 'player2');
            document.getElementById('player1-status').textContent = currentPlayer === 'player1' ? 'Current Player' : 'Waiting...';
            document.getElementById('player2-status').textContent = currentPlayer === 'player2' ? 'Current Player' : 'Waiting...';
        }
        
    }
}

// Function to reset the game.
function resetGame(){
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'player1';
    document.getElementById('player1-status').classList.add('current-player');
    document.getElementById('player2-status').classList.remove('current-player');
    document.getElementById('player1-status').textContent = 'Current Player';
    document.getElementById('player2-status').textContent = 'Waiting...';
    document.getElementById('game-status').textContent = '';
    renderBoard();
}

// Initial render of the board
renderBoard();