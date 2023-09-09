import Entity from "./Entity";

export default class Player extends Entity {
  degrees: number = 0;

  constructor(
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) {
    super(position, size);
  }

  draw(ctx: CanvasRenderingContext2D): void {}
}
