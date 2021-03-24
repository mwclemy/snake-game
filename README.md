# Snake Game
When I was a kid I liked to play the classical snake game in my Mom's phone and I thought it would be a good game to build as part of my [General Assembly](https://generalassemb.ly/) codig bootcamp unit 1 personal project.

In its simplest form, the player uses the arrow keys to move a "snake" around the board. As the snake finds food, it eats the food, and thereby grows larger. The game ends when the snake either moves off the screen or moves into itself. The goal is to make the snake as large as possible before that happens and as you do that, you score points.

## User Stories
- The game starts when the player presses any arrow key.
- When a player presses an arrow key, the snake is moved in the direction of the arrow key pressed.
- When the snake finds food, it eats the food, grows larger and the player scores points.
- When the snake moves off the screen, game ends.
- When the snake moves into itself, game ends.

## MVP
- Good looking game board build of off javascript canvas.
- Make snake object move in the direction of the arrow key when an arrow key is pressed.
- Randomly place a food object in (x,y) cordinates on canvas when the game start.
- Remove food object from the canvas and randomly generate a new one, in case of a collision between the snake and the food itself.
- Increase player's scores, in case of a collision between the snake and the food itself.
- Grow snake size, in case of a collision between the food object and the snake itself.
- Initialize the game, when the snake moves into itself.
- Initialize the game when the snake moves off the screen of the canvas.

## Stetch goals
- Add a reset button
- Ask the player to restart the game, before initializing everything when the game is lost.
- Keep track of the player's highest score

## Game Screenshots

1.  First screen
![First screen](assets/images/page1.png?raw=true)

2.  Game lost
![First screen](assets/images/page2.png?raw=true)



