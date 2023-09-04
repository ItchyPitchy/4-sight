import Component from "./Component";

export class Vector extends Component {
  constructor(public x: number, public y: number) {
    super();
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  dot(vector: Vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  norm() {
    return {
      x: this.x / this.magnitude(),
      y: this.y / this.magnitude(),
    };
  }

  normalize() {
    const norm = this.norm();

    return new Vector(norm.x, norm.y);
  }
}
