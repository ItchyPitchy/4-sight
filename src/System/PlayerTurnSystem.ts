import Entity from "../Entity/Entity";
import Player from "../Entity/Player";
import { Level } from "../Level/Level";
import Game from "../game";
import { System } from "./System";

export class PlayerTurnSystem extends System {
  constructor() {
    super();
  }

  appliesTo(entity: Entity) {
    return entity instanceof Player;
  }

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    const player = entities.find((entity) => entity instanceof Player);

    if (player) {
      if (level.levelState === "PLAYER_1_TURN") {
        level.player1Turn.push({
          mousePos: game.mousePos,
          position: {
            x: player.position.x,
            y: player.position.y,
          },
          shoot: false,
        });
      } else if (level.levelState === "PLAYER_2_TURN") {
        level.player2Turn.push({
          mousePos: game.mousePos,
          position: {
            x: player.position.x,
            y: player.position.y,
          },
          shoot: false,
        });
      }
    }

    level.playerTurnCount += dt;

    if (level.playerTurnTimer <= level.playerTurnCount) {
      if (level.player1Turn.length === 0) {
        level.levelState = "PLAYER_1_TURN";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 5;
        level.playerTurnCount = 0;
      } else if (level.player2Turn.length === 0) {
        level.levelState = "PLAYER_2_TURN";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 5;
        level.playerTurnCount = 0;
      } else {
        // Hacky as shit
        const minTurns = Math.min(
          level.player1Turn.length,
          level.player2Turn.length
        );

        if (level.levelState !== "RESULT") {
          level.player1Turn = level.player1Turn.filter(
            (_, index) => index < minTurns - 1
          );
          level.player2Turn = level.player2Turn.filter(
            (_, index) => index < minTurns - 1
          );

          level.levelState = "RESULT";
          game.gameStartCountDown = 3;
          game.gameState = "PAUSED";
          level.playerTurnTimer = 5;
          level.playerTurnCount = 0;
        } else if (
          level.levelState === "RESULT" &&
          level.playerTurnCurrentIndex === minTurns - 1
        ) {
          level.playerTurnCurrentIndex = 0;
          level.levelState = "PLAYER_1_TURN";
          game.gameStartCountDown = 3;
          game.gameState = "PAUSED";
          level.playerTurnTimer = 5;
          level.playerTurnCount = 0;
          level.player1Turn = [];
          level.player2Turn = [];
        }
      }

      level.buildLevel(game.gameWidth, game.gameHeight);
    }
  }
}
