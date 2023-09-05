import { Level } from "./Level";

export class Level1 extends Level {
  constructor() {
    const structure = [
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0],
      [1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    ];

    super(structure);
  }
}
