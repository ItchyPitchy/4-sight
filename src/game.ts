import { Level1 } from "./Level/Level1";
import Entity from "./Entity/Entity";

type GameState = "PAUSED" | "RUNNING";

export default class Game {
  level = new Level1(this);
  entities: Entity[] = [];
  keys = new Set<"leftClick">();
  gameState: GameState = "PAUSED";
  gameStartCountDown = 3;

  constructor(
    readonly gameWidth: number,
    readonly gameHeight: number,
    readonly mainCtx: CanvasRenderingContext2D,
    readonly shadowCtx: CanvasRenderingContext2D,
    readonly sightCtx: CanvasRenderingContext2D,
    public mousePos = { x: gameWidth / 2, y: gameHeight / 2 }
  ) {
    (
      document.querySelector("#gameScreen") as HTMLCanvasElement
    ).addEventListener("click", (e) => {
      this.keys.add("leftClick");
    });
    (
      document.querySelector("#gameScreen") as HTMLCanvasElement
    ).addEventListener("mousemove", (e) => {
      this.mousePos = {
        x: e.offsetX,
        y: e.offsetY,
      };
    });

    this.start();
  }

  start() {
    this.level.buildLevel(this.gameWidth, this.gameHeight);
  }

  update(dt: number) {
    if (this.gameState === "RUNNING") {
      this.level.update(dt, this);
    }

    if (this.gameState === "PAUSED" && this.gameStartCountDown > 0) {
      this.gameStartCountDown -= dt;
    }

    if (this.gameStartCountDown <= 0) {
      this.gameState = "RUNNING";
    }

    this.keys.delete("leftClick");
  }

  draw(
    mainCtx: CanvasRenderingContext2D,
    shadowCtx: CanvasRenderingContext2D,
    sightCtx: CanvasRenderingContext2D
  ) {
    this.level.draw(mainCtx, shadowCtx, sightCtx);

    if (this.gameState === "PAUSED") {
      mainCtx.save();

      mainCtx.fillStyle = "rgba(0,0,0,0.5)";
      mainCtx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      mainCtx.font = "30px Arial";
      mainCtx.fillStyle = "white";
      mainCtx.textAlign = "center";

      if (this.gameStartCountDown <= 1) {
        mainCtx.fillText("1", this.gameWidth / 2, this.gameHeight / 2);
      } else if (this.gameStartCountDown <= 2) {
        mainCtx.fillText("2", this.gameWidth / 2, this.gameHeight / 2);
      } else if (this.gameStartCountDown <= 3) {
        mainCtx.fillText("3", this.gameWidth / 2, this.gameHeight / 2);
      }

      mainCtx.restore();
    }
  }
}
