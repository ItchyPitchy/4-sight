import Game from "../game";
import { Level } from "../Level/Level";
import Entity from "../Entity/Entity";

export class System {
  appliesTo(entity: Entity) {
    return false;
  }

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    throw new Error("not implemented");
  }

  draw(ctx: CanvasRenderingContext2D) {}
}
