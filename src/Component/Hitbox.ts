import Component from "./Component";

export class Hitbox extends Component {
  constructor(readonly shape: "rectangle" | "point" | "circle") {
    super();
  }
}
