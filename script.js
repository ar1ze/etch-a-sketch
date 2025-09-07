// Constants
const GRID_WIDTH = 960;
const SQUARE_CLASS = 'square';

// DOM
const container = document.querySelector('.container');

// Generate id
function generateSquareID(i, j) {
  return `${i}-${j}`;
}

// Create a square
function creteSquare(i, j, flexBasis) {
  let square = document.createElement('div');
  square.className = SQUARE_CLASS;
  square.id = generateSquareID(i, j);
  square.style.flex = `1 1 ${flexBasis}px`;
  container.appendChild(square);
  createSquareText(square, i ,j);
}

// Append id text to the square 
function createSquareText(square, i, j) {
  let paragraph = document.createElement('p');
  paragraph.textContent = generateSquareID(i, j);
  square.appendChild(paragraph);
}

function createGrid(n) {
  let squareSize = GRID_WIDTH / n;
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      creteSquare(i, j, squareSize);
    }
  }
}

createGrid(6);
