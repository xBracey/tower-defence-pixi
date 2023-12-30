import { TileKey } from "../../../shared/constants";
import { Enemies } from "../../../shared/enemies";

export type EnemyBatch = {
  enemy: Enemies;
  num: number;
  time: number;
};

export type TDMapDecoration = {
  x: number;
  y: number;
  texture: TileKey;
};

export type TDMapEnemyConfig = {
  time: number;
  enemyBatch: EnemyBatch[];
};

export type TDMap = {
  config: [number, number][];
  decorations: TDMapDecoration[];
  rounds: TDMapEnemyConfig[];
};

export type TDMapKey = "map1";
