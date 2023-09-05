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
import { Hitbox } from "../Component/Hitbox";

export class Level {
  systems: System[] = [
    new ShootSystem(),
    new CollisionSystem(),
    new PlayerSystem(),
    new MoveSystem(),
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
        const position = {
          x: rowColumnIndex,
          y: rowIndex,
        };

        entities.push(
          new Cell(
            {
              x: cellSize * position.x + this.offsetX,
              y: cellSize * position.y + this.offsetY,
            },
            { width: cellSize, height: cellSize }
          )
        );

        // if (cellEntities !== null) {
        //   for (const cellEntity of cellEntities) {
        switch (rowColumn) {
          case 2: {
            const wall = new Wall(
              {
                x: cellSize * position.x + this.offsetX,
                y: cellSize * position.y + this.offsetY,
              },
              { width: cellSize, height: cellSize }
            );
            wall.addComponents(new Hitbox("rectangle"));
            entities.push(wall);
            break;
          }
          case 3: {
            entities.push(
              new Player1(
                {
                  x: cellSize * position.x + this.offsetX,
                  y: cellSize * position.y + this.offsetY,
                },
                { width: cellSize, height: cellSize }
              )
            );
            break;
          }
          default:
            break;
        }
        //   }
        // }
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
