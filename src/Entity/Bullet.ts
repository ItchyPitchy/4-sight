import Entity from "./Entity";

export default class Bullet extends Entity {
  lifeLength = 5; // seconds

  constructor(drawPosition: { x: number; y: number }) {
    super(drawPosition);
  }

  draw(ctx: CanvasRenderingContext2D) {
    // draw intersection dot
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.drawPosition.x, this.drawPosition.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}
