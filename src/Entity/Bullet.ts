import Entity from "./Entity";

export default class Bullet extends Entity {
  lifeLength = 0.5; // seconds

  constructor(
    readonly startPos: { x: number; y: number },
    readonly endPos: { x: number; y: number }
  ) {
    super();
  }

  draw(ctx: CanvasRenderingContext2D) {
    // draw the line
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.startPos.x, this.startPos.y);
    ctx.lineTo(this.endPos.x, this.endPos.y);
    ctx.stroke();
  }
}
