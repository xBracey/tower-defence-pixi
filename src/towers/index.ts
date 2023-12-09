import { Container, Sprite, Texture } from "pixi.js";
import { v4 } from "uuid";
import { TILE_SIZE } from "../shared/constants";
import { Entity } from "../utils/entity";

export class Tower extends Container {
  private range: number = 192;
  public id: string;
  public rangeEntity: Entity;
  private bodySprite: Sprite;
  private cannonSprite: Sprite;
  private bulletEntities: Entity[] = [];

  constructor(
    bodyTexture: Texture,
    cannonTexture: Texture,
    x: number,
    y: number
  ) {
    super();
    this.x = x + TILE_SIZE / 2;
    this.y = y + TILE_SIZE / 2;
    this.id = `tower-${v4()}`;

    this.bodySprite = new Sprite(bodyTexture);
    this.cannonSprite = new Sprite(cannonTexture);

    this.bodySprite.anchor.set(0.5, 0.5);
    this.cannonSprite.anchor.set(0.5, 0.5);

    this.addChild(this.bodySprite);
    this.addChild(this.cannonSprite);

    this.rangeEntity = new Entity({
      texture: Texture.EMPTY,
      width: this.range,
      height: this.range,
      x: TILE_SIZE / 2,
      y: TILE_SIZE / 2,
      id: this.id,
    });
    this.rangeEntity.anchor.set(0.5, 0.5);
    this.addChild(this.rangeEntity);
  }

  public fire(entity: Entity) {
    const dx = entity.x - this.x;
    const dy = entity.y - this.y;
    const angle = Math.atan2(dy, dx);

    this.cannonSprite.rotation = angle;
  }
}
