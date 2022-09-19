// an entire usable chess board in a terminal
// with a simple interface

class Board {
  constructor() {
    this.board = [
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", "p", "p", "p", "p", "p", "p", "p"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ];
  }

  getBoard() {
    return this.board;
  }

  movePiece(from, to) {
    const [fromX, fromY] = from;
    const [toX, toY] = to;

    if (this.board[fromX][fromY] === " ") {
      console.log("No piece at that position");
      return;
    }

    if (this.board[toX][toY] !== " ") {
      console.log("Cannot move there");
      return;
    }

    this.board[toX][toY] = this.board[fromX][fromY];
    this.board[fromX][fromY] = " ";
  }
}

function playChess() {
  const board = new Board();
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function printBoard() {
    const boardData = board.getBoard();
    for (let i = 0; i < boardData.length; i++) {
      console.log(boardData[i].join(" "));
    }
  }

  function askForMove() {
    readline.question("Enter a move: ", (move) => {
      const [from, to] = move.split(",");
      board.movePiece(from.split(" "), to.split(" "));
      printBoard();
      askForMove();
    });
  }

  function findBestMove() {}

  printBoard();
  askForMove();
}

playChess();
