import { Container } from "pixi.js";
import { Entity } from "./entity";

export class ContainerEntity extends Container {
  public entities: Record<string, Entity>;

  constructor() {
    super();
    this.entities = {};
  }

  public add(entity: Entity): void {
    this.entities[entity.id] = entity;
    this.addChild(entity);
  }

  public remove(id: string): void {
    const entity = this.entities[id];

    if (!entity) return;

    entity.destroy();
    delete this.entities[id];
  }

  public addMultiple(entities: Record<string, Entity> | Entity[]): void {
    typeof entities.forEach === "function"
      ? entities.forEach((entity) => {
          this.add(entity);
        })
      : Object.values(entities).forEach((entity) => {
          this.add(entity);
        });
  }
}
