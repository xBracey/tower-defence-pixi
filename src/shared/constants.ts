export const TILE_SIZE = 64;
export const MAP_WIDTH = 16;
export const MAP_HEIGHT = 12;
export const MAP_WIDTH_PX = MAP_WIDTH * TILE_SIZE;
export const MAP_HEIGHT_PX = MAP_HEIGHT * TILE_SIZE;

export const SPRITES: Record<TileKey, [number, number]> = {
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

export type TileKey =
  | "grassBottomRight"
  | "grassBottom"
  | "grassBottomLeft"
  | "grassRight"
  | "grass"
  | "grassLeft"
  | "grassTopRight"
  | "grassTop"
  | "grassTopLeft"
  | "path"
  | "tree"
  | "enemy"
  | "tankBody"
  | "tankCannon";
