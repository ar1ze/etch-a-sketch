const GRID_WIDTH = 960;
const SQUARE_CLASS = 'square';

const container = document.querySelector('.container');

// Track hover counts and colors for each square
let hoverCounts = {};
let squareColors = {};

function generateSquareID(i, j) {
  return `${i}-${j}`;
}

// Generate random RGB color values
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
    // Subsequent hovers: increase opacity up to maximum
    if (hoverCounts[squareID] < 10) {
      hoverCounts[squareID] += 1;
      square.style.opacity = hoverCounts[squareID] * 0.1;
    }
  }
}

function setSquareFlexBasis(square, size) {
  square.style.flex = `1 1 ${size}px`;
}

function creteSquare(i, j) {
  let square = document.createElement('div');
  square.className = SQUARE_CLASS;
  square.id = generateSquareID(i, j);
  container.appendChild(square);
  return square;
}

function createSquareText(square, i, j) {
  let paragraph = document.createElement('p');
  paragraph.textContent = generateSquareID(i, j);
  square.appendChild(paragraph);
}

// Create n×n grid of interactive squares
function createGrid(n) {
  let squareSize = Math.floor(GRID_WIDTH / n);
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= n; j++) {
      let square = creteSquare(i, j, squareSize);
      setSquareFlexBasis(square, squareSize);
      square.addEventListener('mouseenter', () => {
        handleSquareHover(square);
      });
    }
  }
}

createGrid(16);
