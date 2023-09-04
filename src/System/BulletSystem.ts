import { Vector } from "../Component/Vector";
import Bullet from "../Entity/Bullet";
import CellEntity from "../Entity/CellEntity";
import Entity from "../Entity/Entity";
import Game from "../game";

export default class BulletSystem {
  bullets: Bullet[] = [];

  constructor() {}

  addBullets(...bullets: Bullet[]) {
    this.bullets.push(...bullets);
  }

  update(entities: CellEntity[], dt: number, game: Game) {
    this.bullets = this.bullets.filter((bullet) => bullet.lifeLength > 0);

    for (const bullet of this.bullets) {
      const vector = bullet.getComponent(Vector);

      if (vector) {
        bullet.drawPosition.x += (vector as Vector).x * dt;
        bullet.drawPosition.y += (vector as Vector).y * dt;
      }

      // bullet.lifeLength -= dt;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const bullet of this.bullets) {
      bullet.draw(ctx);
    }
  }
}
