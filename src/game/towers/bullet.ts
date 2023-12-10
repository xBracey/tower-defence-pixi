import { Graphics, Texture } from "pixi.js";
import { Entity } from "../utils/entity";

export class Bullet extends Entity {
  private speed: number = 20;
  private timeAlive: number = 20;
  private timeAliveTimer: number = 0;
  private isDestroyed: boolean = false;

  constructor(x: number, y: number, angle: number, towerId: string) {
    const graphic = new Graphics({
      fillStyle: 0xff0000,
    });
    graphic.circle(0, 0, 4);
    graphic.fill(0xff0000);
    const texture = window.Game.app.renderer.generateTexture(graphic);

    super({
      texture,
      idPrefix: `${towerId}|bullet`,
      collisionCheck: true,
      x,
      y,
      rotation: angle,
      width: 8,
      height: 8,
    });
    this.anchor.set(0.5, 0.5);
  }

  public onTick(): void {
    super.onTick();

    if (this.isDestroyed) {
      return;
    }

    if (this.timeAliveTimer > this.timeAlive) {
      this.destroy();
      return;
    }

    const x = Math.cos(this.rotation) * this.speed;
    const y = Math.sin(this.rotation) * this.speed;

    this.translate(x, y);
    this.timeAliveTimer++;
  }

  public destroy(): void {
    super.destroy();
    this.isDestroyed = true;
  }
}
