import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE } from "../shared/constants";
import { CollisionLogic } from "./collision";
import { Enemy } from "./enemy";
import { GameMap } from "./map";
import { maps } from "./map/maps";
import { TDMap, TDMapKey } from "./map/maps/types";
import { Tower } from "./towers";
import { Game } from "./utils/game";
import { IReactState, ReactState } from "./utils/state";

export class TowerDefenceGame extends Game {
  public readonly map: GameMap;
  public collisionChecker: CollisionLogic;
  public mapConfig: TDMap;
  public lives: ReactState<number>;
  public money: ReactState<number>;
  public round: ReactState<number>; // 0 indexed
  private state: "idle" | "round" = "idle";
  private enemies: Enemy[] = [];

  constructor(
    mapKey: TDMapKey,
    lives: IReactState<number>,
    money: IReactState<number>,
    round: IReactState<number>
  ) {
    super(MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
    this.mapConfig = maps[mapKey];

    this.collisionChecker = new CollisionLogic();
    this.map = new GameMap();
    this.lives = new ReactState<number>(lives);
    this.money = new ReactState<number>(money);
    this.round = new ReactState<number>(round);

    this.map.load().then(() => {
      this.map.loadPathConfig(this.mapConfig.config);
      this.app.stage.addChild(this.map.getMapContainer());
      this.app.ticker.start();
      this.app.ticker.add(this.onTick.bind(this));
    });
  }

  protected onTick(): void {
    super.onTick();

    const enemiesStillAlive = this.enemies.some((enemy) => enemy.health > 0);

    console.log({ enemiesStillAlive }, this.state);

    if (this.state === "idle") {
      return;
    }

    if (!enemiesStillAlive) {
      this.state = "idle";

      if (this.round.state === this.mapConfig.rounds.length - 1) {
        this.round.updateState(0);
      } else {
        this.round.updateState(this.round.state + 1);
      }
    }
  }

  public startRound(): void {
    if (this.state === "round") return;
    this.state = "round";

    const { numberOfEnemies, timeBetweenSpawns } =
      this.mapConfig.rounds[this.round.state];

    for (let i = 0; i < numberOfEnemies; i++) {
      const enemy = new Enemy(
        this.map.getPathTiles(),
        this.map.getTexture("enemy")
      );

      this.enemies.push(enemy);

      setTimeout(() => {
        enemy.start();
      }, timeBetweenSpawns(i) * i);
    }
  }

  public createTower(x: number, y: number): void {
    const tower = new Tower(x, y);
    this.collisionChecker.addTower(tower);
  }
}
