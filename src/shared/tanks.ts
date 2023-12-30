import { TileKey } from "./constants";

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

export const TANK_PROPERTIES: Record<Tanks, TankProperty> = {
  Normal: {
    name: "Normal Tank",
    cost: 100,
    damage: 1,
    range: 192,
    fireRate: 10,
    tiles: ["tankBody", "tankCannon"],
  },
  Powerful: {
    name: "Powerful Tank",
    cost: 120,
    damage: 4,
    range: 192,
    fireRate: 20,
    tiles: ["powerTankBody", "powerTankCannon"],
    cannonRotationOffset: -Math.PI / 2,
  },
  Fast: {
    name: "Fast Tank",
    cost: 80,
    damage: 0.5,
    range: 192,
    fireRate: 5,
    tiles: ["fastTankBody", "fastTankCannon"],
    cannonRotationOffset: -Math.PI / 2,
  },
  Sniper: {
    name: "Sniper Tank",
    cost: 180,
    damage: 3,
    range: 19200,
    fireRate: 40,
    tiles: ["sniperTankBody", "sniperTankCannon"],
  },
};
