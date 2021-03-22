class Snake {
    constructor(head) {
        this.snakeBody = [];
        this.direction = null;
        this._addHead(head);
    }

    _addHead(head) {
        this.snakeBody.push(head);
    }

    getSnakeHead() {
        return this.snakeBody[0];
    }

    drawSnake(ctx, cellSize) {
        for (let i = 0; i < this.snakeBody.length; i++) {
            ctx.fillStyle = "#76d7f5";
            ctx.fillRect(this.snakeBody[i].x, this.snakeBody[i].y, cellSize, cellSize);
        }
    }

    updateSnake(cellSize) {
        const head = this.getSnakeHead();
        for (let i = this.snakeBody.length - 2; i >= 0; i--) {
            this.snakeBody[i + 1] = { ...this.snakeBody[i] }
        }
        if (this.direction == "LEFT") head.x -= cellSize;
        if (this.direction == "UP") head.y -= cellSize;
        if (this.direction == "RIGHT") head.x += cellSize;
        if (this.direction == "DOWN") head.y += cellSize;

    }

    growSnake() {
        this.snakeBody.push(
            {
                ...this.snakeBody[this.snakeBody.length - 1]
            }
        );
    }

    equalPositions(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y
    }

    isCollidingWith(position, { ignoreHead = false } = {}) {
        return this.snakeBody.some((segment, index) => {
            if (ignoreHead && index === 0) return false;
            return this.equalPositions(segment, position);
        });
    }

    snakeHitItself() {
        return this.isCollidingWith(
            this.getSnakeHead(),
            { ignoreHead: true }
        )
    }
}

export default Snake;