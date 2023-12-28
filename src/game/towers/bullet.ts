import { Graphics, Texture } from "pixi.js";
import { Collidor } from "../utils/collidor";

export class Bullet extends Collidor {
  private speed: number = 20;
  private timeAlive: number = 100;
  private timeAliveTimer: number = 0;
  private graphic: Graphics;
  private bulletAngle: number;
  public damage: number;

  constructor(
    x: number,
    y: number,
    angle: number,
    towerId: string,
    damage: number
  ) {
    super({
      idPrefix: `${towerId}|bullet`,
      x,
      y,
      width: 12,
      height: 12,
      hitboxesDimensions: [{ x: 2, y: 2, width: 8, height: 8 }],
      anchorPoints: { x: 0.5, y: 0.5 },
      hitboxColor: 0x0000ff,
    });

    this.damage = damage;
    this.graphic = new Graphics({
      fillStyle: 0xff0000,
    });
    this.graphic.circle(0, 0, 6);
    this.graphic.fill(0xff0000);
    this.addChild(this.graphic);
    this.bulletAngle = angle;
  }

  public onTick(): void {
    super.onTick();

    if (this.timeAliveTimer > this.timeAlive) {
      this.destroy();
      return;
    }

    const x = Math.cos(this.bulletAngle) * this.speed;
    const y = Math.sin(this.bulletAngle) * this.speed;

    this.translate(x, y);
    this.timeAliveTimer++;
  }

  public destroy(): void {
    super.destroy();
    this.graphic.destroy();
  }
}
