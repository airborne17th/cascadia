const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 50;
const gridSize = 6;
const gap = 5;
const terrains = ['River', 'Forest', 'Desert', 'Mountain', 'Grassland'];
const wildlife = ['Hawk', 'Fox', 'Bear', 'Elk', 'Salmon'];
const colors = {
    'River': 'blue',
    'Forest': 'green',
    'Desert': 'yellow',
    'Mountain': 'gray',
    'Grassland': 'lightgreen'
};
const terrainCounts = {
    'River': 0,
    'Forest': 0,
    'Desert': 0,
    'Mountain': 0,
    'Grassland': 0
};
const grid = [];
let probabilities = [];

// Initialize the grid with default terrain and valid status
for (let row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (let col = 0; col < gridSize; col++) {
        grid[row][col] = { terrain: null, valid: true };
        drawCell(row, col, 'lightblue');
    }
}

// Draw a cell
function drawCell(row, col, color) {
    const x = col * (cellSize + gap);
    const y = row * (cellSize + gap);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);
    ctx.strokeRect(x, y, cellSize, cellSize);
}

// Function to log messages to the log user actions to HTML
function logMessage(message) {
    const logDiv = document.getElementById('log');
    logDiv.textContent = message;
}


function calculateProbabilities() {
    const randTerr = Math.floor(Math.random() * 5); // Random number from 0 to 4
    const randFavored = Math.floor(Math.random() * 100) + 1; // Random number from 1 to 100

    return {
        randTerr: randTerr,
        randFavored: randFavored
    };
}

// Draw a terrain tile based on probabilities
function drawTerrain() {
    const probabilities = calculateProbabilities();
    const terrain = terrains[probabilities.randTerr];
    const favored = probabilities.randFavored < 19; // Favored if randFavored is below 19

    return {
        terrain: terrain,
        favored: favored
    };
}

// Draw cell with terrain color and favored symbol
function drawCell(row, col, color, favored) {
    const ctx = canvas.getContext('2d');
    const x = col * (cellSize + gap);
    const y = row * (cellSize + gap);

    // Draw the terrain color
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);

    // Draw the favored symbol if favored
    if (favored) {
        ctx.fillStyle = 'black'; // Yellow color for the star
        ctx.font = '16px Arial';
        ctx.fillText('★', x + cellSize - 16, y + cellSize - 4); // Adjust position as needed
    }
}

// Function to handle wildlife selection
function selectWildlife(wildlife) {
    logMessage(`Selected wildlife: ${wildlife}`);
    console.log(`Selected wildlife: ${wildlife}`);
}

// Handle click events
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / (cellSize + gap));
    const row = Math.floor(y / (cellSize + gap));

    if (grid[row][col].valid) {
        const { terrain, favored } = drawTerrain();
        grid[row][col].terrain = terrain;
        grid[row][col].favored = favored;
        grid[row][col].valid = false; 

        // Change terrain and add favored symbol
        drawCell(row, col, colors[terrain], favored);

        const message = `Cell (${row}, ${col}) is now ${terrain} (Favored: ${favored})`;
        logMessage(message);
    } else {
        const message = `Cell (${row}, ${col}) is already set to ${grid[row][col].terrain}`;
        logMessage(message);
    }
});

// Initialize buttons with random wildlife options
function initializeWildlifeButtons() {
    const buttons = document.querySelectorAll('#wildlife-buttons button');
    buttons.forEach(button => {
        const randomWildlife = wildlife[Math.floor(Math.random() * wildlife.length)];
        button.textContent = randomWildlife;
    });
}

// Function to handle wildlife selection
function selectWildlife(buttonId) {
    const button = document.getElementById(buttonId);
    const selectedWildlife = button.textContent;
    logMessage(`Selected wildlife: ${selectedWildlife}`);
    console.log(`Selected wildlife: ${selectedWildlife}`);

    // Change the button text to a new random wildlife option
    let newWildlife;
    do {
        newWildlife = wildlife[Math.floor(Math.random() * wildlife.length)];
    } while (newWildlife === selectedWildlife); // Ensure the new option is different

    button.textContent = newWildlife;
}

// Call the function to initialize buttons
initializeWildlifeButtons(); 