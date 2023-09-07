import { EndPoint } from "./end-point";

export class Segment {
  public p1: EndPoint;
  public p2: EndPoint;
  public d: number = 0;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.p1 = new EndPoint(x1, y1);
    this.p2 = new EndPoint(x2, y2);
    this.p1.segment = this;
    this.p2.segment = this;
  }
}
