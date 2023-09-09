import Game from "../game";
import { CollisionSystem } from "../System/CollisionSystem";
import MoveSystem from "../System/MoveSystem";
import PlayerSystem from "../System/PlayerSystem";
import { ShootSystem } from "../System/ShootSystem";
import { PlayerTurnSystem } from "../System/PlayerTurnSystem";
import LightsourceSystem from "../System/LightsourceSystem";
import SightSystem from "../System/SightSystem";
import Cell from "../Entity/Cell";
import Entity from "../Entity/Entity";
import Wall from "../Entity/Wall";
import Player1 from "../Entity/Player1";
import Player2 from "../Entity/Player2";
import RectHitbox from "../Component/RectHitbox";
import CircleHitbox from "../Component/CircleHitbox";
import LightSource from "../Component/LightSource";

export class Level {
  playerSystem = new PlayerSystem();
  moveSystem = new MoveSystem();
  collisionSystem = new CollisionSystem();
  lightsourceSystem = new LightsourceSystem();
  shootSystem = new ShootSystem();
  sightSystem = new SightSystem(this.game.gameWidth, this.game.gameHeight);
  playerTurnSystem = new PlayerTurnSystem();
  entities: Entity[] = [];
  offsetX = 0;
  offsetY = 0;
  levelState: "PLAYER_1_TURN" | "PLAYER_2_TURN" | "RESULT" = "PLAYER_1_TURN";
  playerTurnTimer = 5;
  playerTurnCount = 0;
  player1Turn: {
    mousePos: { x: number; y: number };
    position: { x: number; y: number };
    shoot: boolean;
  }[] = [];
  player2Turn: {
    mousePos: { x: number; y: number };
    position: { x: number; y: number };
    shoot: boolean;
  }[] = [];
  playerTurnCurrentIndex = 0;
  texture: HTMLImageElement | null = null;

  constructor(
    readonly structure: Array<Array<number>>,
    background: any,
    readonly game: Game
  ) {
    const texture = new Image();
    texture.src = background;
    this.texture = texture;
  }

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
          case 2: {
            if (
              this.levelState === "PLAYER_1_TURN" ||
              this.levelState === "RESULT"
            ) {
              const player = new Player1(
                {
                  x: cellSize * index.x + this.offsetX,
                  y: cellSize * index.y + this.offsetY,
                },
                { width: cellSize, height: cellSize }
              );
              player.addComponents(new CircleHitbox(), new LightSource());
              entities.push(player);
            }
            break;
          }
          case 3: {
            if (
              this.levelState === "PLAYER_2_TURN" ||
              this.levelState === "RESULT"
            ) {
              const player = new Player2(
                {
                  x: cellSize * index.x + this.offsetX,
                  y: cellSize * index.y + this.offsetY,
                },
                { width: cellSize, height: cellSize }
              );
              player.addComponents(new CircleHitbox(), new LightSource());
              entities.push(player);
            }
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
    if (this.levelState === "RESULT") {
      for (const system of [
        this.playerSystem,
        this.moveSystem,
        this.collisionSystem,
        this.shootSystem,
        this.sightSystem,
        this.playerTurnSystem,
      ]) {
        const filteredCells = this.entities.filter(system.appliesTo);
        system.update(filteredCells, dt, this, game);
      }

      this.playerTurnCurrentIndex++;
    } else {
      for (const system of [
        this.playerSystem,
        this.moveSystem,
        this.collisionSystem,
        this.lightsourceSystem,
        this.shootSystem,
        this.sightSystem,
        this.playerTurnSystem,
      ]) {
        const filteredCells = this.entities.filter(system.appliesTo);
        system.update(filteredCells, dt, this, game);
      }
    }
  }

  draw(
    mainCtx: CanvasRenderingContext2D,
    shadowCtx: CanvasRenderingContext2D,
    sightCtx: CanvasRenderingContext2D
  ) {
    if (this.texture) {
      mainCtx.drawImage(
        this.texture,
        0,
        0,
        this.game.gameWidth,
        this.game.gameHeight
      );
    }

    for (const entity of this.entities) {
      entity.draw(mainCtx);
    }

    for (const system of [this.shootSystem]) {
      system.draw(mainCtx);
    }

    if (
      (this.levelState === "PLAYER_1_TURN" ||
        this.levelState === "PLAYER_2_TURN") &&
      this.game.gameState === "RUNNING"
    ) {
      this.lightsourceSystem.draw(shadowCtx);
      this.sightSystem.draw(sightCtx);
    }
  }
}
