import Game from "../game";
import { System } from "./System";
import { Level } from "../Level/Level";
import Entity from "../Entity/Entity";
import Player from "../Entity/Player";

export default class SightSystem extends System {
  startPos: { x: number; y: number } | null = null;
  aimPos: { x: number; y: number } | null = null;

  constructor(readonly gameWidth: number, readonly gameHeight: number) {
    super();
  }

  appliesTo(entity: Entity) {
    return entity instanceof Player;
  }

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    const player = entities.find((entity) => entity instanceof Player);

    if (!(player instanceof Player)) return;

    this.startPos = {
      x:
        player.position.x +
        (player.size.width / 2) *
          Math.cos(this.getDegrees(player.position, game.mousePos)),
      y:
        player.position.y +
        (player.size.height / 2) *
          Math.sin(this.getDegrees(player.position, game.mousePos)),
    };

    this.aimPos = game.mousePos;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.aimPos || !this.startPos) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

    ctx.save();

    ctx.translate(this.startPos.x, this.startPos.y);
    ctx.rotate(this.getDegrees(this.startPos, this.aimPos) + Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      -Math.max(this.gameWidth, this.gameHeight),
      -Math.max(this.gameWidth, this.gameHeight)
    );
    ctx.lineTo(
      Math.max(this.gameWidth, this.gameHeight),
      -Math.max(this.gameWidth, this.gameHeight)
    );
    ctx.clip();

    // draw background
    const lingrad = ctx.createLinearGradient(0, -800, 0, 0);
    lingrad.addColorStop(0, "rgba(0,0,0,1)");
    lingrad.addColorStop(0.1, "rgba(0,0,0,0.9)");
    lingrad.addColorStop(0.2, "rgba(0,0,0,0.8)");
    lingrad.addColorStop(0.3, "rgba(0,0,0,0.7)");
    lingrad.addColorStop(0.4, "rgba(0,0,0,0.6)");
    lingrad.addColorStop(0.5, "rgba(0,0,0,0.5)");
    lingrad.addColorStop(0.6, "rgba(0,0,0,0.4)");
    lingrad.addColorStop(0.7, "rgba(0,0,0,0.3)");
    lingrad.addColorStop(0.8, "rgba(0,0,0,0.2)");
    lingrad.addColorStop(0.9, "rgba(0,0,0,0.1)");
    lingrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = lingrad;
    ctx.fill();

    ctx.restore();

    // // Hacky
    // ctx.save();
    // ctx.translate(this.startPos.x, this.startPos.y);
    // ctx.rotate(this.getDegrees(this.startPos, this.aimPos) + Math.PI / 2);
    // ctx.beginPath();
    // ctx.arc(0, 25, 25, 0, Math.PI * 2);
    // ctx.clip();
    // ctx.globalCompositeOperation = "source-in";
    // ctx.fillStyle = "transparent";
    // ctx.fill();
    // ctx.restore();
  }

  getDegrees(
    startPos: { x: number; y: number },
    mousePos: { x: number; y: number }
  ) {
    if (mousePos.y > startPos.y) {
      if (mousePos.x > startPos.x) {
        const angle = Math.atan(
          Math.abs(mousePos.y - startPos.y) / Math.abs(mousePos.x - startPos.x)
        );

        return angle;
      } else {
        const angle =
          Math.atan(
            Math.abs(mousePos.x - startPos.x) /
              Math.abs(mousePos.y - startPos.y)
          ) +
          Math.PI / 2;

        return angle;
      }
    } else {
      if (mousePos.x > startPos.x) {
        const angle = -Math.atan(
          Math.abs(mousePos.y - startPos.y) / Math.abs(mousePos.x - startPos.x)
        );

        return angle;
      } else {
        const angle =
          -Math.atan(
            Math.abs(mousePos.x - startPos.x) /
              Math.abs(mousePos.y - startPos.y)
          ) -
          Math.PI / 2;

        return angle;
      }
    }
  }
}
