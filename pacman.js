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

// Initialize the game board
function initializeBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    dotsRemaining = 0;
    
    // Create the maze layout
    for (let y = 0; y < 31; y++) {
        gameBoard[y] = [];
        for (let x = 0; x < 28; x++) {
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

    // Clear ghost house area
    for (let y = 14; y < 16; y++) {
        for (let x = 13; x < 16; x++) {
            const index = y * 28 + x;
            gameBoard[y][x] = 'empty';
            board.children[index].classList.remove('dot');
            dotsRemaining--;
        }
    }

    // Add Pac-Man
    updateGameObject(pacman, 'pacman');
    
    // Add Ghost
    updateGameObject(ghost, 'ghost');
}

function isWallPosition(x, y) {
    // Border walls
    if (x === 0 || x === 27 || y === 0 || y === 30) return true;
    
    // Ghost house
    if (x >= 13 && x <= 15 && y >= 13 && y <= 15) return false;
    
    // Internal maze pattern
    return (x % 2 === 0 && y % 2 === 0);
}

function updateGameObject(obj, className) {
    const board = document.getElementById('game-board');
    const cells = board.children;
    
    // Remove previous position
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove(className);
    }
    
    // Add new position
    const index = obj.y * 28 + obj.x;
    cells[index].classList.add(className);
    
    if (className === 'pacman') {
        cells[index].classList.remove('right', 'left', 'up', 'down');
        cells[index].classList.add(obj.direction);
    }
}

function movePacman() {
    const newPosition = getNextPosition(pacman);
    
    if (!isWall(newPosition.x, newPosition.y)) {
        pacman.x = newPosition.x;
        pacman.y = newPosition.y;
        
        // Handle tunnel wrapping
        if (pacman.x < 0) pacman.x = 27;
        if (pacman.x > 27) pacman.x = 0;
        
        // Update direction if next direction is valid
        if (pacman.nextDirection) {
            pacman.direction = pacman.nextDirection;
            pacman.nextDirection = null;
        }
        
        // Check for dot collision
        if (gameBoard[pacman.y][pacman.x] === 'dot') {
            gameBoard[pacman.y][pacman.x] = 'empty';
            const dotElement = document.getElementById('game-board').children[pacman.y * 28 + pacman.x];
            dotElement.classList.remove('dot');
            score += 10;
            document.getElementById('score').textContent = score;
            dotsRemaining--;
            
            if (dotsRemaining === 0) {
                gameWin();
            }
        }
        
        updateGameObject(pacman, 'pacman');
    }
}

function moveGhost() {
    const directions = ['up', 'right', 'down', 'left'];
    const validMoves = [];
    
    // Check all possible directions
    for (const dir of directions) {
        const newPos = getNextPositionInDirection(ghost, dir);
        if (!isWall(newPos.x, newPos.y)) {
            validMoves.push({ dir, x: newPos.x, y: newPos.y });
        }
    }
    
    if (validMoves.length > 0) {
        // Choose direction closest to Pac-Man
        let bestMove = validMoves[0];
        let shortestDistance = Infinity;
        
        validMoves.forEach(move => {
            const distance = Math.abs(move.x - pacman.x) + Math.abs(move.y - pacman.y);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                bestMove = move;
            }
        });
        
        ghost.x = bestMove.x;
        ghost.y = bestMove.y;
        ghost.direction = bestMove.dir;
        
        updateGameObject(ghost, 'ghost');
        
        // Check for collision with Pac-Man
        if (ghost.x === pacman.x && ghost.y === pacman.y) {
            handleCollision();
        }
    }
}

function getNextPosition(obj) {
    const direction = obj.nextDirection || obj.direction;
    return getNextPositionInDirection(obj, direction);
}

function getNextPositionInDirection(obj, direction) {
    const newPos = { x: obj.x, y: obj.y };
    switch (direction) {
        case 'left': newPos.x--; break;
        case 'right': newPos.x++; break;
        case 'up': newPos.y--; break;
        case 'down': newPos.y++; break;
    }
    return newPos;
}

function isWall(x, y) {
    // Handle tunnel wrapping
    if (x < 0) x = 27;
    if (x > 27) x = 0;
    if (y < 0 || y > 30) return true;
    
    return gameBoard[y][x] === 'wall';
}

function handleCollision() {
    lives--;
    document.getElementById('lives').textContent = lives;
    
    if (lives <= 0) {
        gameOver();
    } else {
        // Reset positions
        pacman.x = 14;
        pacman.y = 23;
        pacman.direction = 'right';
        pacman.nextDirection = null;
        
        ghost.x = 14;
        ghost.y = 14;
        ghost.direction = 'left';
        
        updateGameObject(pacman, 'pacman');
        updateGameObject(ghost, 'ghost');
    }
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    document.getElementById('status').textContent = 'GAME OVER';
}

function gameWin() {
    isGameOver = true;
    clearInterval(gameLoop);
    document.getElementById('status').textContent = 'YOU WIN!';
}

// Start the game
window.onload = () => {
    initializeBoard();
    
    // Event listener for keyboard controls
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                pacman.nextDirection = 'left';
                break;
            case 'ArrowRight':
                pacman.nextDirection = 'right';
                break;
            case 'ArrowUp':
                pacman.nextDirection = 'up';
                break;
            case 'ArrowDown':
                pacman.nextDirection = 'down';
                break;
        }
    });
    
    // Start game loop
    gameLoop = setInterval(() => {
        if (!isGameOver) {
            movePacman();
            moveGhost();
        }
    }, GAME_SPEED);
};