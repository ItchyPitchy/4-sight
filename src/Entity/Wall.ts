import CellEntity from "./Cell";

export default class Wall extends CellEntity {
  constructor(
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) {
    super(position, size);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
}
