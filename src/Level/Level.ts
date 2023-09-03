import Entity from "../Entity/Entity";
import { Player1 } from "../Entity/Player1";
import Wall from "../Entity/Wall";
import MoveSystem from "../System/MoveSystem";
import { ShootSystem } from "../System/ShootSystem";
import { System } from "../System/System";
import Game from "../game";
import Cell from "./Cell";

type Board = Array<Array<Cell>>;

export class Level {
  systems: System[] = [new ShootSystem(), new MoveSystem()];
  board: Board | null = null;
  offsetX = 0;
  offsetY = 0;

  constructor(readonly structure: Array<Array<Entity[] | null>>) {}

  buildLevel(gameWidth: number, gameHeight: number) {
    const generatedBoard: Board = [];

    this.structure.forEach((row, rowIndex) => {
      const generatedRow: Cell[] = [];

      row.forEach((obstacle, obstacleIndex) => {
        const position = {
          x: obstacleIndex,
          y: rowIndex,
        };

        const minimumGameSizeAxis = gameWidth < gameHeight ? "x" : "y";
        const minimumGameSize =
          minimumGameSizeAxis === "x" ? gameWidth : gameHeight;

        const maximumBoardSizeAxis = "x";
        const maximumBoardSize = 15; // Don't hardcode this!!!
        const maximumCellSize = minimumGameSize / maximumBoardSize;

        const cell = new Cell(
          position.x,
          position.y,
          maximumCellSize,
          maximumCellSize * position.x,
          maximumCellSize * position.y
        );

        if (obstacle !== null) {
          cell.entities = [...cell.entities, ...obstacle];
        }

        generatedRow.push(cell);
      });

      generatedBoard.push(generatedRow);
    });

    this.board = generatedBoard;
  }

  update(dt: number, game: Game) {
    if (!this.board) return;

    for (const system of this.systems) {
      const filteredEntities = this.board.flat().filter(system.appliesTo);
      system.update(filteredEntities, dt, game);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.board) return;

    for (const row of this.board) {
      for (const cell of row) {
        const drawPosition = {
          x: cell.drawX,
          y: cell.drawY,
        };

        ctx.beginPath();

        if (cell.entities.find((entity) => entity instanceof Wall)) {
          ctx.fillStyle = "#000";
          ctx.fillRect(drawPosition.x, drawPosition.y, cell.size, cell.size);
          ctx.fill();
        } else if (cell.entities.find((entity) => entity instanceof Player1)) {
          ctx.fillStyle = "#543";
          ctx.fillRect(drawPosition.x, drawPosition.y, cell.size, cell.size);
          ctx.fill();
        } else {
          ctx.strokeStyle = "#000";
          ctx.strokeRect(drawPosition.x, drawPosition.y, cell.size, cell.size);
          ctx.stroke();
        }

        ctx.closePath();
      }
    }

    for (const system of this.systems) {
      system.draw(ctx);
    }
  }
}
