import Bullet from "../Entity/Bullet";

export default class BulletSystem {
  bullets: Bullet[] = [];

  constructor() {}

  addBullets(...bullets: Bullet[]) {
    this.bullets.push(...bullets);
  }

  update(dt: number) {
    console.log(this.bullets);
    this.bullets = this.bullets.filter((bullet) => bullet.lifeLength > 0);

    for (const bullet of this.bullets) {
      bullet.lifeLength -= dt;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const bullet of this.bullets) {
      bullet.draw(ctx);
    }
  }
}
