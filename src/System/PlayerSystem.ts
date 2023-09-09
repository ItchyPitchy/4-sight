import Game from "../game";
import { Level } from "../Level/Level";
import { System } from "./System";
import Entity from "../Entity/Entity";
import Player from "../Entity/Player";
import Player1 from "../Entity/Player1";
import Player2 from "../Entity/Player2";

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

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    for (const entity of entities) {
      if (level.levelState === "RESULT") {
        if (entity instanceof Player1) {
          if (!level.player1Turn[level.playerTurnCurrentIndex]) {
            console.log(level.player1Turn);
          }
          entity.position =
            level.player1Turn[level.playerTurnCurrentIndex].position;
        } else if (entity instanceof Player2) {
          entity.position =
            level.player2Turn[level.playerTurnCurrentIndex].position;
        }
      } else if (
        level.levelState === "PLAYER_1_TURN" ||
        level.levelState === "PLAYER_2_TURN"
      ) {
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
    }
  }
}
