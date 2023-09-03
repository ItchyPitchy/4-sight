import Game from "./game";

const canvas = document.querySelector("#gameScreen") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
// ctx.imageSmoothingEnabled = true;
// ctx.imageSmoothingQuality = "high";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;

const game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);

let oldTimeStamp: number = 0;

function gameLoop(timestamp: number) {
  // dt i sekunder
  let dt = (timestamp - oldTimeStamp) / 1000;
  oldTimeStamp = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(dt);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
