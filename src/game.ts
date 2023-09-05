import { Level1 } from "./Level/Level1";
import Entity from "./Entity/Entity";

export default class Game {
  level = new Level1();
  entities: Entity[] = [];

  constructor(
    readonly gameWidth: number,
    readonly gameHeight: number,
    readonly ctx: CanvasRenderingContext2D
  ) {
    this.start();
  }

  start() {
    this.level.buildLevel(this.gameWidth, this.gameHeight);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.level.draw(ctx);
  }

  update(dt: number) {
    this.level.update(dt, this);
  }
}
