import Entity from "./Entity";

export class Player1 extends Entity {
  constructor(
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) {
    super(position, size);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#543";
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.size.width / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}
