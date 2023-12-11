import { Container } from "pixi.js";
import { PixiApp } from "./pixi";
import { CollisionChecker } from "./collisionChecker";
import { Collidor } from "./collidor";

export class Game {
  public readonly app: PixiApp;
  public collisionChecker: CollisionChecker;

  constructor(width?: number, height?: number) {
    this.app = new PixiApp(width, height);
    this.collisionChecker = new CollisionChecker(this.onCollision.bind(this));
    this.app.ticker.add(this.onTick.bind(this));
  }

  public addContainer(entity: Container): void {
    this.app.stage.addChild(entity);
  }

  public removeContainer(entity: Container): void {
    this.app.stage.removeChild(entity);
  }

  public addOnTick = (callback: () => void): void => {
    this.app.ticker.add(callback);
  };

  public removeOnTick = (callback: () => void): void => {
    this.app.ticker.remove(callback);
  };

  public addToDOM(element: HTMLElement): void {
    this.app.addToDOM(element);
  }

  protected onCollision(entity: Collidor, otherEntities: Collidor[]): void {
    // Do Nothing
  }

  protected onTick(): void {
    // Do Nothing
  }
}
