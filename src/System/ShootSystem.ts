import Game from "../game";
import { Level } from "../Level/Level";
import { System } from "./System";
import Entity from "../Entity/Entity";
import Player from "../Entity/Player";
import Player1 from "../Entity/Player1";
import Player2 from "../Entity/Player2";
import Player3 from "../Entity/Player3";
import Player4 from "../Entity/Player4";
import { Vector } from "../Component/Vector";
import CircleHitbox from "../Component/CircleHitbox";
import RectHitbox from "../Component/RectHitbox";
import PlasmaBullet from "../Entity/PlasmaBullet";
import IckyBullet from "../Entity/IckyBullet";
import OwlySkott from "../Entity/OwlySkott";
import CrustlingSkott from "../Entity/CrustlingSkott";
import { getDegrees } from "../getDegrees";

export class ShootSystem extends System {
  gameWidth: number = 0;
  gameHeight: number = 0;
  startPos: { x: number; y: number }[] = [];
  aimPos: { x: number; y: number }[] = [];
  nearestIntersections: {
    intersectionX: number;
    intersectionY: number;
  }[] = [];

  constructor() {
    super();
  }

  appliesTo(entity: Entity) {
    return entity instanceof Entity;
  }

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    const players = entities.filter((entity) => entity instanceof Player);

    const aimPoss = [];
    const startPoss = [];
    const nearestIntersections = [];

