import Entity from "../Entity/Entity";

export default class Cell extends Entity {
  entities: Entity[] = [];

  constructor(
    readonly x: number,
    readonly y: number,
    readonly size: number,
    readonly drawX: number,
    readonly drawY: number
  ) {
    super();
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }
}
