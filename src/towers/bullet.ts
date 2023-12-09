import { Circle, Graphics, Texture } from "pixi.js";
import { Entity } from "../utils/entity";

export class Bullet extends Entity {
  private speed: number = 8;
  private onDestroyBullet: (id: string) => void;

  constructor(
    onDestroyBullet: (id: string) => void,
    x: number,
    y: number,
    angle: number
  ) {
    const graphic = new Graphics();
    graphic.circle(0, 0, 4);

    super({ texture: Texture.WHITE, idPrefix: "bullet" });
    this.onDestroyBullet = onDestroyBullet;
    this.x = x;
    this.y = y;
    this.anchor.set(0.5, 0.5);
    this.rotation = angle;
  }

  public onTick(): void {
    const x = Math.cos(this.rotation) * this.speed;
    const y = Math.sin(this.rotation) * this.speed;

    this.translate(x, y);
  }

  public onCollision(id: string, otherIds: string[]): void {
    if (otherIds.includes(id)) {
      this.onDestroyBullet(this.id);
      this.destroy();
    }
  }
}
