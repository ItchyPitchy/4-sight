import Game from "../game";
import { Level } from "../Level/Level";
import { System } from "./System";
import Bullet from "../Entity/Bullet";
import Entity from "../Entity/Entity";
import { Player1 } from "../Entity/Player1";
import { Hitbox } from "../Component/Hitbox";
import { Vector } from "../Component/Vector";
import CircleHitbox from "../Component/CircleHitbox";
import RectHitbox from "../Component/RectHitbox";

export class ShootSystem extends System {
  keys = new Set<"leftClick">();
  mousePos: { x: number; y: number } | null = null;
  startPos: { x: number; y: number } | null = null;
  aimPos: { x: number; y: number } | null = null;
  nearestIntersection: {
    intersectionX: number;
    intersectionY: number;
    intersectedRect?: {
      sx: number;
      sy: number;
      sw: number;
      sh: number;
    };
  } | null = null;

  constructor() {
    super();

    (
      document.querySelector("#gameScreen") as HTMLCanvasElement
    ).addEventListener("mousedown", (e) => {
      this.keys.add("leftClick");
    });

    (
      document.querySelector("#gameScreen") as HTMLCanvasElement
    ).addEventListener("mouseup", (e) => {
      this.keys.delete("leftClick");
    });

    (
      document.querySelector("#gameScreen") as HTMLCanvasElement
    ).addEventListener("mousemove", (e) => {
      this.mousePos = {
        x: e.offsetX,
        y: e.offsetY,
      };
    });
  }

  appliesTo(entity: Entity) {
    return entity instanceof Entity;
  }

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    const players = entities.filter((entity) => entity instanceof Player1);

    // if (!players) return;

    for (const player of players) {
      this.startPos = {
        x: player.position.x + player.size.width / 2,
        y: player.position.y + player.size.height / 2,
      };

      if (!this.mousePos) return;

      const vector = {
        x: this.mousePos.x - (player.position.x + player.size.width / 2),
        y: this.mousePos.y - (player.position.y + player.size.height / 2),
      };
      const mousePosBasedMagnitude = Math.sqrt(
        Math.pow(vector.x, 2) + Math.pow(vector.y, 2)
      );
      const norm = {
        x: vector.x / mousePosBasedMagnitude,
        y: vector.y / mousePosBasedMagnitude,
      };

      const magnitude = {
        x:
          norm.x *
          Math.sqrt(Math.pow(game.gameWidth, 2) + Math.pow(game.gameHeight, 2)),
        y:
          norm.y *
          Math.sqrt(Math.pow(game.gameWidth, 2) + Math.pow(game.gameHeight, 2)),
      };

      this.aimPos = {
        x: this.startPos.x + magnitude.x,
        y: this.startPos.y + magnitude.y,
      };

      const x1: number = this.aimPos.x; // points for line (controlled by mouse)
      const y1: number = this.aimPos.y;
      const x2: number = this.startPos.x; // static point
      const y2: number = this.startPos.y;

      let nearestIntersection: {
        intersectionX: number;
        intersectionY: number;
        intersectedRect?: {
          sx: number;
          sy: number;
          sw: number;
          sh: number;
        };
      } = {
        intersectionX: x1,
        intersectionY: y1,
      };

      console.log(entities);
      const obstacles = entities.filter((entity) =>
        entity.hasComponent(RectHitbox)
      );

      console.log(obstacles);

      for (const obstacle of obstacles) {
        const sx = obstacle.position.x; // square position
        const sy = obstacle.position.y;
        const sw = obstacle.size.width; // and size
        const sh = obstacle.size.height;

        // check if line has hit the square
        // if so, change the fill color
        const intersections = this.lineRect(x1, y1, x2, y2, sx, sy, sw, sh);

        for (const intersection of intersections) {
          const intersectionDistanceX = intersection.intersectionX - x2;
          const intersectionDistanceY = intersection.intersectionY - y2;
          const intersectionDistance = Math.sqrt(
            Math.pow(intersectionDistanceX, 2) +
              Math.pow(intersectionDistanceY, 2)
          );

          const nearestIntersectionDistanceX =
            nearestIntersection.intersectionX - x2;
          const nearestIntersectionDistanceY =
            nearestIntersection.intersectionY - y2;
          const nearestIntersectionDistance = Math.sqrt(
            Math.pow(nearestIntersectionDistanceX, 2) +
              Math.pow(nearestIntersectionDistanceY, 2)
          );

          if (intersectionDistance < nearestIntersectionDistance) {
            nearestIntersection = {
              intersectionX: intersection.intersectionX,
              intersectionY: intersection.intersectionY,
              intersectedRect: {
                sx,
                sy,
                sw,
                sh,
              },
            };
          }

          // ctx.fillStyle = "blue";
          // ctx.beginPath();
          // ctx.arc(
          //   intersection.intersectionX,
          //   intersection.intersectionY,
          //   5,
          //   0,
          //   2 * Math.PI
          // );
          // ctx.fill();
        }
      }

      this.nearestIntersection = nearestIntersection;

      if (this.keys.has("leftClick")) {
        const bullet = new Bullet(
          { x: this.startPos.x, y: this.startPos.y },
          5
        );
        bullet.addComponents(
          new Vector(norm.x * 1000, norm.y * 1000),
          new CircleHitbox()
        );

        level.entities.push(bullet);

        // this.keys.delete("leftClick");
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.startPos && this.aimPos) {
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(this.startPos.x, this.startPos.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      if (this.nearestIntersection) {
        if (this.nearestIntersection.intersectedRect) {
          const { intersectedRect } = this.nearestIntersection;
          ctx.fillStyle = "orange";
          ctx.fillRect(
            intersectedRect.sx,
            intersectedRect.sy,
            intersectedRect.sw,
            intersectedRect.sh
          );
        }

        ctx.save();
        // draw the line
        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.moveTo(this.startPos.x, this.startPos.y);
        ctx.lineTo(
          this.nearestIntersection.intersectionX,
          this.nearestIntersection.intersectionY
        );
        ctx.stroke();
        ctx.restore();

        // draw intersection dot
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
          this.nearestIntersection.intersectionX,
          this.nearestIntersection.intersectionY,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }

  lineRect(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    rx: number,
    ry: number,
    rw: number,
    rh: number
  ) {
    // check if the line has hit any of the rectangle's sides
    // uses the Line/Line function below
    const left = this.lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
    const right = this.lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
    const top = this.lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
    const bottom = this.lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

    const intersections: Array<{
      intersectionX: number;
      intersectionY: number;
    }> = [];

    if (left) intersections.push(left);
    if (right) intersections.push(right);
    if (top) intersections.push(top);
    if (bottom) intersections.push(bottom);

    return intersections;
  }

  lineLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    // calculate the direction of the lines
    const uA: number =
      ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const uB: number =
      ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      // where the lines meet
      const intersectionX: number = x1 + uA * (x2 - x1);
      const intersectionY: number = y1 + uA * (y2 - y1);

      return { intersectionX, intersectionY };
    }
    return null;
  }
}
