import Component from "../Component/Component";

export default class Entity {
  components: Component[] = [];

  constructor(
    public position: { x: number; y: number },
    readonly size: { width: number; height: number }
  ) {}

  distanceTo(entity: Entity) {
    return Math.sqrt(
      Math.pow(this.position.x - entity.position.x, 2) +
        Math.pow(this.position.y - entity.position.y, 2)
    );
  }

  getComponent(type: Component) {
    for (const component of this.components) {
      // @ts-ignore
      if (component instanceof type) {
        // @ts-ignore
        return component;
      }
    }
  }

  addComponents(...components: Component[]) {
    for (const component of components) {
      this.components.push(component);
    }
  }

  hasComponent<T extends Component>(type: T) {
    for (const component of this.components) {
      // @ts-ignore
      if (component instanceof type) {
        return true;
      }
    }

    return false;
  }

  removeComponent<T extends Component>(type: T) {
    this.components = this.components.filter(
      // @ts-ignore
      (component) => component instanceof type
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    throw new Error("Not implemented yet");
  }
}
