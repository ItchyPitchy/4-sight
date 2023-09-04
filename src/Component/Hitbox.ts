import Component from "./Component";

// Exoects the hitbox to be square shaped
export class Hitbox extends Component {
  constructor(
    public drawPosition: { x: number; y: number },
    public size: number
  ) {
    super();
  }
}
