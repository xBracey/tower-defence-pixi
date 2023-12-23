import { Assets, Spritesheet, Texture } from "pixi.js";
import {
  SPRITESHEET_HEIGHT,
  SPRITESHEET_WIDTH,
  TILE_SIZE,
  TileKey,
} from "./shared/constants";

const spritesheetWidth = SPRITESHEET_WIDTH * TILE_SIZE;
const spritesheetHeight = SPRITESHEET_HEIGHT * TILE_SIZE;

export class Tilesheet {
  public spritesheet?: Spritesheet;
  public spritesheetLoaded: boolean = false;

  constructor() {
    const frames = this.constructSpritesheetFrames();

    const meta = {
      image: "../public/tilesheet.png",
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
            x: x * TILE_SIZE,
            y: y * TILE_SIZE,
            w: TILE_SIZE,
            h: TILE_SIZE,
          },
          spriteSourceSize: { x: 0, y: 0, w: TILE_SIZE, h: TILE_SIZE },
          sourceSize: { w: TILE_SIZE, h: TILE_SIZE },
          anchor: { x: TILE_SIZE / 2, y: TILE_SIZE / 2 },
        },
      };
    });

    return Object.fromEntries(frames.map(({ name, frame }) => [name, frame]));
  }
}
