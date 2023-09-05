import { Level } from "../Level/Level";
import { System } from "./System";
import Entity from "../Entity/Entity";
import { Vector } from "../Component/Vector";

export default class MoveSystem extends System {
  constructor() {
    super();
  }

  appliesTo(entity: Entity) {
    return entity.hasComponent(Vector);
  }

  update(entities: Entity[], dt: number, level: Level) {
    for (const entity of entities) {
      const vector = entity.getComponent(Vector) as Vector;

      entity.position.x += vector.x * dt;
      entity.position.y += vector.y * dt;
    }
  }
}
