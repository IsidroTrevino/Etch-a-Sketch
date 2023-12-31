const slider = document.querySelector('#gridSizePicker');
const colorPicker = document.querySelector('#colorPicker');
const colorModeBtn = document.querySelector('#black');
const eraserBtn = document.querySelector('#eraser');
const gridSizeLabel = document.querySelector('#gridSize');
const clear = document.querySelector('#clear');
const gridContainer = document.querySelector('.Grid');

let isColorMode = false;
let isEraserMode = false;

function createGrid(size) {
    gridContainer.innerHTML = ''; // Clear previous grid

    gridContainer.style.display = 'flex'; // Use flexbox for layout
    gridContainer.style.flexWrap = 'wrap';

    for (let i = 0; i < size * size; i++) {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('grid-cell');
        gridDiv.style.width = `calc(100% / ${size})`; // Set cell width
        gridDiv.style.height = `calc(100% / ${size})`; // Set cell height
        gridDiv.addEventListener('mouseenter', handleGridCellEnter); // Add event listener to each grid cell
        gridContainer.appendChild(gridDiv);
    }

    // Change gridSizeLabel text to 'nxn' based on grid size
    gridSizeLabel.textContent = `${size}x${size}`;
}

// Function to color or erase on mouse enter
function handleGridCellEnter(e) {
    if ((isColorMode || isEraserMode) && e.target.classList.contains('grid-cell')) {
        if (isColorMode) {
            e.target.style.backgroundColor = colorPicker.value;
        } else if (isEraserMode) {
            e.target.style.backgroundColor = 'white';
        }
    }
}

// Event listeners for color mode and eraser mode toggles
colorModeBtn.addEventListener('click', () => {
    isColorMode = !isColorMode;
    isEraserMode = false; // Turn off eraser mode
});

eraserBtn.addEventListener('click', () => {
    isEraserMode = !isEraserMode;
    isColorMode = false; // Turn off color mode
});

// Event listener for slider input change
slider.addEventListener('input', function () {
    createGrid(this.value);
});

// Event listener for clear button to make all divs white
clear.addEventListener('click', () => {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
});

// Example: Create initial grid on page load with default size
createGrid(16); // Set default grid size
