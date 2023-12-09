import { Entity } from "./entity";

export class EntityGroup {
  private entities: Record<string, Entity>;
  private onCollisionCallback: (id: string, otherIds: string[]) => void;

  constructor(onCollisionCallback: (id: string, otherIds: string[]) => void) {
    this.entities = {};
    this.onCollisionCallback = onCollisionCallback;
  }

  add(entity: Entity) {
    this.entities[entity.id] = entity;
  }

  addMultiple(entities: Record<string, Entity> | Entity[]) {
    typeof entities.forEach === "function"
      ? entities.forEach((entity) => {
          this.add(entity);
        })
      : Object.values(entities).forEach((entity) => {
          this.add(entity);
        });
  }

  remove(id: string) {
    delete this.entities[id];
  }

  addAllCollisionCheck() {
    Object.values(this.entities).forEach((entity) => {
      entity.checkCollisionCallback = this.onCheckCollision.bind(this);
    });
  }

  onCheckCollision(id: string) {
    const entity = this.entities[id];
    const collisions: string[] = [];

    Object.values(this.entities).forEach((otherEntity) => {
      if (otherEntity.id === id) return;

      if (entity.getBounds().intersects(otherEntity.getBounds())) {
        collisions.push(otherEntity.id);
      }
    });

    this.onCollisionCallback(id, collisions);
  }
}
