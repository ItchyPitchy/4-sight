import { Hitbox } from "../Component/Hitbox.js";
import Entity from "../Entity/Entity.js";
import Game from "../game.js";
import { System } from "./System.js";

export class CollisionSystem extends System {
  constructor() {
    super();
  }

  appliesTo(entity: Entity) {
    return entity.hasComponent(Hitbox);
  }

  update(entities: Entity[], dt: number, game: Game) {
    for (const entity1 of entities) {
      for (const entity2 of entities) {
        if (entity1 === entity2) continue;

        // if (circleFunctions.circleIntersect(entity1, entity2)) {
        //   circleFunctions.resolveCollision(entity1, entity2, dt);

        //   for (const entity of [entity1, entity2]) {
        //     if (entity.hasComponent(Destroyable)) {
        //       entity.getComponent(Destroyable).hits -= 1;
        //     }
        //   }
        // }
      }
    }
  }
  clone() {
    return new CollisionSystem();
  }
}
