// Game constants
const GRID_WIDTH = 28;
const GRID_HEIGHT = 31;
const CELL_SIZE = 20;
const DIRECTIONS = {
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 }
};
const DIRECTIONS = {
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 }
};

// Maze layout (1: wall, 0: path with dot, 2: empty path)
const MAZE_LAYOUT = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Game state
let score = 0;
let lives = 3;
let gameBoard = [];
let pacmanPosition = { x: 14, y: 23 };  // Starting position for Pacman
let ghostPosition = { x: 14, y: 14 };   // Starting position for Ghost
let isGameOver = false;
let dotsRemaining = 0;

// Initialize the game board
function initializeBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';  // Clear existing content
    dotsRemaining = 0;
    
    // Create the maze layout
    for (let y = 0; y < GRID_HEIGHT; y++) {
        gameBoard[y] = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            const cell = document.createElement('div');
            
            // Set cell type based on maze layout
            if (MAZE_LAYOUT[y][x] === 1) {
                cell.classList.add('wall');
                gameBoard[y][x] = 'wall';
            } else if (MAZE_LAYOUT[y][x] === 0) {
                cell.classList.add('dot');
                gameBoard[y][x] = 'dot';
                dotsRemaining++;
            } else {
                gameBoard[y][x] = 'empty';
            }
            
            board.appendChild(cell);
        }
    }

    // Place Pac-Man and ghost
    updateGameBoard();
}

// Update the game board visuals
function updateGameBoard() {
    const cells = document.getElementById('game-board').children;
    
    // Clear previous positions
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('pacman', 'ghost');
    }
    
    // Update Pac-Man position
    const pacmanIndex = pacmanPosition.y * GRID_SIZE + pacmanPosition.x;
    cells[pacmanIndex].classList.add('pacman');
    
    // Update ghost position
    const ghostIndex = ghostPosition.y * GRID_SIZE + ghostPosition.x;
    cells[ghostIndex].classList.add('ghost');
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    if (isGameOver) return;

    const newPosition = { ...pacmanPosition };

    switch (event.key) {
        case 'ArrowUp':
            newPosition.y--;
            break;
        case 'ArrowDown':
            newPosition.y++;
            break;
        case 'ArrowLeft':
            newPosition.x--;
            break;
        case 'ArrowRight':
            newPosition.x++;
            break;
    }

    // Check if the new position is valid
    if (gameBoard[newPosition.y][newPosition.x] !== 'wall') {
        pacmanPosition = newPosition;
        
        // Check if Pac-Man ate a dot
        if (gameBoard[pacmanPosition.y][pacmanPosition.x] === 'dot') {
            gameBoard[pacmanPosition.y][pacmanPosition.x] = 'empty';
            score += 10;
            document.getElementById('score').textContent = score;
            
            // Remove the dot visually
            const cell = document.getElementById('game-board').children[pacmanPosition.y * GRID_SIZE + pacmanPosition.x];
            cell.classList.remove('dot');
            
            // Check if all dots are collected
            dotsRemaining--;
            if (dotsRemaining === 0) {
                isGameOver = true;
                alert('Congratulations! You won!');
            }
        }
        
        updateGameBoard();
        checkCollision();
    }
});

// Get available directions for movement
function getAvailableDirections(position) {
    const directions = [
        { dx: 0, dy: -1 }, // up
        { dx: 1, dy: 0 },  // right
        { dx: 0, dy: 1 },  // down
        { dx: -1, dy: 0 }  // left
    ];

    return directions.filter(dir => {
        const newX = position.x + dir.dx;
        const newY = position.y + dir.dy;
        return gameBoard[newY][newX] !== 'wall';
    });
}

