import Bullet from "./Bullet";
import plasmabullet from "../assets/plasmabullet.png";

export default class PlasmaBullet extends Bullet {
  texture: HTMLImageElement | null = null;

  constructor(position: { x: number; y: number }, radius: number) {
    super(position, radius);

    const texture = new Image();
    texture.src = plasmabullet;
    this.texture = texture;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    if (this.texture) {
      ctx.drawImage(
        this.texture,
        this.position.x - this.radius,
        this.position.y - this.radius,
        this.size.width,
        this.size.height
      );
    }

    ctx.restore();
  }
}
