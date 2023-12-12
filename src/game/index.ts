import { mapPathConfig } from "../mapPathConfig";
import { Enemy } from "./enemy";
import { GameMap } from "./map";
import { Tower } from "./towers";
import { Bullet } from "./towers/bullet";
import { Collidor } from "./utils/collidor";
import { Game } from "./utils/game";

export class TowerDefenceGame extends Game {
  public readonly map: GameMap;
  private towers: Record<string, Tower> = {};

  constructor() {
    super(16 * 64, 12 * 64);
    this.map = new GameMap();

    this.map.load().then(() => {
      this.map.loadPathConfig(mapPathConfig);
      this.app.stage.addChild(this.map.getMapContainer());
      this.app.ticker.start();
    });
  }

  protected onTick(): void {}

  public start(): void {
    const numberOfEnemies = 10;

    for (let i = 0; i < numberOfEnemies; i++) {
      const enemy = new Enemy(
        this.map.getPathTiles(),
        this.map.getTexture("enemy")
      );

      setTimeout(() => {
        enemy.start();
      }, 250 * i);
    }
  }

  public createTower(x: number, y: number): void {
    const tower = new Tower(x, y);
    this.towers[tower.id] = tower;
  }

  private onEnemyCollision(
    collidor: Collidor,
    otherCollidors: Collidor[]
  ): void {
    const towerCollidors = otherCollidors.filter(
      (otherCollidor) =>
        otherCollidor.id.startsWith("tower") &&
        !otherCollidor.id.includes("bullet")
    );

    if (!towerCollidors.length) return;

    towerCollidors.forEach((towerCollidor) => {
      const [towerId] = towerCollidor.id.split("|");

      const tower = this.towers[towerId];

      if (!tower) return;

      tower.fire(collidor);
    });
  }

  protected onCollision(collidor: Collidor, otherCollidors: Collidor[]): void {
    if (otherCollidors.length === 0) return;

    const collidorType = this.collidorIdToType(collidor.id);

    switch (collidorType) {
      case "tower":
        // this.onTowerCollision(collidor, otherCollidors);
        break;
      case "enemy":
        this.onEnemyCollision(collidor, otherCollidors);
        break;
      case "bullet":
        this.onBulletCollision(collidor, otherCollidors);
        break;
      default:
        break;
    }
  }

  private onBulletCollision(
    collidor: Collidor,
    otherCollidors: Collidor[]
  ): void {
    const bullet = collidor as Bullet;

    if (!bullet) return;

    const enemyCollisions = otherCollidors.filter((otherCollidor) =>
      otherCollidor.id.startsWith("enemy")
    ) as Enemy[];

    if (bullet && enemyCollisions.length > 0) {
      console.log("hit enemy");
      enemyCollisions[0].health--;
      bullet.destroy();
    }
  }

  private collidorIdToType(id: string): "tower" | "enemy" | "bullet" | null {
    if (id.startsWith("tower") && id.includes("bullet")) {
      return "bullet";
    } else if (id.startsWith("tower")) {
      return "tower";
    } else if (id.startsWith("enemy")) {
      return "enemy";
    } else {
      return null;
    }
  }
}
