import { InputHandler } from "./InputHandler.js";
import { Snake } from './Snake.js'
import { Food } from './Food.js'

window.addEventListener('load', () => {
  const width = 600
  const height = 600

  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  class Game {
    size = 20

    constructor({ width, height, speed = 1 }) {
      Object.assign(this, { width, height, speed })

      this.cols = Math.floor(this.width / this.size)
      this.rows = Math.floor(this.height / this.size)

      this.snake = new Snake(this, { size: 20 })
      this.input = new InputHandler()
      this.food = new Food(this)
    }

    update() {
      this.snake.update(this.input.key)
    }

    draw(context) {
      this.snake.draw(context)

      if (this.snake.eat(this.food)) {
        document.querySelector(".score").innerHTML = Number(document.querySelector(".score").innerHTML) + 100;
        this.food = new Food(game)
      }
      this.food.draw(context)
    }
  }

  const game = new Game({ width, height })

  let fps = 12
  let now
  let then = Date.now()
  let interval = 1000/fps
  let delta

  function animate() {
    requestAnimationFrame(animate)

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      game.update()
      // update time stuffs

      // Just `then = now` is not enough.
      // Lets say we set fps at 10 which means
      // each frame must take 100ms
      // Now frame executes in 16ms (60fps) so
      // the loop iterates 7 times (16*7 = 112ms) until
      // delta > interval === true
      // Eventually this lowers down the FPS as
      // 112*10 = 1120ms (NOT 1000ms).
      // So we have to get rid of that extra 12ms
      // by subtracting delta (112) % interval (100).
      // Hope that makes sense.

      then = now - (delta % interval);

      ctx.fillStyle = 'rgb(51, 51, 51)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      game.draw(ctx)
    }
  }
  animate()
})
