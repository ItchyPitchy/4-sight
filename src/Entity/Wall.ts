import CellEntity from "./CellEntity";

export default class Wall extends CellEntity {
  constructor() {
    super();
  }

  draw(
    ctx: CanvasRenderingContext2D,
    cellPosition: { x: number; y: number },
    cellSize: number
  ): void {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fillRect(cellPosition.x, cellPosition.y, cellSize, cellSize);
    ctx.fill();
    ctx.closePath();
  }
}
