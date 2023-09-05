import Component from "../Component/Component";
import Entity from "./Entity";

export default class Cell extends Entity {
  components: Component[] = [];

  constructor(
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) {
    super(position, size);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    ctx.stroke();
    ctx.closePath();
  }
}
