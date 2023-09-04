import Component from "../Component/Component";
import Entity from "./Entity";

export default class CellEntity {
  components: Component[] = [];

  constructor() {}

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
  }

  removeComponent<T extends Component>(type: T) {
    this.components = this.components.filter(
      // @ts-ignore
      (component) => component instanceof type
    );
  }

  draw(
    ctx: CanvasRenderingContext2D,
    cellPosition: { x: number; y: number },
    cellSize: number
  ): void {}
}
