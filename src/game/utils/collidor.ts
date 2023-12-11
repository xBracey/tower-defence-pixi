import {
  ColorSource,
  Container,
  Graphics,
  Sprite,
  SpriteOptions,
  Texture,
} from "pixi.js";
import { v4 } from "uuid";

interface CollidorProps {
  id?: string;
  idPrefix?: string;
  tint?: ColorSource;
  collisionCheck?: boolean;
  hitboxesDimensions: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
  x: number;
  y: number;
  width: number;
  height: number;
  anchorPoints: {
    x: number;
    y: number;
  };
  hitboxColor?: ColorSource;
}

export class Collidor extends Container {
  private sprite: Sprite;
  private onTickFunction: () => void;
  public id: string;
  public hitboxes: Sprite[];

  constructor(options: SpriteOptions & CollidorProps) {
    super(options);

    this.id = options.id
      ? options.id
      : options.idPrefix
      ? `${options.idPrefix}+${v4()}`
      : v4();

    this.hitboxes = options.hitboxesDimensions.map((hitbox, i) => {
      const x = hitbox.x - options.anchorPoints.x * options.width;
      const y = hitbox.y - options.anchorPoints.y * options.height;

      const graphic = new Graphics({});
      graphic.rect(0, 0, 1, 1);
      graphic.stroke({
        width: 2 / hitbox.width,
        color: options.hitboxColor ?? 0xff0000,
      });

      const spriteOptions: SpriteOptions = {
        texture: Texture.EMPTY,
        ...hitbox,
        x,
        y,
      };

      console.log({ spriteOptions, hitbox, options });

      const graphicSprite = new Sprite(spriteOptions);

      graphicSprite.addChild(graphic);

      return graphicSprite;
    });

    this.sprite = new Sprite({
      texture: options.texture ?? Texture.WHITE,
      x: 0,
      y: 0,
      width: options.width,
      height: options.height,
      tint: options.tint ?? 0xffffff,
    });

    this.sprite.anchor.set(options.anchorPoints.x, options.anchorPoints.y);

    this.addChild(this.sprite);
    this.hitboxes.forEach((hitbox) => this.addChild(hitbox));

    this.onTickFunction = this.onTick.bind(this);

    window.Game.collisionChecker.add(this);
    window.Game.addOnTick(this.onTickFunction);
  }

  public translate(x: number, y: number): void {
    this.x += x;
    this.y += y;
    window.Game.collisionChecker.onCheckCollision(this.id);
  }

  public onTick(): void {}

  public destroy(): void {
    super.destroy();
    this.hitboxes.forEach((hitbox) => hitbox.destroy());
    this.sprite.destroy();
    window.Game.collisionChecker.remove(this.id);
    window.Game.removeOnTick(this.onTickFunction);
  }
}
