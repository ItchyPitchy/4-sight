interface Cell {
  x: number;
  y: number;
}

export default class Board {
  board: Array<Cell[]> = [];

  constructor(
    readonly size: number,
    readonly gameWidth: number,
    readonly gameHeight: number
  ) {}

  createBoard() {
    const board: Cell[][] = [];

    for (let i = 0; i < this.size; i++) {
      const row: Cell[] = [];

      for (let j = 0; j < this.size; j++) {
        const cell = {
          x: (this.gameWidth / (this.size + 1)) * i,
          y: (this.gameHeight / (this.size + 1)) * j,
        };

        row.push(cell);
      }

      board.push(row);
    }

    this.board = board;
  }

  draw(ctx: CanvasRenderingContext2D, gameHeight: number, gameWidth: number) {
    const cellWidth = this.gameWidth / (this.size + 1);
    const cellHeight = this.gameHeight / (this.size + 1); // HAcky

    console.log(this.board);

    for (const row of this.board) {
      for (const cell of row) {
        ctx.beginPath();

        ctx.strokeStyle = "#000";
        ctx.strokeRect(cell.x, cell.y, cellWidth, cellHeight);
        ctx.stroke();

        ctx.closePath();
      }
    }
  }
}
