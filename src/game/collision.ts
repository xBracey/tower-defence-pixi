import { Enemy } from "./enemy";
import { Tower } from "./towers";
import { Bullet } from "./towers/bullet";
import { Collidor } from "./utils/collidor";
import { CollisionChecker } from "./utils/collisionChecker";

export class CollisionLogic extends CollisionChecker {
  private towers: Record<string, Tower> = {};

  public addTower(tower: Tower): void {
    this.towers[tower.id] = tower;
  }

  public removeTower(towerId: string): void {
    this.towers[towerId].destroy();
    delete this.towers[towerId];
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
