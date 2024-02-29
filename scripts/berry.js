import Config from "./config.js";
import { getRandomInt } from "./SupportFunctions.js";

export default class Berry {
  constructor(canvas) {
    this.x = 0;
    this.y = 0;
    this.canvas = canvas;

    this.config = new Config();
    this.randomPositionBerry();
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = "#A00034";
    context.arc(
      this.x + this.config.sizeCell / 2,
      this.y + this.config.sizeCell / 2,
      this.config.sizeBerry,
      0,
      2 * Math.PI
    );
    context.fill();
  }

  randomPositionBerry() {
    this.x = getRandomInt(0, this.config.pointsX) * this.config.sizeCell;
    this.y = getRandomInt(0, this.config.pointsY) * this.config.sizeCell;
  }
}
