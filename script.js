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