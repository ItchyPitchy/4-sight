import Game from "../game";
import { CollisionSystem } from "../System/CollisionSystem";
import MoveSystem from "../System/MoveSystem";
import PlayerSystem from "../System/PlayerSystem";
import { ShootSystem } from "../System/ShootSystem";
import { System } from "../System/System";
import Cell from "../Entity/Cell";
import Entity from "../Entity/Entity";
import { Player1 } from "../Entity/Player1";
import Wall from "../Entity/Wall";
import RectHitbox from "../Component/RectHitbox";
import CircleHitbox from "../Component/CircleHitbox";
import Component from "../Component/Component";
import Flashlight from "../Component/Flashlight";
import FlashlightSystem from "../System/FlashlightSystem";

export class Level {
  systems: System[] = [
    new ShootSystem(),
    new PlayerSystem(),
    new MoveSystem(),
    new CollisionSystem(),
    new FlashlightSystem(),
  ];
  entities: Entity[] = [];
  offsetX = 0;
  offsetY = 0;

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

    this.structure.forEach((row, rowIndex) => {
      row.forEach((rowColumn, rowColumnIndex) => {
        const index = {
          x: rowColumnIndex,
          y: rowIndex,
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

        switch (rowColumn) {
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
            player.addComponents(new CircleHitbox(), new Flashlight(100));
            entities.push(player);
            break;
          }
          default:
            break;
        }
      });
    });

    this.entities = entities;
  }

  update(dt: number, game: Game) {
    for (const system of this.systems) {
      const filteredCells = this.entities.filter(system.appliesTo);
      system.update(filteredCells, dt, this, game);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const entity of this.entities) {
      entity.draw(ctx);
    }

    for (const system of this.systems) {
      system.draw(ctx);
    }
  }
}
