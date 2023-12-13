import { Rectangle, Sprite } from "pixi.js";
import { Collidor } from "./collidor";

export class CollisionChecker {
  private collidors: Record<string, Collidor>;

  constructor() {
    this.collidors = {};
  }

  add(collidor: Collidor) {
    this.collidors[collidor.id] = collidor;
  }

  addMultiple(collidors: Record<string, Collidor> | Collidor[]) {
    typeof collidors.forEach === "function"
      ? collidors.forEach((collidor) => {
          this.add(collidor);
        })
      : Object.values(collidors).forEach((collidor) => {
          this.add(collidor);
        });
  }

  remove(id: string) {
    delete this.collidors[id];
  }

  onCheckCollision(id: string) {
    const collidor = this.collidors[id];

    if (!collidor) return;

    const collisions: Collidor[] = [];

    Object.values(this.collidors).forEach((otherCollidor) => {
      if (otherCollidor.id === id) return;

      const { hitboxes } = collidor;
      const { hitboxes: otherHitboxes } = otherCollidor;

      let hasCollided = false;

      hitboxes.forEach((hitbox) => {
        const hitboxBounds = hitbox.getBounds(true);
        otherHitboxes.forEach((otherHitbox) => {
          const otherHitboxBounds = otherHitbox.getBounds(true);
          if (hitboxBounds.intersects(otherHitboxBounds)) {
            hasCollided = true;
          }
        });
      });

      if (hasCollided) collisions.push(otherCollidor);
    });

    this.onCollision(collidor, collisions);
  }

  protected onCollision(collidor: Collidor, otherCollidors: Collidor[]): void {
    // Do Nothing
  }
}
