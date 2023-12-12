import { Graphics, Texture } from "pixi.js";
import { Collidor } from "../utils/collidor";

export class Bullet extends Collidor {
  private speed: number = 20;
  private timeAlive: number = 20;
  private timeAliveTimer: number = 0;
  private graphic: Graphics;
  private bulletAngle: number;

  constructor(x: number, y: number, angle: number, towerId: string) {
    super({
      idPrefix: `${towerId}|bullet`,
      x,
      y,
      width: 8,
      height: 8,
      hitboxesDimensions: [{ x: 1, y: 1, width: 6, height: 6 }],
      anchorPoints: { x: 0.5, y: 0.5 },
      hitboxColor: 0x0000ff,
    });

    this.graphic = new Graphics({
      fillStyle: 0xff0000,
    });
    this.graphic.circle(0, 0, 4);
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
