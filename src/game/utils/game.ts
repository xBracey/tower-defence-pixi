import { Container } from "pixi.js";
import { Entity } from "./entity";
import { EntityGroup } from "./entityGroup";
import { PixiApp } from "./pixi";
import { ContainerEntity } from "./containerEntity";

export class Game {
  public readonly app: PixiApp;
  public entityGroup: EntityGroup;

  constructor(width?: number, height?: number) {
    this.app = new PixiApp(width, height);
    this.entityGroup = new EntityGroup(this.onCollision.bind(this));
    this.app.ticker.add(this.onTick.bind(this));
  }

  public addEntity(entity: Entity): void {
    this.app.stage.addChild(entity);
  }

  public removeEntity(entity: Entity): void {
    this.app.stage.removeChild(entity);
  }

  public addOnTick = (callback: () => void): void => {
    this.app.ticker.add(callback);
  };

  public addToDOM(element: HTMLElement): void {
    this.app.addToDOM(element);
  }

  public addContainer(container: ContainerEntity) {
    this.app.stage.addChild(container);
  }

  protected onCollision(entity: Entity, otherEntities: Entity[]): void {
    // Do Nothing
  }

  protected onTick(): void {
    // Do Nothing
  }
}
