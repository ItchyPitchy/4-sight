import CellEntity from "./CellEntity";

export class Player1 extends CellEntity {
  constructor() {
    super();
  }

  draw(
    ctx: CanvasRenderingContext2D,
    cellPosition: { x: number; y: number },
    cellSize: number
  ): void {
    ctx.beginPath();
    ctx.fillStyle = "#543";
    ctx.fillRect(cellPosition.x, cellPosition.y, cellSize, cellSize);
    ctx.fill();
    ctx.closePath();
  }
  // draw(ctx: CanvasRenderingContext2D) {
  //
  // }
}
