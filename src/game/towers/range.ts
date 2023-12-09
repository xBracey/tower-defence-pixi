import { Texture } from "pixi.js";
import { Entity } from "../utils/entity";

export class TowerRange extends Entity {
  constructor(range: number, id: string) {
    super({
      texture: Texture.EMPTY,
      width: range,
      height: range,
      x: 0,
      y: 0,
      idPrefix: `${id}|tower-range`,
      collisionCheck: true,
    });

    this.anchor.set(0.5, 0.5);
  }
}
