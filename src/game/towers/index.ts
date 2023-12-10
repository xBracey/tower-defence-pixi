import { Sprite, Texture } from "pixi.js";
import { Entity } from "../utils/entity";
import { TILE_SIZE } from "../../shared/constants";
import { ContainerEntity } from "../utils/containerEntity";
import { v4 } from "uuid";
import { TowerRange } from "./range";
import { Bullet } from "./bullet";

export class Tower extends ContainerEntity {
  private range: number = 192;
  private fireRate: number = 5;
  private bodySprite: Sprite;
  private cannonSprite: Sprite;
  public id: string;
  public fireTimer: number = 0;

  constructor(x: number, y: number) {
    super();
    const bodyTexture = window.Game.map.getTexture("tankBody");
    const cannonTexture = window.Game.map.getTexture("tankCannon");

    this.id = `tower+${v4()}`;

    this.x = x + TILE_SIZE / 2;
    this.y = y + TILE_SIZE / 2;

    this.bodySprite = new Sprite(bodyTexture);
    this.cannonSprite = new Sprite(cannonTexture);

    this.bodySprite.anchor.set(0.5, 0.5);
    this.cannonSprite.anchor.set(0.5, 0.5);

    this.addChild(this.bodySprite);
    this.addChild(this.cannonSprite);

    const rangeEntity = new TowerRange(this.range, this.id);
    this.add(rangeEntity);

    window.Game.addContainer(this);
    window.Game.addOnTick(this.onTick.bind(this));
  }

  public fire(entity: Entity) {
    if (this.fireTimer < this.fireRate) {
      return;
    }

    const dx = entity.x - this.x;
    const dy = entity.y - this.y;
    const angle = Math.atan2(dy, dx);

    this.cannonSprite.rotation = angle;

    const bullet = new Bullet(0, 0, angle, this.id);
    this.add(bullet);
    this.fireTimer = 0;
  }

  public onTick(): void {
    this.fireTimer++;
  }
}
