export class Snake {
  constructor(game, { x = 0, y = 0, color = 'white', size }) {
    Object.assign(this, { game, x, y, color, size })

    this.xspeed = 1
    this.yspeed = 0
    this.speed = 1
    this.total = 1
    this.tail = []
  }

  direction(xspeed, yspeed) {
    Object.assign(this, { xspeed, yspeed })
  }

  eat(food) {
    const d = dist(this.x, this.y, food.x, food.y)
    if (d < 1) {
      this.total++
      return true
    } else {
      return false
    }
  }

  update(key) {
    const keys = new Set([key])
    if (keys.has('ArrowUp')) {
      this.direction(0, -this.speed)
    } else if (keys.has('ArrowDown')) {
      this.direction(0, this.speed)
    } else if (keys.has('ArrowRight')) {
      this.direction(this.speed, 0)
    } else if (keys.has('ArrowLeft')) {
      this.direction(-this.speed, 0)
    }

    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1]
    }
    this.tail[this.total - 1] = [this.x, this.y]

    this.x = (this.game.width + this.x + this.xspeed * this.size) % this.game.width
    this.y = (this.game.height + this.y + this.yspeed * this.size) % this.game.height
  }

  draw(context) {
    context.strokeStyle = 'black'
    context.fillStyle = this.color
    for (let i = 0; i < this.total; i++) {
      context.fillRect(this.tail[i][0], this.tail[i][1], this.size, this.size)
      context.strokeRect(this.tail[i][0], this.tail[i][1], this.size, this.size)
    }

    context.fillRect(this.x, this.y, this.size, this.size)
    context.strokeRect(this.x, this.y, this.size, this.size)
  }
}

function dist(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.sqrt( a*a + b*b );
}
