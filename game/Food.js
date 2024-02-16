export class Food {
  constructor(game) {
    [this.x, this.y] = randomCell(game.cols, game.rows, game.size)
    this.size = game.size
  }

  draw(context) {
    context.fillStyle = 'rgb(255, 0, 100)';
    context.strokeStyle = 'black'
    context.fillRect(this.x, this.y, this.size, this.size);
    context.strokeRect(this.x, this.y, this.size, this.size);
  }
}

function randomCell(cols, rows, size) {
  // TODO: fix intervals
  return [getRandomInt(1, cols - 1) * size, getRandomInt(1, rows - 1) * size]
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
