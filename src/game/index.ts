import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE } from "../shared/constants";
import { Tanks } from "../shared/tanks";
import { GameActions, GameState } from "../zustand/game/reducer";
import { CollisionLogic } from "./collision";
import { Enemy } from "./enemy";
import { GameMap } from "./map";
import { maps } from "./map/maps";
import { TDMap, TDMapKey } from "./map/maps/types";
import { Tower } from "./towers";
import { Game } from "./utils/game";
import { sound } from "@pixi/sound";

export class TowerDefenceGame extends Game {
  public readonly map: GameMap;
  public collisionChecker: CollisionLogic;
  public mapConfig: TDMap;
  public gameState: GameState;
  public gameStateDispatch: React.Dispatch<GameActions>;
  private state: "idle" | "round" = "idle";
  private enemies: Enemy[] = [];

  constructor(
    mapKey: TDMapKey,
    gameState: GameState,
    gameStateDispatch: React.Dispatch<GameActions>
  ) {
    super(MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
    this.mapConfig = maps[mapKey];

    this.collisionChecker = new CollisionLogic();
    this.map = new GameMap();
    this.gameState = gameState;
    this.gameStateDispatch = gameStateDispatch;

    this.map.load().then(() => {
      this.map.loadPathConfig(this.mapConfig.config);
      this.app.stage.addChild(this.map.getMapContainer());
      this.app.ticker.start();
      this.app.ticker.add(this.onTick.bind(this));
    });

    sound.add("shoot", "tank.wav");
  }

  protected onTick(): void {
    super.onTick();

    const enemiesStillAlive = this.enemies.some((enemy) => enemy.health > 0);

    if (this.state === "idle") {
      return;
    }

    if (!enemiesStillAlive) {
      this.state = "idle";

      if (this.gameState.round === this.mapConfig.rounds.length - 1) {
        this.gameStateDispatch({ type: "END_GAME" });
      } else {
        this.gameStateDispatch({ type: "FINISHED_ROUND" });
      }
    }
  }

  public startRound(): void {
    if (this.state === "round") return;
    this.state = "round";

    const { time, enemyBatch } = this.mapConfig.rounds[this.gameState.round];

    let timeDelay = 0;

    for (let i = 0; i < enemyBatch.length; i++) {
      const batch = enemyBatch[i];

      for (let j = 0; j < batch.num; j++) {
        const enemy = new Enemy(
          this.map.getPathTiles(),
          this.map.getTexture("enemy"),
          batch.enemy
        );

        this.enemies.push(enemy);

        setTimeout(() => {
          enemy.start();
        }, timeDelay);

        timeDelay += batch.time;
      }

      timeDelay += time;
    }
  }

  public createTower(x: number, y: number, type: Tanks): void {
    const tower = new Tower(x, y, type);
    this.collisionChecker.addTower(tower);
  }

  public removeTower(id: string): void {
    this.collisionChecker.removeTower(id);
  }

  public updateState(state: GameState): void {
    this.gameState = state;
  }
}
