class Food {
    constructor(foodPosition, image) {
        this.foodPosition = foodPosition;
        this.image = image;
    }

    updateFood(newPosition) {
        this.foodPosition = newPosition;
    }
    drawFood(ctx) {
        ctx.drawImage(this.image, this.foodPosition.x, this.foodPosition.y);
    }

}
