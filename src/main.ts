import Game from "./game";

const mainCanvas = document.querySelector("#gameScreen") as HTMLCanvasElement;
const mainCtx = mainCanvas.getContext("2d") as CanvasRenderingContext2D;

mainCtx.imageSmoothingEnabled = true;
mainCtx.imageSmoothingQuality = "high";

const shadowCanvas = document.querySelector(
  "#shadowCanvas"
) as HTMLCanvasElement;
const shadowCtx = shadowCanvas.getContext("2d") as CanvasRenderingContext2D;
const sightCanvas = document.querySelector("#sightCanvas") as HTMLCanvasElement;
const sightCtx = sightCanvas.getContext("2d") as CanvasRenderingContext2D;
// ctx.imageSmoothingEnabled = true;
// ctx.imageSmoothingQuality = "high";

const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;

mainCanvas.width = GAME_WIDTH;
mainCanvas.height = GAME_HEIGHT;
shadowCanvas.width = GAME_WIDTH;
shadowCanvas.height = GAME_HEIGHT;
sightCanvas.width = GAME_WIDTH;
sightCanvas.height = GAME_HEIGHT;

const game = new Game(GAME_WIDTH, GAME_HEIGHT, mainCtx, shadowCtx, sightCtx);

let oldTimeStamp: number = 0;

function gameLoop(timestamp: number) {
  // dt i sekunder
  let dt = (timestamp - oldTimeStamp) / 1000;
  oldTimeStamp = timestamp;

  mainCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  shadowCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  sightCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(dt);
  game.draw(mainCtx, shadowCtx, sightCtx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