    for (const player of players as Player[]) {
      const playerCenter = {
        x: player.position.x,
        y: player.position.y,
      };

      const startPos = {
        x: 0,
        y: 0,
      };

      if (level.levelState === "RESULT") {
        if (player instanceof Player1) {
          startPos.x =
            playerCenter.x +
            (player.size.width / 2) *
              Math.cos(
                getDegrees(
                  player.position,
                  level.player1Turn[level.playerTurnCurrentIndex].mousePos
                )
              );
          startPos.y =
            playerCenter.y +
            (player.size.height / 2) *
              Math.sin(
                getDegrees(
                  player.position,
                  level.player1Turn[level.playerTurnCurrentIndex].mousePos
                )
              );

          player.degrees =
            getDegrees(
              player.position,
              level.player1Turn[level.playerTurnCurrentIndex].mousePos
            ) +
            Math.PI / 2;

        } else if (player instanceof Player2) {
          startPos.x =
            playerCenter.x +
            (player.size.width / 2) *
              Math.cos(
                getDegrees(
                  player.position,
                  level.player2Turn[level.playerTurnCurrentIndex].mousePos
                )
              );
          startPos.y =
            playerCenter.y +
            (player.size.height / 2) *
              Math.sin(
                getDegrees(
                  player.position,
                  level.player2Turn[level.playerTurnCurrentIndex].mousePos
                )
              );

          player.degrees =
            getDegrees(
              player.position,
              level.player2Turn[level.playerTurnCurrentIndex].mousePos
            ) +
            Math.PI / 2;
            
          } else if (player instanceof Player3) {
            startPos.x =
              playerCenter.x +
              (player.size.width / 2) *
                Math.cos(
                  getDegrees(
                    player.position,
                    level.player3Turn[level.playerTurnCurrentIndex].mousePos
                  )
                );
            startPos.y =
              playerCenter.y +
              (player.size.height / 2) *
                Math.sin(
                  getDegrees(
                    player.position,
                    level.player3Turn[level.playerTurnCurrentIndex].mousePos
                  )
                );
  
            player.degrees =
              getDegrees(
                player.position,
                level.player3Turn[level.playerTurnCurrentIndex].mousePos
              ) +
              Math.PI / 2;

            } else if (player instanceof Player4) {
              startPos.x =
                playerCenter.x +
                (player.size.width / 2) *
                  Math.cos(
                    getDegrees(
                      player.position,
                      level.player4Turn[level.playerTurnCurrentIndex].mousePos
                    )
                  );
              startPos.y =
                playerCenter.y +
                (player.size.height / 2) *
                  Math.sin(
                    getDegrees(
                      player.position,
                      level.player4Turn[level.playerTurnCurrentIndex].mousePos
                    )
                  );
    
              player.degrees =
                getDegrees(
                  player.position,
                  level.player4Turn[level.playerTurnCurrentIndex].mousePos
                ) +
                Math.PI / 2;

        }
      } else {
        startPos.x =
          playerCenter.x +
          (player.size.width / 2) *
            Math.cos(getDegrees(player.position, game.mousePos));
        startPos.y =
          playerCenter.y +
          (player.size.height / 2) *
            Math.sin(getDegrees(player.position, game.mousePos));

        player.degrees =
          getDegrees(player.position, game.mousePos) + Math.PI / 2;
      }

      startPoss.push(startPos);

      const vector = new Vector(0, 0);

      if (level.levelState === "RESULT") {

        if (player instanceof Player1) {
          if (level.player1Turn[level.playerTurnCurrentIndex]) {
            vector.x =
              level.player1Turn[level.playerTurnCurrentIndex].mousePos.x -
              player.position.x;
            vector.y =
              level.player1Turn[level.playerTurnCurrentIndex].mousePos.y -
              player.position.y;
          }
        } else if (player instanceof Player2) {
          if (level.player2Turn[level.playerTurnCurrentIndex]) {
            vector.x =
              level.player2Turn[level.playerTurnCurrentIndex].mousePos.x -
              player.position.x;
            vector.y =
              level.player2Turn[level.playerTurnCurrentIndex].mousePos.y -
              player.position.y;
          }
        } else if (player instanceof Player3) {
          if (level.player3Turn[level.playerTurnCurrentIndex]) {
            vector.x =
              level.player3Turn[level.playerTurnCurrentIndex].mousePos.x -
              player.position.x;
            vector.y =
              level.player2Turn[level.playerTurnCurrentIndex].mousePos.y -
              player.position.y;
          }
        } else if (player instanceof Player4) {
          if (level.player4Turn[level.playerTurnCurrentIndex]) {
            vector.x =
              level.player4Turn[level.playerTurnCurrentIndex].mousePos.x -
              player.position.x;
            vector.y =
              level.player4Turn[level.playerTurnCurrentIndex].mousePos.y -
              player.position.y;
      }
      
        }
      } else {
        vector.x = game.mousePos.x - player.position.x;
        vector.y = game.mousePos.y - player.position.y;
      }

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

      const aimPos = {
        x: startPos.x + magnitude.x,
        y: startPos.y + magnitude.y,
      };

      aimPoss.push(aimPos);

      const x1: number = aimPos.x; // points for line (controlled by mouse)
      const y1: number = aimPos.y;
      const x2: number = startPos.x; // static point
      const y2: number = startPos.y;

      let nearestIntersection: {
        intersectionX: number;
        intersectionY: number;
      } = {
        intersectionX: x1,
        intersectionY: y1,
      };

      const obstacles = entities.filter((entity) =>
        entity.hasComponent(RectHitbox)
      );

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
            };
          }
        }
      }

      nearestIntersections.push(nearestIntersection);

      if (level.levelState === "RESULT") {
        if (
          player instanceof Player1 &&
          level.player1Turn[level.playerTurnCurrentIndex].shoot === true
        ) {
          const bullet = new PlasmaBullet({ x: startPos.x, y: startPos.y }, 15);
          bullet.addComponents(
            new Vector(norm.x * 2500, norm.y * 2500),
            new CircleHitbox(),
          );

          level.entities.push(bullet);
        }

        if (
          player instanceof Player2 &&
          level.player2Turn[level.playerTurnCurrentIndex].shoot === true
        ) {
          const bullet = new IckyBullet({ x: startPos.x, y: startPos.y }, 15);
          bullet.addComponents(
            new Vector(norm.x * 2500, norm.y * 2500),
            new CircleHitbox()
          );

          level.entities.push(bullet);
        }

        if (
          player instanceof Player3 &&
          level.player3Turn[level.playerTurnCurrentIndex].shoot === true
        ) {
          const bullet = new OwlySkott({ x: startPos.x, y: startPos.y }, 15);
          bullet.addComponents(
            new Vector(norm.x * 2500, norm.y * 2500),
            new CircleHitbox()
          );

          level.entities.push(bullet);
        }

        if (
          player instanceof Player4 &&
          level.player4Turn[level.playerTurnCurrentIndex].shoot === true
        ) {
          const bullet = new CrustlingSkott({ x: startPos.x, y: startPos.y }, 15);
          bullet.addComponents(
            new Vector(norm.x * 2500, norm.y * 2500),
            new CircleHitbox()
          );

          level.entities.push(bullet);
        }
      } else if (game.keys.has("leftClick")) {
        if (player instanceof Player1 && level.levelState === "PLAYER_1_TURN") {
          console.log(level.player1Turn);
          level.player1Turn[level.player1Turn.length - 1].shoot = true;

          const bullet = new PlasmaBullet({ x: startPos.x, y: startPos.y }, 15);
          bullet.addComponents(
            new Vector(norm.x * 2500, norm.y * 2500),
            new CircleHitbox(),
///         new LightSource()
          );

          level.entities.push(bullet);

        } else if (
          player instanceof Player2 &&
          level.levelState === "PLAYER_2_TURN"
        ) {
          level.player2Turn[level.player2Turn.length - 1].shoot = true;

          const bullet = new IckyBullet({ x: startPos.x, y: startPos.y }, 15);
          bullet.addComponents(
            new Vector(norm.x * 2500, norm.y * 2500),
            new CircleHitbox()
          );

          level.entities.push(bullet);
          
        } else if (
          player instanceof Player3 &&
          level.levelState === "PLAYER_3_TURN"
        ) {
          level.player3Turn[level.player3Turn.length - 1].shoot = true;

          const bullet = new OwlySkott({ x: startPos.x, y: startPos.y }, 15);
          bullet.addComponents(
            new Vector(norm.x * 2500, norm.y * 2500),
            new CircleHitbox()
          );

          level.entities.push(bullet);
        } else if (
          player instanceof Player4 &&
          level.levelState === "PLAYER_4_TURN"
        ) {
          level.player4Turn[level.player4Turn.length - 1].shoot = true;

          const bullet = new CrustlingSkott({ x: startPos.x, y: startPos.y }, 15);
          bullet.addComponents(
            new Vector(norm.x * 2500, norm.y * 2500),
            new CircleHitbox()
          );

          level.entities.push(bullet);
        }

        game.keys.delete("leftClick");
      }

      this.startPos = startPoss;
      this.aimPos = aimPoss;
      this.nearestIntersections = nearestIntersections;
    }
  }


  draw(ctx: CanvasRenderingContext2D) {
    for (
      let i = 0;
      i <
      Math.min(
        this.startPos.length,
        this.aimPos.length,
        this.nearestIntersections.length
      );
      i++
    ) {
      ctx.save();

      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.arc(this.startPos[i].x, this.startPos[i].y, 5, 0, 2 * Math.PI);
      ctx.fill();

      // draw the line
      ctx.beginPath();
      ctx.strokeStyle = "#00FFFF";
      ctx.moveTo(this.startPos[i].x, this.startPos[i].y);
      ctx.lineTo(
        this.nearestIntersections[i].intersectionX,
        this.nearestIntersections[i].intersectionY
      );
      ctx.stroke();

      // draw intersection dot
      ctx.fillStyle = "#00FFFF";
      ctx.beginPath();
      ctx.arc(
        this.nearestIntersections[i].intersectionX,
        this.nearestIntersections[i].intersectionY,
        5,
        0,
        2 * Math.PI
      );
      ctx.fill();

      ctx.restore();
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
