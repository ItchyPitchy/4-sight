import Entity from "../Entity/Entity";
import { Player1 } from "../Entity/Player1";
import Cell from "../Level/Cell";
import Game from "../game";
import { System } from "./System";

export default class MoveSystem extends System {
  keys = new Set<"w" | "a" | "s" | "d">();

  constructor() {
    super();

    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 87:
          this.keys.add("w");
          break;
        case 65:
          this.keys.add("a");
          break;
        case 83:
          this.keys.add("d");
          break;
        case 68:
          this.keys.add("s");
          break;
      }
    });
  }

  appliesTo(entity: Entity) {
    return entity instanceof Cell;
  }

  update(entities: Cell[], dt: number, game: Game) {
    const playerCell = entities.find((cell) =>
      cell.entities.find((entity) => entity instanceof Player1)
    );

    if (!playerCell) return;

    let moveToCell: Cell | undefined | null = null;

    if (this.keys.has("w")) {
      moveToCell = entities.find(
        (cell) => cell.x === playerCell.x && cell.y === playerCell.y - 1
      );

      this.keys.delete("w");
    }

    if (this.keys.has("a")) {
      moveToCell = entities.find(
        (cell) => cell.x === playerCell.x - 1 && cell.y === playerCell.y
      );

      this.keys.delete("a");
    }

    if (this.keys.has("s")) {
      moveToCell = entities.find(
        (cell) => cell.x === playerCell.x + 1 && cell.y === playerCell.y
      );

      this.keys.delete("s");
    }

    if (this.keys.has("d")) {
      moveToCell = entities.find(
        (cell) => cell.x === playerCell.x && cell.y === playerCell.y + 1
      );

      this.keys.delete("d");
    }

    if (moveToCell) {
      moveToCell.addEntity(new Player1());
      playerCell.entities = playerCell.entities.filter(
        (entity) => !(entity instanceof Player1)
      );
    }
  }
}
