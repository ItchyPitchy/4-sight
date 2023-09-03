import Bullet from "../Entity/Bullet";
import Entity from "../Entity/Entity";
import { Player1 } from "../Entity/Player1";
import Wall from "../Entity/Wall";
import Cell from "../Level/Cell";
import Game from "../game";
import BulletSystem from "./BulletSystem";
import { System } from "./System";

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
  bulletSystem = new BulletSystem();

  constructor() {
    super();

    (
      document.querySelector("#gameScreen") as HTMLCanvasElement
    ).addEventListener("click", (e) => {
      this.keys.add("leftClick");
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
    return (
      entity instanceof Cell &&
      Boolean(
        entity.entities.find(
          (entity) => entity instanceof Wall || entity instanceof Player1
        )
      )
    );
  }

  update(entities: Cell[], dt: number, game: Game) {
    const playerCell = entities.find((cell) =>
      cell.entities.find((entity) => entity instanceof Player1)
    );

    if (!playerCell) return;

    this.startPos = {
      x: playerCell.drawX + playerCell.size / 2,
      y: playerCell.drawY + playerCell.size / 2,
    };

    if (!this.mousePos) return;

    const vector = {
      x: this.mousePos.x - (playerCell.drawX + playerCell.size / 2),
      y: this.mousePos.y - (playerCell.drawY + playerCell.size / 2),
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

    const obstacleCells = entities.filter((cell) =>
      cell.entities.find((entity) => entity instanceof Wall)
    );

    for (const cell of obstacleCells) {
      const sx: number = cell.drawX; // square position
      const sy: number = cell.drawY;
      const sw: number = cell.size; // and size
      const sh: number = cell.size;

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
      this.bulletSystem.addBullets(
        new Bullet(
          { x: this.startPos.x, y: this.startPos.y },
          {
            x: this.nearestIntersection.intersectionX,
            y: this.nearestIntersection.intersectionY,
          }
        )
      );

      this.keys.delete("leftClick");
    }

    this.bulletSystem.update(dt);
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

    this.bulletSystem.draw(ctx);
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
