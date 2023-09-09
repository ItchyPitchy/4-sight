import Entity from "../Entity/Entity";
import Player from "../Entity/Player";
import Player1 from "../Entity/Player1";
import Player2 from "../Entity/Player2";
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
    for (const player of entities) {
      if (!(player instanceof Player)) return;

      if (player instanceof Player1 && level.levelState === "PLAYER_1_TURN") {
        level.player1Turn.push({
          mousePos: game.mousePos,
          position: {
            x: player.position.x,
            y: player.position.y,
          },
          shoot: false,
        });
      } else if (
        player instanceof Player2 &&
        level.levelState === "PLAYER_2_TURN"
      ) {
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

    if (
      level.levelState === "PLAYER_1_TURN" ||
      level.levelState === "PLAYER_2_TURN"
    ) {
      level.playerTurnCount += dt;
    }

    if (level.playerTurnCount >= level.playerTurnTimer) {
      // Reset mouse position
      game.mousePos = { x: game.gameWidth / 2, y: game.gameHeight / 2 };

      if (level.levelState === "PLAYER_1_TURN") {
        level.levelState = "PLAYER_2_TURN";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 5;
        level.playerTurnCount = 0;
        level.buildLevel(game.gameWidth, game.gameHeight);
      } else if (level.levelState === "PLAYER_2_TURN") {
        level.levelState = "RESULT";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 5;
        level.playerTurnCount = 0;
        level.buildLevel(game.gameWidth, game.gameHeight);

        // Hacky as shit
        const minTurns = Math.min(
          level.player1Turn.length,
          level.player2Turn.length
        );

        level.player1Turn = level.player1Turn.filter(
          (_, index) => index < minTurns
        );
        level.player2Turn = level.player2Turn.filter(
          (_, index) => index < minTurns
        );

        level.player1CurrentPosition = level.player1Turn[minTurns - 1].position;
        level.player2CurrentPosition = level.player2Turn[minTurns - 1].position;
      }
    }

    if (level.levelState === "RESULT") {
      // Hacky as shit
      const minTurns = Math.min(
        level.player1Turn.length,
        level.player2Turn.length
      );

      const player1 = entities.find((entity) => entity instanceof Player1) as
        | Player1
        | undefined;
      const player2 = entities.find((entity) => entity instanceof Player2) as
        | Player2
        | undefined;

      if (
        (player1?.health && player1.health <= 0) ||
        (player2?.health && player2.health <= 0)
      ) {
        console.log("GAME OVER");
      }

      if (level.playerTurnCurrentIndex === minTurns - 1) {
        level.playerTurnCurrentIndex = 0;
        level.levelState = "PLAYER_1_TURN";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 5;
        level.playerTurnCount = 0;
        level.player1Turn = [];
        level.player2Turn = [];

        if (player1 && player2) {
          level.player1CurrentHealth = player1.health;
          level.player2CurrentHealth = player2.health;
        }

        level.buildLevel(game.gameWidth, game.gameHeight);
      }
    }
  }
}
