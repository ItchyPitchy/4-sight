import Game from "../game";
import { System } from "./System";
import { Level } from "../Level/Level";
import Entity from "../Entity/Entity";
import { Player1 } from "../Entity/Player1";
import Wall from "../Entity/Wall";
import LightSource from "../Component/LightSource";
import { Rectangle } from "../rectangle";
import { Segment } from "../segment";
import { loadMap } from "../load-map";
import { calculateVisibility } from "../visibility";
import { Point } from "../point";

export default class LightsourceSystem extends System {
  room: Rectangle | null = null;
  lightSource: Point | null = null;
  blocks: Rectangle[] = [];
  walls: Segment[] = [];
  visibility: Point[][] = [];

  constructor() {
    super();
  }

  appliesTo(entity: Entity) {
    return entity instanceof Wall || entity.hasComponent(LightSource);
  }

  update(entities: Entity[], dt: number, level: Level, game: Game) {
    const player = entities.find((entity) => entity instanceof Player1);
    const walls = entities.filter((entity) => entity instanceof Wall);

    if (!player) {
      this.lightSource = null;
      return;
    }

    // Setup scene
    this.room = new Rectangle(0, 0, game.gameWidth, game.gameHeight);

    this.walls = [];

    this.blocks = walls.map(
      (entity) =>
        new Rectangle(
          entity.position.x,
          entity.position.y,
          entity.size.width,
          entity.size.height
        )
    );

    // Test lightsource middle of map
    this.lightSource = new Point(player.position.x, player.position.y);

    const endpoints = loadMap(
      this.room,
      this.blocks,
      this.walls,
      this.lightSource
    );
    this.visibility = calculateVisibility(this.lightSource, endpoints);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.lightSource || !this.room) return;

    this.drawVisibilityTriangles(
      ctx,
      "gray",
      this.lightSource,
      this.visibility
    );

    for (const block of this.blocks) {
      this.drawRectangle(ctx, "blue", block);
    }

    for (const wall of this.walls) {
      this.drawSegment(ctx, "red", wall);
    }
  }

  drawRectangle(
    ctx: CanvasRenderingContext2D,
    color: string,
    rectangle: Rectangle
  ) {
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    ctx.restore();
  }

  drawSegment(ctx: CanvasRenderingContext2D, color: string, segment: Segment) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(segment.p1.x, segment.p1.y);
    ctx.lineTo(segment.p2.x, segment.p2.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  drawVisibilityTriangles(
    ctx: CanvasRenderingContext2D,
    color: string,
    lightSource: Point,
    visibilityOutput: Point[][]
  ) {
    ctx.save();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.room!.width, this.room!.height);

    ctx.globalCompositeOperation = "source-out";

    ctx.beginPath();

    for (const points of visibilityOutput) {
      ctx.moveTo(lightSource.x, lightSource.y);
      ctx.lineTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
    }

    ctx.clip();

    ctx.fillStyle = "transparent";
    ctx.fill();

    ctx.restore();
  }
}
