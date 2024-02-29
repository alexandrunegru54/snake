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

// const canvas = document.getElementById("thisBoard");
// const context = canvas.getContext("2d");

// const CANVAS_SIZE = 75; // value in vmin

// let CELLS = 15;

// let BOX_SIZE = canvas.height / CELLS;

// let SCORE = 0;

// let food = {
//   x: Math.floor(Math.random() * CELLS + 2) * BOX_SIZE,
//   y: Math.floor(Math.random() * CELLS + 2) * BOX_SIZE,
// };

// console.log(food);
// const apple = new Image();
// apple.src = "img/apple.png";

// // food.width = BOX_SIZE;

// function drawGame() {
//   setCellSize();

//   const size = 700;
//   canvas.height = size;
//   canvas.width = size;

//   food = {
//     x: Math.floor(Math.random() * CELLS + 2) * BOX_SIZE,
//     y: Math.floor(Math.random() * CELLS + 2) * BOX_SIZE,
//   };

//   context.drawImage(apple, food.x, food.y, BOX_SIZE, BOX_SIZE);
// }

// function setCellSize() {
//   // console.log(canvas.height / CELLS);
//   BOX_SIZE = canvas.height / CELLS - (CELLS - 2);
// }

// drawGame();

// let game = setInterval(drawGame, 100);

// // context.beginPath();
// // context.lineWidth = 2;
// // context.lineStyle = "white";

// // for (let x = 0; x < size; x += size / BOX_SIZE) {
// // 	context.moveTo(x, 0);
// // 	context.lineTo(x, size);
// // }
// // for (let y = 0; y < size; y += size / BOX_SIZE) {
// // 	context.moveTo(0, y);
// // 	context.lineTo(size, y);
// // }
// // context.stroke();

// // document.body.appendChild(canvas);

// // UTILS FUNCTIONS

// function vminToPx(vminValue) {
//   // Get the viewport width and height
//   const vw = Math.max(
//     document.documentElement.clientWidth || 0,
//     window.innerWidth || 0
//   );
//   const vh = Math.max(
//     document.documentElement.clientHeight || 0,
//     window.innerHeight || 0
//   );

//   // Calculate the smallest dimension of the viewport (vmin)
//   const smallestDimension = Math.min(vw, vh);

//   // Convert vmin value to pixels
//   const pxValue = (smallestDimension * vminValue) / 100;

//   return pxValue;
// }
