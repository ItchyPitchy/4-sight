import { Level1 } from "./Level/Level1";
import Entity from "./Entity/Entity";

export default class Game {
  level = new Level1();
  entities: Entity[] = [];

  constructor(
    readonly gameWidth: number,
    readonly gameHeight: number,
    readonly mainCtx: CanvasRenderingContext2D,
    readonly shadowCtx: CanvasRenderingContext2D
  ) {
    this.start();
  }

  start() {
    this.level.buildLevel(this.gameWidth, this.gameHeight);
  }

  update(dt: number) {
    this.level.update(dt, this);
  }

  draw(mainCtx: CanvasRenderingContext2D, shadowCtx: CanvasRenderingContext2D) {
    this.level.draw(mainCtx, shadowCtx);
  }
}
