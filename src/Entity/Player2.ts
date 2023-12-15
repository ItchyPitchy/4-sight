import Player from "./Player";
import player2Img from "../assets/player2.png";

export default class Player2 extends Player {
  texture: HTMLImageElement | null = null;

  constructor(
    position: { x: number; y: number },
    size: { width: number; height: number },
    degrees: number,
    health: number
  ) {
    super(position, size, degrees, health);

    const texture = new Image();
    texture.src = player2Img;
    this.texture = texture;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    ctx.rotate(this.degrees);

    if (this.texture) {
      ctx.drawImage(
        this.texture,
        -this.size.width / 2,
        -this.size.height / 2,
        this.size.width,
        this.size.height
      );
    }

    ctx.restore();
  }
}
