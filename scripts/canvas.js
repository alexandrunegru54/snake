import Config from "./config.js";

export default class Canvas {
  constructor(container) {
    this.config = new Config();

    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");

    this.element.width = this.config.pointsX * this.config.sizeCell;
    this.element.height = this.config.pointsY * this.config.sizeCell;

    container.appendChild(this.element);
  }
}
