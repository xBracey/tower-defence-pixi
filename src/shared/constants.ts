export const TILE_SIZE = 64;
export const SPRITESHEET_WIDTH = 23;
export const SPRITESHEET_HEIGHT = 13;
export const MAP_WIDTH = 16;
export const MAP_HEIGHT = 12;
export const MAP_WIDTH_PX = MAP_WIDTH * TILE_SIZE;
export const MAP_HEIGHT_PX = MAP_HEIGHT * TILE_SIZE;

export type Tanks = "Normal" | "Powerful" | "Fast" | "Sniper";
export type TankProperty = {
  name: string;
  cost: number;
  damage: number;
  range: number;
  fireRate: number;
  tiles: [TileKey, TileKey];
  cannonRotationOffset?: number;
};

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
  fastTankBody: [19, 7],
  fastTankCannon: [19, 8],
  powerTankBody: [20, 7],
  powerTankCannon: [19, 10],
  sniperTankBody: [16, 11],
  sniperTankCannon: [16, 12],
  bullet: [19, 11],
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
  | "tankCannon"
  | "fastTankBody"
  | "fastTankCannon"
  | "powerTankBody"
  | "powerTankCannon"
  | "sniperTankBody"
  | "sniperTankCannon"
  | "bullet";
