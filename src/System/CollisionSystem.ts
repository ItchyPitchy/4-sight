import { Level } from "../Level/Level.js";
import { System } from "./System.js";
import Entity from "../Entity/Entity.js";
import { Hitbox } from "../Component/Hitbox.js";
import { Vector } from "../Component/Vector.js";
import CircleHitbox from "../Component/CircleHitbox.js";
import RectHitbox from "../Component/RectHitbox.js";

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

        if (
          (entity1.hasComponent(CircleHitbox) &&
            entity2.hasComponent(RectHitbox)) ||
          (entity1.hasComponent(RectHitbox) &&
            entity2.hasComponent(CircleHitbox))
        ) {
          const entityWithCircleHitbox = entity1.hasComponent(CircleHitbox)
            ? entity1
            : entity2.hasComponent(CircleHitbox)
            ? entity2
            : null;
          const entityWithRectHitbox = entity1.hasComponent(RectHitbox)
            ? entity1
            : entity2.hasComponent(RectHitbox)
            ? entity2
            : null;

          if (!entityWithCircleHitbox || !entityWithRectHitbox) {
            throw new Error(
              "Not exactly one point- and one rectangle shaped entity hitbox (should not happen)"
            );
          }

          const collision = this.circleRectangleCollision(
            entityWithCircleHitbox,
            entityWithRectHitbox
          );

          if (collision) {
            console.log(collision);
            this.resolveCircleRectCollision(
              entityWithCircleHitbox,
              entityWithRectHitbox
            );
          }
        }
      }
    }
  }

  // pointRectangleCollision(circleEntity: Entity, rectEntity: Entity) {
  //   const cx = circleEntity.position.x; // point position
  //   const cy = circleEntity.position.y;

  //   const rx = rectEntity.position.x; // rectangle position
  //   const ry = rectEntity.position.y;
  //   const rw = rectEntity.size.width; // and dimensions
  //   const rh = rectEntity.size.height;

  //   // is the point inside the rectangle's bounds?
  //   if (
  //     cx >= rx && // left edge
  //     cx <= rx + rw && // right edge
  //     cy >= ry && // top edge
  //     cy <= ry + rh // bottom edge
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  // resolvePointRectangleCollision(pointEntity: Entity, rectEntity: Entity) {
  //   const px = pointEntity.position.x; // point position
  //   const py = pointEntity.position.y;

  //   const rx = rectEntity.position.x; // rectangle position
  //   const ry = rectEntity.position.y;
  //   const rw = rectEntity.size.width; // and dimensions
  //   const rh = rectEntity.size.height;

  //   // Expects that point entity has vector but not rectangle entity
  //   const leftOffset = px - rx;
  //   const rightOffset = rx + rw - px;
  //   const topOffset = py - ry;
  //   const bottomOffset = ry + rh - py;

  //   const pointEntityVector = pointEntity.getComponent(Vector) as Vector;

  //   if (pointEntityVector) {
  //     if (leftOffset < topOffset && leftOffset < bottomOffset && pointEntityVector.x > 0) {
  //       pointEntityVector.x = -pointEntityVector.x
  //     } else if (rightOffset < topOffset && rightOffset < bottomOffset && pointEntityVector.x < 0) {
  //       pointEntityVector.y = -pointEntityVector.x
  //     } else if (topOffset < leftOffset && topOffset < rightOffset && pointEntityVector.y > 0) {
  //       pointEntityVector.y = -pointEntityVector.y
  //     } else if (bottomOffset < leftOffset && bottomOffset < rightOffset && pointEntityVector.y < 0) {
  //       pointEntityVector.y = -pointEntityVector.y
  //     }
  //   }
  // }

  circleRectangleCollision(
    entityWithCircleHitbox: Entity,
    entityWithRectHitbox: Entity
  ) {
    const cx = entityWithCircleHitbox.position.x;
    const cy = entityWithCircleHitbox.position.y;
    const rx = entityWithRectHitbox.position.x;
    const ry = entityWithRectHitbox.position.y;
    const rw = entityWithRectHitbox.size.width;
    const rh = entityWithRectHitbox.size.height;

    let closestEdgeX = cx;
    let closestEdgeY = cy;

    if (cx < rx) closestEdgeX = rx; // left edge
    else if (cx > rx + rw) closestEdgeX = rx + rw; // right edge

    if (cy < ry) closestEdgeY = ry; // top edge
    else if (cy > ry + rh) closestEdgeY = ry + rh; // bottom edge

    const distX = cx - closestEdgeX;
    const distY = cy - closestEdgeY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance <= entityWithCircleHitbox.size.width / 2) {
      return true;
    }

    return false;
  }

  resolveCircleRectCollision(
    entityWithCircleHitbox: Entity,
    entityWithRectHitbox: Entity
  ) {
    const cx = entityWithCircleHitbox.position.x;
    const cy = entityWithCircleHitbox.position.y;
    const rx = entityWithRectHitbox.position.x;
    const ry = entityWithRectHitbox.position.y;
    const rw = entityWithRectHitbox.size.width;
    const rh = entityWithRectHitbox.size.height;

    // Expects that point entity has vector but not rectangle entity
    const leftOffset = cx - rx;
    const rightOffset = rx + rw - cx;
    const topOffset = cy - ry;
    const bottomOffset = ry + rh - cy;

    const circleEntityVector = entityWithCircleHitbox.getComponent(Vector) as
      | Vector
      | undefined;

    if (circleEntityVector) {
      if (
        leftOffset < topOffset &&
        leftOffset < bottomOffset &&
        circleEntityVector.x > 0
      ) {
        entityWithCircleHitbox.position.x =
          entityWithRectHitbox.position.x -
          entityWithCircleHitbox.size.width / 2;
        circleEntityVector.x = -circleEntityVector.x;
      } else if (
        rightOffset < topOffset &&
        rightOffset < bottomOffset &&
        circleEntityVector.x < 0
      ) {
        entityWithCircleHitbox.position.x =
          entityWithRectHitbox.position.x +
          entityWithRectHitbox.size.width +
          entityWithCircleHitbox.size.width / 2;
        circleEntityVector.x = -circleEntityVector.x;
      } else if (
        topOffset < leftOffset &&
        topOffset < rightOffset &&
        circleEntityVector.y > 0
      ) {
        entityWithCircleHitbox.position.y =
          entityWithRectHitbox.position.y -
          entityWithCircleHitbox.size.height / 2;
        circleEntityVector.y = -circleEntityVector.y;
      } else if (
        bottomOffset < leftOffset &&
        bottomOffset < rightOffset &&
        circleEntityVector.y < 0
      ) {
        entityWithCircleHitbox.position.y =
          entityWithRectHitbox.position.y +
          entityWithRectHitbox.size.height +
          entityWithCircleHitbox.size.height / 2;
        circleEntityVector.y = -circleEntityVector.y;
      }
    } else {
      if (leftOffset < topOffset && leftOffset < bottomOffset) {
        entityWithCircleHitbox.position.x =
          entityWithRectHitbox.position.x -
          entityWithCircleHitbox.size.width / 2;
      } else if (rightOffset < topOffset && rightOffset < bottomOffset) {
        entityWithCircleHitbox.position.x =
          entityWithRectHitbox.position.x +
          entityWithRectHitbox.size.width +
          entityWithCircleHitbox.size.width / 2;
      } else if (topOffset < leftOffset && topOffset < rightOffset) {
        entityWithCircleHitbox.position.y =
          entityWithRectHitbox.position.y -
          entityWithCircleHitbox.size.height / 2;
      } else if (bottomOffset < leftOffset && bottomOffset < rightOffset) {
        entityWithCircleHitbox.position.y =
          entityWithRectHitbox.position.y +
          entityWithRectHitbox.size.height +
          entityWithCircleHitbox.size.height / 2;
      }
    }
  }
}
