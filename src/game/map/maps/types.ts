import { TileKey } from "../../../shared/constants";

export type TDMapDecoration = {
  x: number;
  y: number;
  texture: TileKey;
};

export type TDMapEnemyConfig = {
  numberOfEnemies: number;
  timeBetweenSpawns: (index: number) => number;
};

export type TDMap = {
  config: [number, number][];
  decorations: TDMapDecoration[];
  rounds: TDMapEnemyConfig[];
};

export type TDMapKey = "map1";
