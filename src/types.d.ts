import { TowerDefenceGame } from "./game";

declare global {
  interface Window {
    Game: TowerDefenceGame;
  }
}

window.Game = window.Game || {};
