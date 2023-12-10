import { ColorSource, Sprite, SpriteOptions, Texture } from "pixi.js";
import { v4 } from "uuid";

interface EntityProps {
  id?: string;
  idPrefix?: string;
  tint?: ColorSource;
  collisionCheck?: boolean;
}

export class Entity extends Sprite {
  public id: string;
  public checkCollisionCallback?: (id: string) => void;
  private collisionCheck: boolean;
  private onTickFunction: () => void;

  constructor(options: SpriteOptions & EntityProps) {
    super(options);
    this.id = options.id
      ? options.id
      : options.idPrefix
      ? `${options.idPrefix}+${v4()}`
      : v4();
    this.anchor.set(0.5, 0.5);
    this.texture = options.texture ?? Texture.WHITE;
    this.tint = options.tint ?? 0xffffff;

    this.collisionCheck = options.collisionCheck ?? false;

    this.onTickFunction = this.onTick.bind(this);

    window.Game.entityGroup.add(this);
    window.Game.addOnTick(this.onTickFunction);
  }

  public translate(x: number, y: number): void {
    this.x += x;
    this.y += y;

    if (this.checkCollisionCallback) {
      this.checkCollisionCallback(this.id);
    }
  }

  public onTick(): void {
    if (this.collisionCheck) {
      window.Game.entityGroup.onCheckCollision(this.id);
    }
  }

  public destroy(): void {
    console.log("destroying entity", this.id);

    super.destroy();
    window.Game.entityGroup.remove(this.id);
    window.Game.removeOnTick(this.onTickFunction);
  }
}
