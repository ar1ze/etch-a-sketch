const GRID_WIDTH = 960;
const GRID_SIZE = 16;
const CANVAS_BG = '#29303d';
const SQUARE_CLASS = 'square';
const canvas = document.querySelector('.canvas');
const gridSizeBtn = document.querySelector('#grid-size-btn');
const clearCanvasBtn = document.querySelector('#clear-canvas-btn');

// Track progressive darkening effect for each square
let gridSize = GRID_SIZE;
let hoverCounts = {};
let squareColors = {};

function generateSquareID(i, j) {
  return `${i}-${j}`;
}

function resetSquareGlobals() {
  hoverCounts = {};
  squareColors = {};
}

function updateGridSize(n) {
  gridSize = n;
}

function generateRandomRGB() {
  return [255, 255, 255].map((item) => Math.floor(item * Math.random()));
}

// Handle square hover interactions with progressive darkening
function handleSquareHover(square) {
  let squareID = square.id;
  if (!(squareID in hoverCounts)) {
    // First hover: set random color and initial opacity
    let rgbValue = `rgb(${generateRandomRGB().join(',')})`;
    squareColors[squareID] = rgbValue;
    hoverCounts[squareID] = 1;
    square.style.background = squareColors[squareID];
    square.style.opacity = 0.1;
  } else {
    // Subsequent hovers: increase opacity up to maximum of 10
    if (hoverCounts[squareID] < 10) {
      hoverCounts[squareID] += 1;
      square.style.opacity = hoverCounts[squareID] * 0.1;
    }
  }
}

function creteSquare(i, j, size) {
  let square = document.createElement('div');
  square.className = SQUARE_CLASS;
  square.id = generateSquareID(i, j);
  canvas.appendChild(square);
  square.style.flex = `1 1 ${size}px`;
  return square;
}

function createGrid(n) {
  let squareSize = Math.floor(GRID_WIDTH / n);
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      let square = creteSquare(i, j, squareSize);
      square.addEventListener('mouseenter', () => {
        handleSquareHover(square);
      });
    }
  }
}

function deleteSquares(n) {
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      squareID = generateSquareID(i, j);
      let square = document.getElementById(squareID);
      canvas.removeChild(square);
    }
  }
}

// Get valid grid size input from user (1-100)
function getUserInput() {
  let inputGridSize;
  do {
    let userInput = prompt('Enter grid size (1-100):');
    if (userInput === null) break;
    inputGridSize = parseInt(userInput);
    if (isNaN(inputGridSize) || inputGridSize <= 0 || inputGridSize > 100) {
      alert('Please enter a valid number between 1 and 100!');
      inputGridSize = null;
    }
  } while (inputGridSize === null);
  return inputGridSize;
}

function reDrawCanvas(inputGridSize) {
  console.log(inputGridSize);
  if (inputGridSize !== undefined && inputGridSize !== null) {
    deleteSquares(gridSize);
    resetSquareGlobals();
    createGrid(inputGridSize);
    updateGridSize(inputGridSize);
  } 
}

// Reset all squares to canvas background color
function clearCanvas(n) {
  resetSquareGlobals();
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      id = generateSquareID(i, j);
      square = document.getElementById(id);
      square.style.background = CANVAS_BG;
    }
  }
}

// Initialize with default 16x16 grid
createGrid(gridSize);
gridSizeBtn.addEventListener('click', () => reDrawCanvas(getUserInput()));
clearCanvasBtn.addEventListener('click', () => clearCanvas(gridSize));