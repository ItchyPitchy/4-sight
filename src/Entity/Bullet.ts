import Entity from "./Entity";

export default class Bullet extends Entity {
  lifeLength = 5; // seconds

  constructor(
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) {
    super(position, size);
  }

  draw(ctx: CanvasRenderingContext2D) {
    // draw intersection dot
    ctx.fillStyle = "red";
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
