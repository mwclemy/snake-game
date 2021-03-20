class Food {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }
    drawFood(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

export default Food