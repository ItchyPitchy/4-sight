import Game from "../game";
import { CollisionSystem } from "../System/CollisionSystem";
import MoveSystem from "../System/MoveSystem";
import PlayerSystem from "../System/PlayerSystem";
import { ShootSystem } from "../System/ShootSystem";
import { System } from "../System/System";
import LightsourceSystem from "../System/LightsourceSystem";
import Cell from "../Entity/Cell";
import Entity from "../Entity/Entity";
import { Player1 } from "../Entity/Player1";
import Wall from "../Entity/Wall";
import RectHitbox from "../Component/RectHitbox";
import CircleHitbox from "../Component/CircleHitbox";
import LightSource from "../Component/LightSource";

export class Level {
  playerSystem = new PlayerSystem();
  moveSystem = new MoveSystem();
  collisionSystem = new CollisionSystem();
  lightsourceSystem = new LightsourceSystem();
  shootSystem = new ShootSystem();
  entities: Entity[] = [];
  offsetX = 0;
  offsetY = 0;
  playerTurn: "player1" | "player2" | null = "player1";
  playerTurnTimer = 10;
  playerTurnCount = 0;
  player1Turn: {
    mousePos: { x: number; y: number };
    position: { x: number; y: number };
    shoot: boolean;
  }[] = [];
  player1TurnCurrentIndex = 0;

  constructor(readonly structure: Array<Array<number>>) {}

  buildLevel(gameWidth: number, gameHeight: number) {
    const entities: Entity[] = [];
    const rowLength = this.structure[0].length;
    const columnLength = this.structure.length;

    for (const row of this.structure) {
      if (row.length !== rowLength)
        throw new Error("Not all rows in level structure have the same size");
    }

    const gameWidthHeightRatio = gameWidth / gameHeight;
    const levelWidthHeightRatio = rowLength / columnLength;

    let cellSize = 0;

    if (gameWidthHeightRatio < levelWidthHeightRatio) {
      cellSize = gameWidth / rowLength;
      this.offsetX = 0;
      this.offsetY = (gameHeight - cellSize * columnLength) / 2;
    } else {
      cellSize = gameHeight / columnLength;
      this.offsetX = (gameWidth - cellSize * rowLength) / 2;
      this.offsetY = 0;
    }

    if (cellSize <= 0) {
      throw new Error("Cell size less than 0");
    }

    for (let i = 0; i < this.structure.length; i++) {
      for (let j = 0; j < this.structure[i].length; j++) {
        const index = {
          x: j,
          y: i,
        };

        entities.push(
          new Cell(
            {
              x: cellSize * index.x + this.offsetX,
              y: cellSize * index.y + this.offsetY,
            },
            { width: cellSize, height: cellSize }
          )
        );

        switch (this.structure[i][j]) {
          case 1: {
            const wall = new Wall(
              {
                x: cellSize * index.x + this.offsetX,
                y: cellSize * index.y + this.offsetY,
              },
              { width: cellSize, height: cellSize }
            );
            wall.addComponents(new RectHitbox());
            entities.push(wall);
            break;
          }
          case 3: {
            const player = new Player1(
              {
                x: cellSize * index.x + this.offsetX,
                y: cellSize * index.y + this.offsetY,
              },
              { width: cellSize, height: cellSize }
            );
            player.addComponents(new CircleHitbox(), new LightSource());
            entities.push(player);
            break;
          }
          default:
            break;
        }
      }
    }

    this.entities = entities;
  }

  update(dt: number, game: Game) {
    if (this.playerTurn !== null) {
      if (this.playerTurnTimer <= this.playerTurnCount) {
        this.playerTurn = null;
        this.buildLevel(game.gameWidth, game.gameHeight);
      } else {
        console.log(this.playerTurnCount);

        const player = this.entities.find(
          (entity) => entity instanceof Player1
        );

        if (player) {
          this.player1Turn.push({
            mousePos: game.mousePos,
            position: {
              x: player.position.x,
              y: player.position.y,
            },
            shoot: false,
          });
        }

        this.playerTurnCount += dt;

        for (const system of [
          this.playerSystem,
          this.moveSystem,
          this.collisionSystem,
          this.lightsourceSystem,
          this.shootSystem,
        ]) {
          const filteredCells = this.entities.filter(system.appliesTo);
          system.update(filteredCells, dt, this, game);
        }
      }
    } else {
      const player = this.entities.find((entity) => entity instanceof Player1);

      if (player) {
        console.log(this.player1Turn);
        player.position =
          this.player1Turn[this.player1TurnCurrentIndex].position;
        game.mousePos = this.player1Turn[this.player1TurnCurrentIndex].mousePos;

        for (const system of [
          this.moveSystem,
          this.collisionSystem,
          this.lightsourceSystem,
          this.shootSystem,
        ]) {
          const filteredCells = this.entities.filter(system.appliesTo);
          system.update(filteredCells, dt, this, game);
        }
        this.player1TurnCurrentIndex++;
      }
    }
  }

  draw(
    mainCtx: CanvasRenderingContext2D,
    shadowCtx: CanvasRenderingContext2D,
    sightCtx: CanvasRenderingContext2D
  ) {
    for (const entity of this.entities) {
      entity.draw(mainCtx);
    }

    for (const system of [
      this.playerSystem,
      this.moveSystem,
      this.collisionSystem,
    ]) {
      system.draw(mainCtx);
    }

    this.lightsourceSystem.draw(shadowCtx);
    this.shootSystem.draw(sightCtx);
  }
}
