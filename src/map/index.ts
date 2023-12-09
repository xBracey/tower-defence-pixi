import { Container, Sprite, Texture } from "pixi.js";
import { Tilesheet } from "../tilesheet";
import { MAP_HEIGHT, MAP_WIDTH, TileKey } from "../shared/constants";

const defaultTile: TileKey = "grass";

// None is only used for the end tile
type PathDirection = "up" | "down" | "left" | "right" | "none";

export interface PathTile {
  x: number;
  y: number;
  direction: PathDirection;
}

export class Map {
  private tilesheet: Tilesheet;
  private tiles: TileKey[][];
  private pathTiles: PathTile[] = [];

  constructor() {
    this.tilesheet = new Tilesheet();
    this.tiles = [];
  }

  public async load(): Promise<void> {
    return new Promise((resolve) => {
      setInterval(() => {
        if (this.tilesheet.spritesheetLoaded) {
          for (let x = 0; x < MAP_WIDTH; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < MAP_HEIGHT; y++) {
              this.tiles[x][y] = defaultTile;
            }
          }
          resolve();
        }
      }, 250);
    });
  }

  public getPathTiles(): PathTile[] {
    return this.pathTiles;
  }

  public getTexture(tile: TileKey): Texture {
    return this.tilesheet.getTexture(tile);
  }

  public getMapContainer(): Container {
    const container = new Container();

    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        const tile = this.tiles[x][y];
        const texture = this.tilesheet.getTexture(tile);
        const sprite = new Sprite(texture);

        sprite.x = x * 64;
        sprite.y = y * 64;
        sprite.anchor.set(0, 0);
        container.addChild(sprite);
      }
    }

    return container;
  }

  public loadPathConfig(config: [number, number][]): PathTile[] {
    this.pathTiles = config.map((tile, index) => {
      if (index === 0) {
        return {
          x: tile[0],
          y: tile[1],
          direction: this.getStartingTileDirection(tile),
        };
      }

      if (index === config.length - 1) {
        return {
          x: tile[0],
          y: tile[1],
          direction: "none",
        };
      }

      const nextTile = config[index - 1];
      const direction = this.getPathDirection(tile, nextTile);

      return {
        x: tile[0],
        y: tile[1],
        direction,
      };
    });

    for (let index = 0; index < this.pathTiles.length; index++) {
      const pathTile = this.pathTiles[index];

      if (pathTile.direction && this.tiles[pathTile.x])
        this.tiles[pathTile.x][pathTile.y] = "path";
    }

    return this.pathTiles;
  }

  private getPathDirection(
    tile: [number, number],
    nextTile: [number, number]
  ): PathDirection {
    if (tile[0] === nextTile[0]) {
      if (tile[1] + 1 === nextTile[1]) {
        return "down";
      } else if (tile[1] - 1 === nextTile[1]) {
        return "up";
      }
    } else if (tile[1] === nextTile[1]) {
      if (tile[0] + 1 === nextTile[0]) {
        return "right";
      } else if (tile[0] - 1 === nextTile[0]) {
        return "left";
      }
    }

    throw new Error("Tile is not adjacent to the previous tile");
  }

  private getStartingTileDirection(tile: [number, number]): PathDirection {
    if (tile[0] === 0) {
      return "right";
    } else if (tile[0] === MAP_WIDTH - 1) {
      return "left";
    } else if (tile[1] === 0) {
      return "down";
    } else if (tile[1] === MAP_HEIGHT - 1) {
      return "up";
    } else {
      throw new Error("Starting tile is not on the edge of the map");
    }
  }
}
