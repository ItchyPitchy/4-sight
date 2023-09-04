import Entity from "./Entity/Entity";
import { Level1 } from "./Level/Level1";
import { System } from "./System/System";

export default class Game {
  level = new Level1();
  systems: System[] = [];
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

    for (const system of this.systems) {
      system.draw(ctx);
    }
  }

  update(dt: number) {
    this.level.update(dt, this);

    for (const system of this.systems) {
      const filteredEntities = this.entities.filter(system.appliesTo);
      system.update(filteredEntities, dt, this);
    }
  }
}
