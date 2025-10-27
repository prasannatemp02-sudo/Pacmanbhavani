// Game constants
const GRID_SIZE = 20;
const GAME_SPEED = 80; // milliseconds per move

// Game state
let pacman = {
    x: 14,
    y: 23,
    direction: 'right',
    nextDirection: null
};

let ghost = {
    x: 14,
    y: 14,
    direction: 'left',
    prevCell: 'empty'
};

let score = 0;
let lives = 3;
let gameBoard = [];
let isGameOver = false;
let dotsRemaining = 0;
let gameLoop;
const DIRECTIONS = {
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 }
};

// Game state
let gameBoard = [];
let score = 0;
let lives = 3;
let isGameOver = false;
let dotsRemaining = 0;
let pacman;

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

        // Handle tunnel wrapping
        if (newPos.x < 0) newPos.x = GRID_WIDTH - 1;
        if (newPos.x >= GRID_WIDTH) newPos.x = 0;
        if (newPos.y < 0) newPos.y = GRID_HEIGHT - 1;
        if (newPos.y >= GRID_HEIGHT) newPos.y = 0;

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

// Initialize the game board
function initializeBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    dotsRemaining = 0;
    
    // Create the maze layout
    for (let y = 0; y < GRID_HEIGHT; y++) {
        gameBoard[y] = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            const cell = document.createElement('div');
            
            if (isWallPosition(x, y)) {
                cell.classList.add('wall');
                gameBoard[y][x] = 'wall';
            } else {
                cell.classList.add('dot');
                gameBoard[y][x] = 'dot';
                dotsRemaining++;
            }
            
            board.appendChild(cell);
        }
    }

    // Clear the ghost house area
    const ghostHouse = [
        { x: 13, y: 14 }, { x: 14, y: 14 }, { x: 15, y: 14 },
        { x: 13, y: 15 }, { x: 14, y: 15 }, { x: 15, y: 15 }
    ];

    ghostHouse.forEach(pos => {
        const index = pos.y * GRID_WIDTH + pos.x;
        const cell = board.children[index];
        cell.classList.remove('dot');
        gameBoard[pos.y][pos.x] = 'empty';
        dotsRemaining--;
    });
}

function isWallPosition(x, y) {
    // Outer walls
    if (x === 0 || x === GRID_WIDTH - 1 || y === 0 || y === GRID_HEIGHT - 1) return true;
    
    // Ghost house
    if (x >= 11 && x <= 16 && y >= 13 && y <= 15) {
        return (y === 13 || (y === 15 && (x === 11 || x === 16)));
    }
    
    // Internal walls pattern
    if (x % 2 === 0 && y % 2 === 0) {
        // Exclude certain positions for pathways
        return !((x === 14 && y === 14) || (x === 14 && y === 26));
    }
    
    return false;
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
    const x = position.x < 0 ? GRID_WIDTH - 1 : (position.x >= GRID_WIDTH ? 0 : position.x);
    const y = position.y < 0 ? GRID_HEIGHT - 1 : (position.y >= GRID_HEIGHT ? 0 : position.y);
    return gameBoard[y][x] === 'wall';
}

function gameWin() {
    isGameOver = true;
    document.getElementById('status').textContent = 'YOU WIN!';
    const highScore = Math.max(parseInt(document.getElementById('highScore').textContent) || 0, score);
    document.getElementById('highScore').textContent = highScore;
}

function gameOver() {
    isGameOver = true;
    document.getElementById('status').textContent = 'GAME OVER';
    const highScore = Math.max(parseInt(document.getElementById('highScore').textContent) || 0, score);
    document.getElementById('highScore').textContent = highScore;
}

// Game loop
function gameLoop() {
    if (!isGameOver) {
        pacman.move();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
window.onload = () => {
    // Initialize game state
    score = 0;
    lives = 3;
    isGameOver = false;
    document.getElementById('score').textContent = '0';
    document.getElementById('highScore').textContent = '0';
    
    // Set up the game
    initializeBoard();
    pacman = new PacMan();
    
    // Event listener for keyboard controls
    document.addEventListener('keydown', (event) => {
        if (DIRECTIONS[event.key]) {
            event.preventDefault(); // Prevent page scrolling
            pacman.setDirection(event.key);
        }
    });
    
    // Start the game loop
    requestAnimationFrame(gameLoop);
};