import { Assets, Spritesheet, Texture } from "pixi.js";
import { TileKey } from "./shared/constants";

const tileSize = 64;
const spritesheetWidth = 23 * tileSize;
const spritesheetHeight = 13 * tileSize;

export class Tilesheet {
  public spritesheet?: Spritesheet;
  public spritesheetLoaded: boolean = false;

  constructor() {
    const frames = this.constructSpritesheetFrames();

    const meta = {
      image: "../public/tower-defence/tilesheet.png",
      size: {
        w: spritesheetWidth,
        h: spritesheetHeight,
      },
      scale: "1",
      format: "RGBA8888",
    };

    Assets.load(meta.image).then((texture: Texture) => {
      this.spritesheet = new Spritesheet(texture, { frames, meta });

      this.spritesheet.parse().then(() => {
        this.spritesheetLoaded = true;
      });
    });
  }

  public getTexture(name: string): Texture {
    return this.spritesheet ? this.spritesheet.textures[name] : Texture.EMPTY;
  }

  private constructSpritesheetFrames() {
    const sprites: Record<TileKey, [number, number]> = {
      grassBottomRight: [0, 0],
      grassBottom: [1, 0],
      grassBottomLeft: [2, 0],
      grassRight: [1, 1],
      grass: [1, 1],
      grassLeft: [2, 1],
      grassTopRight: [0, 2],
      grassTop: [1, 2],
      grassTopLeft: [2, 2],
      path: [1, 4],
      tree: [15, 5],
      enemy: [15, 10],
      tankBody: [15, 11],
      tankCannon: [15, 12],
    };

    const frames = Object.entries(sprites).map(([name, [x, y]]) => {
      return {
        name,
        frame: {
          frame: {
            x: x * tileSize,
            y: y * tileSize,
            w: tileSize,
            h: tileSize,
          },
          spriteSourceSize: { x: 0, y: 0, w: tileSize, h: tileSize },
          sourceSize: { w: tileSize, h: tileSize },
          anchor: { x: tileSize / 2, y: tileSize / 2 },
        },
      };
    });

    return Object.fromEntries(frames.map(({ name, frame }) => [name, frame]));
  }
}
