export class InputHandler {
  allowedKeys = new Set(['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'])

  constructor() {
    this.key = null
    window.addEventListener('keydown', (e) => {
      if (this.allowedKeys.has(e.key)) {
        this.key = e.key
      }
    })
    // window.addEventListener('keyup', (e) => {
    //   if (this.allowedKeys.has(e.key)) {
    //     this.key = null
    //   }
    // })
  }
}
