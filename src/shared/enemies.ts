import { TileKey } from "./constants";

export type Enemies = "Normal" | "Tank" | "Fast";
export type EnemyProperty = {
  name: string;
  health: number;
  speed: number;
  tile: TileKey;
};

export const ENEMY_PROPERTIES: Record<Enemies, EnemyProperty> = {
  Normal: {
    name: "Normal Enemy",
    health: 5,
    speed: 2,
    tile: "enemy",
  },
  Tank: {
    name: "Tank Enemy",
    health: 10,
    speed: 1,
    tile: "tankEnemy",
  },
  Fast: {
    name: "Fast Enemy",
    health: 2,
    speed: 4,
    tile: "fastEnemy",
  },
};
