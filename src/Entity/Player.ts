import Entity from "./Entity";

export default class Player extends Entity {
  constructor(
    position: { x: number; y: number },
    size: { width: number; height: number },
    public degrees: number,
    public health: number
  ) {
    super(position, size);
  }

  draw(ctx: CanvasRenderingContext2D): void {}
}
