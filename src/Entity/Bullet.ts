import Entity from "./Entity";

export default class Bullet extends Entity {
  lifeLength = 5; // seconds

  constructor(position: { x: number; y: number }, public radius: number) {
    super(position, { width: radius * 2, height: radius * 2 });
  }

  draw(ctx: CanvasRenderingContext2D) {
    // draw intersection dot
    ctx.save();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }
}
