import { Container, Sprite, Texture } from "pixi.js";
import { TILE_SIZE, Tanks } from "../../shared/constants";
import { v4 } from "uuid";
import { TowerRange } from "./range";
import { Bullet } from "./bullet";
import { Collidor } from "../utils/collidor";
import { sound } from "@pixi/sound";
import { TANK_PROPERTIES } from "../../shared/tanks";

export class Tower extends Container {
  private bodySprite: Collidor;
  private cannonSprite: Sprite;
  public id: string;
  public type: Tanks = "Normal";
  public properties = TANK_PROPERTIES[this.type];
  public fireTimer: number = 0;

  constructor(x: number, y: number) {
    super();

    this.properties = TANK_PROPERTIES[this.type];

    const bodyTexture = window.Game.map.getTexture(this.properties.tiles[0]);
    const cannonTexture = window.Game.map.getTexture(this.properties.tiles[1]);

    this.id = `tower+${v4()}`;

    this.x = x + TILE_SIZE / 2;
    this.y = y + TILE_SIZE / 2;

    this.bodySprite = new Collidor({
      texture: bodyTexture,
      idPrefix: `${this.id}|body`,
      hitboxesDimensions: [{ x: 10, y: 16, width: 44, height: 32 }],
      x: 0,
      y: 0,
      width: 64,
      height: 64,
      anchorPoints: { x: 0.5, y: 0.5 },
    });
    this.cannonSprite = new Sprite(cannonTexture);

    this.cannonSprite.anchor.set(0.5, 0.5);

    this.addChild(this.bodySprite);
    this.addChild(this.cannonSprite);

    const rangeEntity = new TowerRange(this.properties.range, this.id);
    this.addChild(rangeEntity);

    window.Game.addContainer(this);
    window.Game.addOnTick(this.onTick.bind(this));
  }

  public fire(entity: Collidor) {
    if (this.fireTimer < this.properties.fireRate) {
      return;
    }

    sound.play("shoot", { volume: 0.5, start: 0, end: 0.15 });

    const dx = entity.x - this.x + TILE_SIZE / 2;
    const dy = entity.y - this.y + TILE_SIZE / 2;
    const angle = Math.atan2(dy, dx);

    this.cannonSprite.rotation = angle;

    const bullet = new Bullet(0, 0, angle, this.id);
    this.addChild(bullet);
    this.fireTimer = 0;
  }

  public onTick(): void {
    this.fireTimer++;
  }
}
