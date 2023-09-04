import { Player1 } from "../Entity/Player1";
import Wall from "../Entity/Wall";
import MoveSystem from "../System/MoveSystem";
import { ShootSystem } from "../System/ShootSystem";
import { System } from "../System/System";
import Game from "../game";
import Cell from "./Cell";

export class Level {
  systems: System[] = [new ShootSystem(), new MoveSystem()];
  cells: Cell[] = [];
  offsetX = 0;
  offsetY = 0;

  constructor(
    readonly structure: Array<Array<Array<{ type: string }> | null>>
  ) {}

  buildLevel(gameWidth: number, gameHeight: number) {
    const cells: Cell[] = [];

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
      row.forEach((cellEntities, cellEntitiesIndex) => {
        const position = {
          x: cellEntitiesIndex,
          y: rowIndex,
        };

        const cell = new Cell(position.x, position.y, cellSize, {
          x: cellSize * position.x + this.offsetX,
          y: cellSize * position.y + this.offsetY,
        });

        if (cellEntities !== null) {
          for (const cellEntity of cellEntities) {
            switch (cellEntity.type) {
              case "player": {
                cell.addEntitys(new Player1());
                break;
              }
              case "wall": {
                cell.addEntitys(new Wall());
                break;
              }
              default:
                throw new Error("Invalid entity type");
            }
          }
        }

        cells.push(cell);
      });
    });

    this.cells = cells;
  }

  update(dt: number, game: Game) {
    for (const system of this.systems) {
      const filteredEntities = this.cells.filter(system.appliesTo);
      system.update(filteredEntities, dt, game);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const cell of this.cells) {
      cell.draw(ctx);
    }

    for (const system of this.systems) {
      system.draw(ctx);
    }
  }
}
