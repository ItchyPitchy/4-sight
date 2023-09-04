import CellEntity from "../Entity/CellEntity";
import Entity from "../Entity/Entity";

export default class Cell extends Entity {
  entities: CellEntity[] = [];

  constructor(
    readonly x: number,
    readonly y: number,
    readonly size: number,
    drawPosition: { x: number; y: number }
  ) {
    super(drawPosition);
  }

  getEntity<T extends CellEntity>(type: T) {
    for (const entity of this.entities) {
      // @ts-ignore
      if (entity instanceof type) {
        return entity;
      }
    }
  }

  addEntitys(...entities: CellEntity[]) {
    for (const entity of entities) {
      this.entities.push(entity);
    }
  }

  hasEntity<T extends CellEntity>(type: T) {
    for (const entity of this.entities) {
      // @ts-ignore
      if (entity instanceof type) {
        return true;
      }
    }
  }

  removeEntity<T extends CellEntity>(type: T) {
    this.entities = this.entities.filter(
      // @ts-ignore
      (entity) => !(entity instanceof type)
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    // draw the cell itself
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.strokeRect(
      this.drawPosition.x,
      this.drawPosition.y,
      this.size,
      this.size
    );
    ctx.stroke();
    ctx.closePath();

    // draw the entities inside the cell
    for (const entity of this.entities) {
      entity.draw(ctx, this.drawPosition, this.size);
    }
  }
}
