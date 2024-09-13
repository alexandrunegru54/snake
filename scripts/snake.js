import Config from "./config.js";

export default class Snake {
  constructor() {
    this.config = new Config();
    this.x = 160;
    this.y = 160;
    this.dx = this.config.sizeCell;
    this.dy = 0;
    this.tails = [];
    this.maxTails = 3;

    this.direction = "right"; //direction to move ['right','left','up','down']
    this.control();
  }

  update(berry, score, canvas) {
    this.x += this.dx;
    this.y += this.dy;

    // this.collisionBorder();
    if (this.x < 0) {
      this.x = canvas.element.width - this.config.sizeCell;
    } else if (this.x >= canvas.element.width) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = canvas.element.height - this.config.sizeCell;
    } else if (this.y >= canvas.element.height) {
      this.y = 0;
    }

    // todo бордер

    if (this.tails.length > this.maxTails) {
      this.tails.pop();
    }

    if (this.x === berry.x && this.y === berry.y) {
      this.maxTails++;
      score.incScore();
      berry.randomPositionBerry();
    }

    this.tails.forEach((el, index) => {
      if (this.x == el.x && this.y == el.y) {
        this.death();
        score.setToZero();
        berry.randomPositionBerry();
        return;
      }
    });
    this.tails.unshift({ x: this.x, y: this.y });
  }

  draw(context) {
    this.tails.forEach((el, index) => {
      if (index == 0) {
        context.fillStyle = "#FA0556";
      } else {
        context.fillStyle = "#A00034";
      }
      context.fillRect(el.x, el.y, this.config.sizeCell, this.config.sizeCell);
    });
  }

  death() {
    this.x = 160;
    this.y = 160;
    this.dx = this.config.sizeCell;
    this.dy = 0;
    this.tails = [];
    this.maxTails = 3;
  }

  control() {
    document.addEventListener("keydown", (e) => {
      if (this.config.step != 0) return;

      if (
        (e.code == "KeyW" || e.code == "ArrowUp") &&
        this.direction != "down"
      ) {
        this.dy = -this.config.sizeCell;
        this.dx = 0;
        this.direction = "up";
      } else if (
        (e.code == "KeyA" || e.code == "ArrowLeft") &&
        this.direction != "right"
      ) {
        this.dx = -this.config.sizeCell;
        this.dy = 0;
        this.direction = "left";
      } else if (
        (e.code == "KeyS" || e.code == "ArrowDown") &&
        this.direction != "up"
      ) {
        this.dy = this.config.sizeCell;
        this.dx = 0;
        this.direction = "down";
      } else if (
        (e.code == "KeyD" || e.code == "ArrowRight") &&
        this.direction != "left"
      ) {
        this.dx = this.config.sizeCell;
        this.dy = 0;
        this.direction = "right";
      }
    });
  }
}
