import Entity from "../Entity/Entity";
import Player from "../Entity/Player";
import Player1 from "../Entity/Player1";
import Player2 from "../Entity/Player2";
import Player3 from "../Entity/Player3";
import Player4 from "../Entity/Player4";
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
      } else if (
        player instanceof Player3 &&
        level.levelState === "PLAYER_3_TURN"
      ) {
        level.player3Turn.push({
          mousePos: game.mousePos,
          position: {
            x: player.position.x,
            y: player.position.y,
          },
          shoot: false,
        });
      } else if (
        player instanceof Player4 &&
        level.levelState === "PLAYER_4_TURN"
      ) {
        level.player4Turn.push({
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
      level.levelState === "PLAYER_2_TURN" ||
      level.levelState === "PLAYER_3_TURN" ||
      level.levelState === "PLAYER_4_TURN"
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
        level.playerTurnTimer = 15;
        level.playerTurnCount = 0;
        level.buildLevel(game.gameWidth, game.gameHeight);
      } else if (level.levelState === "PLAYER_2_TURN") {
        level.levelState = "PLAYER_3_TURN";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 15;
        level.playerTurnCount = 0;
        level.buildLevel(game.gameWidth, game.gameHeight);
      } else if (level.levelState === "PLAYER_3_TURN") {
        level.levelState = "PLAYER_4_TURN";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 15;
        level.playerTurnCount = 0;
        level.buildLevel(game.gameWidth, game.gameHeight);
      } else if (level.levelState === "PLAYER_4_TURN") {
        level.levelState = "RESULT";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 15;
        level.playerTurnCount = 0;
        level.buildLevel(game.gameWidth, game.gameHeight);

        // Hacky as shit
        const minTurns = Math.min(
          level.player1Turn.length,
          level.player2Turn.length,
          level.player3Turn.length,
          level.player4Turn.length
        );

        level.player1Turn = level.player1Turn.filter(
          (_, index) => index < minTurns
        );
        level.player2Turn = level.player2Turn.filter(
          (_, index) => index < minTurns
        );
        level.player3Turn = level.player3Turn.filter(
          (_, index) => index < minTurns
        );
        level.player4Turn = level.player4Turn.filter(
          (_, index) => index < minTurns
        );

        level.player1CurrentPosition = level.player1Turn[minTurns - 1].position;
        level.player2CurrentPosition = level.player2Turn[minTurns - 1].position;
        level.player3CurrentPosition = level.player3Turn[minTurns - 1].position;
        level.player4CurrentPosition = level.player4Turn[minTurns - 1].position;
      }
    }

    if (level.levelState === "RESULT") {
      // Hacky as shit
      const minTurns = Math.min(
        level.player1Turn.length,
        level.player2Turn.length,
        level.player3Turn.length,
        level.player4Turn.length
      );

      const player1 = entities.find((entity) => entity instanceof Player1) as
        | Player1
        | undefined;
      const player2 = entities.find((entity) => entity instanceof Player2) as
        | Player2
        | undefined;
      const player3 = entities.find((entity) => entity instanceof Player3) as
        | Player3
        | undefined;
      const player4 = entities.find((entity) => entity instanceof Player4) as
        | Player4
        | undefined;
      if (
        (player1?.health && player1.health <= 0) ||
        (player2?.health && player2.health <= 0) ||
        (player3?.health && player3.health <= 0) ||
        (player4?.health && player4.health <= 0)
      ) {
        console.log("GAME OVER");
      }

      if (level.playerTurnCurrentIndex === minTurns - 1) {
        level.playerTurnCurrentIndex = 0;
        level.levelState = "PLAYER_1_TURN";
        game.gameStartCountDown = 3;
        game.gameState = "PAUSED";
        level.playerTurnTimer = 15;
        level.playerTurnCount = 0;
        level.player1Turn = [];
        level.player2Turn = [];
        level.player3Turn = [];
        level.player4Turn = [];

        if (player1 && player2 && player3 && player4) {
          level.player1CurrentHealth = player1.health;
          level.player2CurrentHealth = player2.health;
          level.player3CurrentHealth = player3.health;
          level.player4CurrentHealth = player4.health;
        }

        level.buildLevel(game.gameWidth, game.gameHeight);
      }
    }
  }
}
