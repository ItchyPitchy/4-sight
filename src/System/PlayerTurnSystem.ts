import Entity from "../Entity/Entity";
import { Player1 } from "../Entity/Player1";
import { Level } from "../Level/Level";
import Game from "../game";
import { System } from "./System";

export class PlayerTurnSystem extends System {
  constructor() {
    super();
  }

  appliesTo(entity: Entity) {
    return entity instanceof Player1;
  }

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    const player1 = entities.find((entity) => entity instanceof Player1);

    if (!player1) return;

    level.player1Turn.push({
      mousePos: game.mousePos,
      position: player1.position,
      shoot: false,
    });
  }
}
