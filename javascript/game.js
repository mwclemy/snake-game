import Snake from './snake.js';
import Food from './food.js';

const cvs = document.querySelector("canvas");
const cvsHeight = getComputedStyle(cvs).height
const cvsWidth = getComputedStyle(cvs).width

cvs.setAttribute('height', cvsHeight)
cvs.setAttribute('width', cvsWidth)

const ctx = cvs.getContext("2d");

// smallest unit of the game board(grid)
export const canvasBox = 32;

// game board
const ground = new Image();
ground.src = "assets/images/ground.png";

// snake
const snake = new Snake();

// food
const foodImg = new Image();
foodImg.src = "assets/images/food.png";
const food = new Food(Math.floor(Math.random() * 17 + 1) * canvasBox, Math.floor(Math.random() * 15 + 3) * canvasBox, foodImg);

let prevArrowKeyDirection = "";

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

// draw everything to the canvas
const draw = () => {
    ctx.drawImage(ground, 0, 0);
    snake.drawSnake(ctx);
    food.drawFood(ctx);
}

// control snake direction
const direction = event => {
    let key = event.key;
    if (key == "ArrowLeft" && prevArrowKeyDirection != "RIGHT") {
        prevArrowKeyDirection = "LEFT";
        leftAudio.play();
        snake.head.x -= canvasBox;
    } else if (key == 'ArrowUp' && prevArrowKeyDirection != "DOWN") {
        prevArrowKeyDirection = "UP";
        upAudio.play();
        snake.head.y -= canvasBox;
    } else if (key == 'ArrowRight' && prevArrowKeyDirection != "LEFT") {
        prevArrowKeyDirection = "RIGHT";
        rightAudio.play();
        snake.head.x += canvasBox;
    } else if (key == 'ArrowDown' && prevArrowKeyDirection != "UP") {
        prevArrowKeyDirection = "DOWN";
        downAudio.play();
        snake.head.y += canvasBox;
    }
}

// call draw function every 100 ms
let intervalId = setInterval(draw, 100);

// event listeners
document.addEventListener("keydown", direction);