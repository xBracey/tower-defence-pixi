import { Assets, Spritesheet, Texture } from "pixi.js";
import {
  SPRITES,
  SPRITESHEET_HEIGHT,
  SPRITESHEET_WIDTH,
  TILE_SIZE,
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
    const frames = Object.entries(SPRITES).map(([name, [x, y]]) => {
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
