import { Enemy } from "./enemy";
import { Map } from "./map";
import { mapPathConfig } from "./mapPathConfig";
import { Tower } from "./towers";
import { EntityGroup } from "./utils/entityGroup";
import { PixiBase } from "./utils/pixi";

export class TowerDefenceGame {
  private readonly app: PixiBase;
  private readonly map: Map;
  private readonly enemies: Record<string, Enemy>;
  private readonly towers: Record<string, Tower>;
  private readonly entityGroup: EntityGroup;

  constructor() {
    this.app = new PixiBase(16 * 64, 12 * 64);
    this.map = new Map();
    this.enemies = {};
    this.towers = {};
    this.entityGroup = new EntityGroup(this.onCollision.bind(this));

    this.map.load().then(() => {
      this.map.loadPathConfig(mapPathConfig);
      this.app.stage.addChild(this.map.getMapContainer());
      this.app.ticker.start();
      this.app.ticker.add(this.onTick.bind(this));
    });
  }

  public onTick(): void {
    Object.values(this.towers).forEach((tower) => {
      this.entityGroup.onCheckCollision(tower.rangeEntity.id);
    });
  }

  public addToDOM(element: HTMLElement): void {
    this.app.addToDOM(element);
  }

  private onDestroyEnemy(id: string): void {
    delete this.enemies[id];
  }

  public start(): void {
    const numberOfEnemies = 10;

    for (let i = 0; i < numberOfEnemies; i++) {
      const enemy = new Enemy(
        this.map.getPathTiles(),
        this.map.getTexture("enemy"),
        this.onDestroyEnemy.bind(this)
      );
      this.app.stage.addChild(enemy);
      this.app.ticker.add(enemy.onTick.bind(enemy));
      this.enemies[enemy.id] = enemy;
      this.entityGroup.add(enemy);

      setTimeout(() => {
        enemy.start();
      }, 250 * i);
    }
  }

  public createTower(x: number, y: number): void {
    const tower = new Tower(
      this.map.getTexture("tankBody"),
      this.map.getTexture("tankCannon"),
      x,
      y
    );
    this.app.stage.addChild(tower);
    this.towers[tower.id] = tower;
    this.entityGroup.add(tower.rangeEntity);
  }

  private onCollision(id: string, otherIds: string[]): void {
    const tower = this.towers[id];

    const enemyCollisions = otherIds
      .filter((otherId) => {
        return this.enemies[otherId];
      })
      .map((otherId) => {
        return this.enemies[otherId];
      });

    if (tower && enemyCollisions.length > 0) {
      tower.fire(enemyCollisions[0]);
    }
  }
}
