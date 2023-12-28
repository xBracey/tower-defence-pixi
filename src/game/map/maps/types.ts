import { TileKey } from "../../../shared/constants";

export type TDMapDecoration = {
  x: number;
  y: number;
  texture: TileKey;
};

export type TDMapEnemyConfig = {
  num: number;
  time: number;
};

export type TDMap = {
  config: [number, number][];
  decorations: TDMapDecoration[];
  rounds: TDMapEnemyConfig[];
};

export type TDMapKey = "map1";
