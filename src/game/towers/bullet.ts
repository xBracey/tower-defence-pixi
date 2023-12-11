import { Graphics, Texture } from "pixi.js";
import { Collidor } from "../utils/collidor";

export class Bullet extends Collidor {
  private speed: number = 20;
  private timeAlive: number = 20;
  private timeAliveTimer: number = 0;
  private graphic: Graphics;

  constructor(x: number, y: number, angle: number, towerId: string) {
    super({
      idPrefix: `${towerId}|bullet`,
      x,
      y,
      rotation: angle,
      width: 8,
      height: 8,
      hitboxesDimensions: [{ x: 0, y: 0, width: 8, height: 8 }],
      anchorPoints: { x: 0.5, y: 0.5 },
      hitboxColor: 0x0000ff,
    });

    this.graphic = new Graphics({
      fillStyle: 0xff0000,
    });
    this.graphic.circle(0, 0, 4);
    this.graphic.fill(0xff0000);
    this.addChild(this.graphic);
  }

  public onTick(): void {
    super.onTick();

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
    this.graphic.destroy();
  }
}
