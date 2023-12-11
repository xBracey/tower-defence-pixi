import { Texture } from "pixi.js";
import { Collidor } from "../utils/collidor";

export class TowerRange extends Collidor {
  constructor(range: number, id: string) {
    super({
      texture: Texture.EMPTY,
      width: range,
      height: range,
      x: 0,
      y: 0,
      idPrefix: `${id}|tower-range`,
      collisionCheck: true,
      hitboxesDimensions: [{ x: 0, y: 0, width: range, height: range }],
      anchorPoints: { x: 0.5, y: 0.5 },
      hitboxColor: 0x00ff00,
    });
  }
}
