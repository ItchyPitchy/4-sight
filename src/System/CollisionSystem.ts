import { Level } from "../Level/Level.js";
import { System } from "./System.js";
import Entity from "../Entity/Entity.js";
import { Hitbox } from "../Component/Hitbox.js";
import { Vector } from "../Component/Vector.js";

export class CollisionSystem extends System {
  constructor() {
    super();
  }

  appliesTo(entity: Entity) {
    return entity.hasComponent(Hitbox);
  }

  update(entities: Entity[], dt: number, level: Level) {
    for (const entity1 of entities) {
      for (const entity2 of entities) {
        if (entity1 === entity2) continue;
        const entity1Hitbox = entity1.getComponent(Hitbox) as Hitbox;
        const entity2Hitbox = entity2.getComponent(Hitbox) as Hitbox;

        const entity1HitboxShape = entity1Hitbox.shape;
        const entity2HitboxShape = entity2Hitbox.shape;

        if (
          (entity1HitboxShape === "point" &&
            entity2HitboxShape === "rectangle") ||
          (entity1HitboxShape === "rectangle" && entity2HitboxShape === "point")
        ) {
          const pointEntity =
            entity1Hitbox.shape === "point"
              ? entity1
              : entity2Hitbox.shape === "point"
              ? entity2
              : null;
          const rectEntity =
            entity1Hitbox.shape === "rectangle"
              ? entity1
              : entity2Hitbox.shape === "rectangle"
              ? entity2
              : null;

          if (!pointEntity || !rectEntity) {
            throw new Error(
              "Not exactly one point- and one rectangle shaped entity hitbox (should not happen)"
            );
          }

          const collision = this.pointRectangleCollision(
            pointEntity,
            rectEntity
          );

          console.log(collision);

          if (collision) {
            this.resolvePointRectangleCollision(pointEntity, rectEntity);
          }
        }
      }
    }
  }

  pointRectangleCollision(pointEntity: Entity, rectEntity: Entity) {
    // console.log(pointEntity);
    // console.log(rectEntity);
    const px = pointEntity.position.x; // point position
    const py = pointEntity.position.y;

    const rx = rectEntity.position.x; // rectangle position
    const ry = rectEntity.position.y;
    const rw = rectEntity.size.width; // and dimensions
    const rh = rectEntity.size.height;

    // is the point inside the rectangle's bounds?
    if (
      px >= rx && // right of the left edge AND
      px <= rx + rw && // left of the right edge AND
      py >= ry && // below the top AND
      py <= ry + rh
    ) {
      // above the bottom
      return true;
    }
    return false;
  }

  resolvePointRectangleCollision(pointEntity: Entity, rectEntity: Entity) {
    const px = pointEntity.position.x; // point position
    const py = pointEntity.position.y;

    const rx = rectEntity.position.x; // rectangle position
    const ry = rectEntity.position.y;
    const rw = rectEntity.size.width; // and dimensions
    const rh = rectEntity.size.height;

    // Expects that point- has vector but not rectangle entity
    const leftOffset = px - rx;
    const rightOffset = rx + rw - px;
    const topOffset = py - ry;
    const bottomOffset = ry + rh - py;

    const pointEntityVector = pointEntity.getComponent(Vector) as Vector;

    if (pointEntityVector) {
      console.log("vector");
      // if (
      //   (leftOffset < topOffset && leftOffset < bottomOffset) ||
      //   (rightOffset < topOffset && rightOffset < bottomOffset)
      // ) {
      pointEntityVector.x = pointEntityVector.x * -1;
      // } else {
      pointEntityVector.y = pointEntityVector.y * -1;
      // }
    }
  }
}