// Calculate distance between two points (using manhattan distance)
function getDistance(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

// Move the ghost towards Pac-Man
class PacMan {
    constructor() {
        this.position = { x: 14, y: 23 };
        this.direction = 'right';
        this.nextDirection = null;
        this.element = document.createElement('div');
        this.element.className = 'pacman right';
        document.getElementById('game-board').appendChild(this.element);
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.position.x * CELL_SIZE}px`;
        this.element.style.top = `${this.position.y * CELL_SIZE}px`;
    }

    move() {
        if (!this.nextDirection) return;

        const newPos = {
            x: this.position.x + DIRECTIONS[this.nextDirection].x,
            y: this.position.y + DIRECTIONS[this.nextDirection].y
        };

        if (!isWall(newPos)) {
            this.position = newPos;
            this.direction = this.nextDirection;
            this.element.className = `pacman ${this.direction.toLowerCase().replace('arrow', '')}`;
            this.updatePosition();
            checkDotCollision(this.position);
        }
    }

    setDirection(direction) {
        this.nextDirection = direction;
    }
}

function moveGhost() {
    const availableDirections = getAvailableDirections(ghostPosition);
    
    if (availableDirections.length === 0) return;

    // Don't allow the ghost to reverse direction unless it's the only option
    if (availableDirections.length > 1) {
        const lastMove = {
            dx: ghostPosition.lastX ? ghostPosition.x - ghostPosition.lastX : 0,
            dy: ghostPosition.lastY ? ghostPosition.y - ghostPosition.lastY : 0
        };

        const filteredDirections = availableDirections.filter(dir => 
            !(dir.dx === -lastMove.dx && dir.dy === -lastMove.dy)
        );

        if (filteredDirections.length > 0) {
            availableDirections.length = 0;
            availableDirections.push(...filteredDirections);
        }
    }

    // Find the direction that gets us closest to Pac-Man
    let bestDirection = availableDirections[0];
    let shortestDistance = Infinity;

    availableDirections.forEach(dir => {
        const newX = ghostPosition.x + dir.dx;
        const newY = ghostPosition.y + dir.dy;
        const distance = getDistance({ x: newX, y: newY }, pacmanPosition);

        // Add some randomness to make movement less predictable
        const randomFactor = Math.random() * 2 - 1; // Random value between -1 and 1
        const adjustedDistance = distance + randomFactor;

        if (adjustedDistance < shortestDistance) {
            shortestDistance = adjustedDistance;
            bestDirection = dir;
        }
    });

    // Store current position before moving
    ghostPosition.lastX = ghostPosition.x;
    ghostPosition.lastY = ghostPosition.y;

    // Move in the best direction
    ghostPosition.x += bestDirection.dx;
    ghostPosition.y += bestDirection.dy;
}

// Check for collision between Pac-Man and ghost
function checkCollision() {
    if (pacmanPosition.x === ghostPosition.x && pacmanPosition.y === ghostPosition.y) {
        lives--;
        document.getElementById('lives').textContent = lives;
        
        if (lives <= 0) {
            isGameOver = true;
            clearInterval(ghostInterval);
            alert('Game Over!');
        } else {
            // Reset positions
            pacmanPosition = { x: 1, y: 1 };
            ghostPosition = { x: 18, y: 18 };
            updateGameBoard();
        }
    }
}

let ghostInterval;

// Start autonomous ghost movement
function startGhostMovement() {
    // Clear any existing interval
    if (ghostInterval) {
        clearInterval(ghostInterval);
    }
    
    // Create new interval
    ghostInterval = setInterval(() => {
        if (!isGameOver) {
            moveGhost();
            updateGameBoard();
            checkCollision();
        } else {
            clearInterval(ghostInterval);
        }
    }, 250); // Ghost moves every 250ms (4 times per second)
}

function checkDotCollision(position) {
    const cell = gameBoard[position.y][position.x];
    if (cell === 'dot') {
        gameBoard[position.y][position.x] = 'empty';
        const dotElement = document.getElementById('game-board').children[position.y * GRID_WIDTH + position.x];
        dotElement.classList.remove('dot');
        score += 10;
        document.getElementById('score').textContent = score;
        dotsRemaining--;
        
        if (dotsRemaining === 0) {
            gameWin();
        }
    }
}

function isWall(position) {
    return gameBoard[position.y][position.x] === 'wall';
}

function gameWin() {
    isGameOver = true;
    document.getElementById('status').textContent = 'YOU WIN!';
    const highScore = Math.max(parseInt(document.getElementById('highScore').textContent), score);
    document.getElementById('highScore').textContent = highScore;
}

function gameOver() {
    isGameOver = true;
    document.getElementById('status').textContent = 'GAME OVER';
    const highScore = Math.max(parseInt(document.getElementById('highScore').textContent), score);
    document.getElementById('highScore').textContent = highScore;
}

// Game loop
function gameLoop() {
    if (!isGameOver) {
        pacman.move();
        requestAnimationFrame(gameLoop);
    }
}

// Initialize the game
let pacman;
let score = 0;
let isGameOver = false;

// Start the game
window.onload = () => {
    initializeBoard();
    pacman = new PacMan();
    startGhostMovement();
    
    // Event listener for keyboard controls
    document.addEventListener('keydown', (event) => {
        if (DIRECTIONS[event.key]) {
            pacman.setDirection(event.key);
        }
    });
    
    // Start the game loop
    gameLoop();
};