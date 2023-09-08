import Game from "../game";
import { Level } from "../Level/Level";
import { System } from "./System";
import Entity from "../Entity/Entity";
import Player from "../Entity/Player";

export default class PlayerSystem extends System {
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
          this.keys.add("s");
          break;
        case 68:
          this.keys.add("d");
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 87:
          this.keys.delete("w");
          break;
        case 65:
          this.keys.delete("a");
          break;
        case 83:
          this.keys.delete("s");
          break;
        case 68:
          this.keys.delete("d");
          break;
      }
    });
  }

  appliesTo(entity: Entity) {
    return entity instanceof Player;
  }

  update(entities: Player[], dt: number, level: Level, game: Game) {
    // const playerCell = entities.find((cell) => cell.getEntity(Player1));

    // if (!playerCell) return;

    // let moveToCell: Cell | undefined | null = null;

    for (const entity of entities) {
      if (this.keys.has("w")) {
        entity.position.y -= 2;
      }

      if (this.keys.has("a")) {
        entity.position.x -= 2;
      }

      if (this.keys.has("s")) {
        entity.position.y += 2;
      }

      if (this.keys.has("d")) {
        entity.position.x += 2;
      }
    }

    // if (this.keys.has("w")) {
    //   moveToCell = entities.find(
    //     (cell) => cell.x === playerCell.x && cell.y === playerCell.y - 1
    //   );

    //   this.keys.delete("w");
    // }

    // if (this.keys.has("a")) {
    //   moveToCell = entities.find(
    //     (cell) => cell.x === playerCell.x - 1 && cell.y === playerCell.y
    //   );

    //   this.keys.delete("a");
    // }

    // if (this.keys.has("s")) {
    //   moveToCell = entities.find(
    //     (cell) => cell.x === playerCell.x + 1 && cell.y === playerCell.y
    //   );

    //   this.keys.delete("s");
    // }

    // if (this.keys.has("d")) {
    //   moveToCell = entities.find(
    //     (cell) => cell.x === playerCell.x && cell.y === playerCell.y + 1
    //   );

    //   this.keys.delete("d");
    // }

    // if (moveToCell) {
    //   // @ts-ignore
    //   const player = playerCell.getEntity(Player1);

    //   if (!player) return;

    //   const newPlayerInstance = new Player1();

    //   moveToCell.addEntitys(newPlayerInstance);

    //   // @ts-ignore
    //   playerCell.removeEntity(Player1);
    // }
  }
}
