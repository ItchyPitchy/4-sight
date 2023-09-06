import Game from "../game";
import { System } from "./System";
import Flashlight from "../Component/Flashlight";
import Entity from "../Entity/Entity";
import { Level } from "../Level/Level";

type FlashlightEntity = {
  position: {
    x: number;
    y: number;
  };
  radius: number;
  size: {
    width: number;
    height: number;
  };
};

export default class FlashlightSystem extends System {
  flashlights: FlashlightEntity[] = [];

  constructor() {
    super();
  }

  appliesTo(entity: Entity) {
    return entity.hasComponent(Flashlight);
  }

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    this.flashlights = entities.map((entity) => {
      const flashlight = entity.getComponent(Flashlight) as Flashlight;

      return {
        position: entity.position,
        radius: flashlight.radius,
        size: {
          width: game.gameWidth,
          height: game.gameHeight,
        },
      };
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    for (const flashlight of this.flashlights) {
      // ctx.fillRect(0, 0, flashlight.size.width, flashlight.size.height);
      // // ctx.translate(75, 75);
      // // Create a circular clipping path
      // ctx.beginPath();
      // ctx.arc(
      //   flashlight.position.x,
      //   flashlight.position.y,
      //   flashlight.radius,
      //   0,
      //   Math.PI * 2
      // );
      // ctx.clip();
      // // draw background
      // const lingrad = ctx.createLinearGradient(0, 0, 0, 0);
      // lingrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      // lingrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      // ctx.fillStyle = lingrad;
      // ctx.fillRect(
      //   flashlight.position.x - flashlight.radius,
      //   flashlight.position.y - flashlight.radius,
      //   flashlight.radius * 2,
      //   flashlight.radius * 2
      // );
      // console.log(flashlight.position);
      // //  draw stars
      // // for (let j = 1; j < 50; j++) {
      // //   ctx.save();
      // //   ctx.fillStyle = "#fff";
      // //   ctx.translate(
      // //     75 - Math.floor(Math.random() * 150),
      // //     75 - Math.floor(Math.random() * 150)
      // //   );
      // //   this.drawStar(ctx, Math.floor(Math.random() * 4) + 2);
      // //   ctx.restore();
      // // }
    }
  }

  drawStar(ctx: CanvasRenderingContext2D, r: number) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);
    for (let i = 0; i < 9; i++) {
      ctx.rotate(Math.PI / 5);
      if (i % 2 === 0) {
        ctx.lineTo((r / 0.525731) * 0.200811, 0);
      } else {
        ctx.lineTo(r, 0);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
