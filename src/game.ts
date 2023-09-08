import { Level1 } from "./Level/Level1";
import Entity from "./Entity/Entity";

export default class Game {
  level = new Level1(this.gameWidth, this.gameHeight);
  entities: Entity[] = [];
  keys = new Set<"leftClick">();

  constructor(
    readonly gameWidth: number,
    readonly gameHeight: number,
    readonly mainCtx: CanvasRenderingContext2D,
    readonly shadowCtx: CanvasRenderingContext2D,
    readonly sightCtx: CanvasRenderingContext2D,
    public mousePos = { x: gameWidth / 2, y: gameHeight / 2 }
  ) {
    (
      document.querySelector("#gameScreen") as HTMLCanvasElement
    ).addEventListener("click", (e) => {
      this.keys.add("leftClick");
    });
    (
      document.querySelector("#gameScreen") as HTMLCanvasElement
    ).addEventListener("mousemove", (e) => {
      this.mousePos = {
        x: e.offsetX,
        y: e.offsetY,
      };
    });

    this.start();
  }

  start() {
    this.level.buildLevel(this.gameWidth, this.gameHeight);
  }

  update(dt: number) {
    this.level.update(dt, this);
  }

  draw(
    mainCtx: CanvasRenderingContext2D,
    shadowCtx: CanvasRenderingContext2D,
    sightCtx: CanvasRenderingContext2D
  ) {
    this.level.draw(mainCtx, shadowCtx, sightCtx);
  }
}
