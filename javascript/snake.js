import { canvasBox } from './game.js';

class Snake {
    constructor() {
        this.snakeBody = [{
            x: 9 * canvasBox,
            y: 10 * canvasBox
        }];
        this.newSegments = 0;
        this.head = this.snakeBody[0]
    }

    drawSnake(ctx) {
        for (let i = 0; i < this.snakeBody.length; i++) {
            ctx.fillStyle = (i == 0) ? "#76d7f5" : "white";
            ctx.fillRect(this.snakeBody[i].x, this.snakeBody[i].y, canvasBox, canvasBox);

            ctx.strokeStyle = "red";
            ctx.strokeRect(this.snakeBody[i].x, this.snakeBody[i].y, canvasBox, canvasBox);
        }
    }
}

export default Snake;