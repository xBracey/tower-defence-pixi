import { TankProperty, Tanks } from "./constants";

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
    fireRate: 5,
    tiles: ["tankBody", "tankCannon"],
  },
  Fast: {
    name: "Fast Tank",
    cost: 80,
    damage: 0.5,
    range: 192,
    fireRate: 20,
    tiles: ["tankBody", "tankCannon"],
  },
  Sniper: {
    name: "Sniper Tank",
    cost: 180,
    damage: 3,
    range: 19200,
    fireRate: 2,
    tiles: ["tankBody", "tankCannon"],
  },
};
