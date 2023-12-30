import { EnemyBatch, TDMapEnemyConfig } from "../types";

const enemyBatches: EnemyBatch[] = [
  { enemy: "Normal", num: 10, time: 500 }, // 0
  { enemy: "Normal", num: 20, time: 300 }, // 1
  { enemy: "Tank", num: 10, time: 500 }, // 2
  { enemy: "Tank", num: 20, time: 300 }, // 3
  { enemy: "Fast", num: 10, time: 500 }, // 4
  { enemy: "Fast", num: 20, time: 300 }, // 5
  { enemy: "Normal", num: 5, time: 100 }, // 6
  { enemy: "Tank", num: 5, time: 100 }, // 7
  { enemy: "Fast", num: 5, time: 100 }, // 8
];

export const getBatches = (indexes: number[]): EnemyBatch[] => {
  return indexes.map((index) => enemyBatches[index]);
};

export const rounds: TDMapEnemyConfig[] = [
  { time: 500, enemyBatch: getBatches([0]) }, // 0
  { time: 400, enemyBatch: getBatches([0, 1]) }, // 1
  { time: 300, enemyBatch: getBatches([2]) }, // 2
  { time: 200, enemyBatch: getBatches([2, 4]) }, // 3
  { time: 200, enemyBatch: getBatches([3, 5]) }, // 4
  { time: 200, enemyBatch: getBatches([3, 4, 5]) }, // 5
  { time: 200, enemyBatch: getBatches([6, 3, 5]) }, // 6
  { time: 200, enemyBatch: getBatches([6, 7, 4]) }, // 7
  { time: 200, enemyBatch: getBatches([6, 7, 4]) }, // 8
  { time: 200, enemyBatch: getBatches([6, 7, 8, 5]) }, // 9
  { time: 200, enemyBatch: getBatches([6, 7, 8, 6, 7, 8]) }, // 10
  { time: 100, enemyBatch: getBatches([6, 7, 8, 6, 7, 8, 3, 5]) }, // 11
];
