import { TDMapEnemyConfig } from "../types";

export const rounds: TDMapEnemyConfig[] = [
  {
    numberOfEnemies: 10,
    timeBetweenSpawns: () => 1000,
  },
  {
    numberOfEnemies: 20,
    timeBetweenSpawns: () => 800,
  },
  {
    numberOfEnemies: 30,
    timeBetweenSpawns: () => 600,
  },
  {
    numberOfEnemies: 40,
    timeBetweenSpawns: () => 400,
  },
  {
    numberOfEnemies: 50,
    timeBetweenSpawns: () => 200,
  },
];
