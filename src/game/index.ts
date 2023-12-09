import { mapPathConfig } from "../mapPathConfig";
import { Enemy } from "./enemy";
import { GameMap } from "./map";
import { Tower } from "./towers";
import { Entity } from "./utils/entity";
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

  private onTowerCollision(entity: Entity, otherEntities: Entity[]): void {
    const [towerId] = entity.id.split("|");

    const tower = this.towers[towerId];

    if (!tower) return;

    const enemyCollisions = otherEntities.filter((otherEntity) =>
      otherEntity.id.startsWith("enemy")
    );

    if (tower && enemyCollisions.length > 0) {
      tower.fire(enemyCollisions[0]);
    }
  }

  protected onCollision(entity: Entity, otherEntities: Entity[]): void {
    const entityType = this.entityIdToType(entity.id);

    console.log({ entityType });

    switch (entityType) {
      case "tower":
        this.onTowerCollision(entity, otherEntities);
        break;
      case "enemy":
        // this.onEnemyCollision(entity, otherEntities);
        break;
      case "bullet":
        // this.onBulletCollision(entity, otherEntities));
        break;
      default:
        break;
    }
  }

  private entityIdToType(id: string): "tower" | "enemy" | "bullet" | null {
    if (id.startsWith("tower")) {
      return "tower";
    } else if (id.startsWith("enemy")) {
      return "enemy";
    } else if (id.startsWith("bullet")) {
      return "bullet";
    } else {
      return null;
    }
  }
}
