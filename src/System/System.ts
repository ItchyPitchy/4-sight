import Entity from "../Entity/Entity";
import Game from "../game";

export class System {
  appliesTo(entity: Entity) {
    return false;
  }

  update(entities: Entity[], dt: number, game: Game) {
    throw new Error("not implemented");
  }

  draw(ctx: CanvasRenderingContext2D) {}
}
