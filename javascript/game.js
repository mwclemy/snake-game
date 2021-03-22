import Snake from './snake.js';
import Food from './food.js';

const cvs = document.querySelector("canvas");
const cvsHeight = getComputedStyle(cvs).height
const cvsWidth = getComputedStyle(cvs).width

cvs.setAttribute('height', cvsHeight)
cvs.setAttribute('width', cvsWidth)

const ctx = cvs.getContext("2d");

// canvas cell size
const CELL_SIZE = 32;

const PLAYGROUND_WIDTH_CELLS = 17;
const PLAYGROUND_HEIGHT_CELLS = 15;

// game board
const ground = new Image();
ground.src = "assets/images/ground.png";

// snake
const snake = new Snake({ x: 2 * CELL_SIZE, y: 10 * CELL_SIZE });

// food
const foodImg = new Image();
foodImg.src = "assets/images/food.png";
const food = new Food({ x: 12 * CELL_SIZE, y: 10 * CELL_SIZE }, foodImg);

// load audio files
let deadAudio = new Audio();
let eatAudio = new Audio();
let upAudio = new Audio();
let rightAudio = new Audio();
let leftAudio = new Audio();
let downAudio = new Audio();

deadAudio.src = "assets/audio/audio_dead.mp3";
eatAudio.src = "assets/audio/audio_eat.mp3";
upAudio.src = "assets/audio/audio_up.mp3";
rightAudio.src = "assets/audio/audio_right.mp3";
leftAudio.src = "assets/audio/audio_left.mp3";
downAudio.src = "assets/audio/audio_down.mp3";

// keep track of game score
let score = 0;

// keep track of status
let gameOver = false;

// main function that gets called every 100ms
const main = () => {
    if (gameOver) {
        clearInterval(intervalId);
        deadAudio.play();
        if (confirm('You lost. Press ok to restart.')) {
            window.location = '/'
        }
        return
    }

    draw();
    snake.updateSnake(CELL_SIZE);
    checkDeath();
    checkCollision();
}

// draw everything to the canvas
const draw = () => {
    ctx.drawImage(ground, 0, 0);
    snake.drawSnake(ctx, CELL_SIZE);
    food.drawFood(ctx);
    drawScoreText();
}

// draw the score text
const drawScoreText = () => {
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * CELL_SIZE, 1.6 * CELL_SIZE);
}

// check snake and food collision
const checkCollision = () => {
    if (snake.isCollidingWith(food.foodPosition)) {
        eatAudio.play();
        // upddate food position
        food.updateFood(getRandomFoodPosition());
        // grow the snake
        snake.growSnake();
        // increase the score
        score++;
    }
}

// check to see if the snake has gone outside the play ground.
const outsidePlayGround = position => {
    return (
        position.x < CELL_SIZE || position.x > PLAYGROUND_WIDTH_CELLS * CELL_SIZE ||
        position.y < CELL_SIZE * 3 || position.y > (PLAYGROUND_HEIGHT_CELLS + 2) * CELL_SIZE
    )
}

const checkDeath = () => {
    gameOver = outsidePlayGround(snake.getSnakeHead()) || snake.snakeHitItself();
}

// get random food 
const getRandomFoodPosition = () => {
    let newFoodPosition;
    while (newFoodPosition == null || snake.isCollidingWith(newFoodPosition)) {
        newFoodPosition = randomCanvasPosition()
    }
    return newFoodPosition
}

// control snake direction
const direction = event => {
    const key = event.key;
    const snakeHead = snake.getSnakeHead();
    if (key == "ArrowLeft" && snake.direction != "RIGHT") {
        snake.direction = "LEFT";
        leftAudio.play();
    } else if (key == 'ArrowUp' && snake.direction != "DOWN") {
        snake.direction = "UP";
        upAudio.play();
    } else if (key == 'ArrowRight' && snake.direction != "LEFT") {
        snake.direction = "RIGHT";
        rightAudio.play();
        snakeHead.x += CELL_SIZE;
    } else if (key == 'ArrowDown' && snake.direction != "UP") {
        snake.direction = "DOWN";
        downAudio.play();
    }
}

// get a random canvas position
const randomCanvasPosition = () => {
    return {
        x: Math.floor(Math.random() * PLAYGROUND_WIDTH_CELLS + 1) * CELL_SIZE,
        y: Math.floor(Math.random() * PLAYGROUND_HEIGHT_CELLS + 3) * CELL_SIZE
    }
}

// call main function every 100 ms
let intervalId = setInterval(main, 100);

// event listeners
document.addEventListener("keydown", direction);