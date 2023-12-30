import { Texture } from "pixi.js";
import { PathTile } from "../map";
import { TILE_SIZE } from "../../shared/constants";
import { Collidor } from "../utils/collidor";
import { ENEMY_PROPERTIES, Enemies, EnemyProperty } from "../../shared/enemies";

export class Enemy extends Collidor {
  private pathTiles: PathTile[];
  private currentPathTileIndex: number;
  private state: "moving" | "idle" = "idle";
  public type: Enemies;
  public properties: EnemyProperty;
  public health: number;
  public distanceTravelled: number = 0;
  public direction: "up" | "down" | "left" | "right" = "right";

  constructor(pathTiles: PathTile[], texture: Texture, type: Enemies) {
    const properties = ENEMY_PROPERTIES[type];

    super({
      texture: window.Game.map.getTexture(properties.tile),
      idPrefix: "enemy",
      hitboxesDimensions: [{ x: 16, y: 16, width: 32, height: 32 }],
      x: -TILE_SIZE,
      y: -TILE_SIZE,
      width: 64,
      height: 64,
      anchorPoints: { x: 0.5, y: 0.5 },
    });

    this.type = type;
    this.properties = properties;
    this.health = this.properties.health;

    this.x = -TILE_SIZE;
    this.y = -TILE_SIZE;
    this.pathTiles = pathTiles;
    this.currentPathTileIndex = 0;

    window.Game.addContainer(this);
  }

  public start(): void {
    this.state = "moving";
    this.x = this.pathTiles[0].x * TILE_SIZE + TILE_SIZE / 2;
    this.y = this.pathTiles[0].y * TILE_SIZE + TILE_SIZE / 2;
  }

  public onTick(): void {
    super.onTick();

    if (this.health <= 0 && this.state === "moving") {
      this.state = "idle";
      window.Game.gameStateDispatch({ type: "ENEMY_KILLED" });
      this.destroy();
      return;
    }

    if (this.state === "moving" && this.pathTiles[this.currentPathTileIndex]) {
      this.distanceTravelled += this.properties.speed;

      if (
        this.x ===
          this.pathTiles[this.currentPathTileIndex].x * TILE_SIZE +
            TILE_SIZE / 2 &&
        this.y ===
          this.pathTiles[this.currentPathTileIndex].y * TILE_SIZE +
            TILE_SIZE / 2
      ) {
        if (this.currentPathTileIndex === this.pathTiles.length - 1) {
          this.state = "idle";
          window.Game.gameStateDispatch({ type: "ENEMY_REACHED_END" });
          this.health = 0;
          this.destroy();
          return;
        }

        this.currentPathTileIndex++;
      }

      const currentPathTile = this.pathTiles[this.currentPathTileIndex];
      const dx = currentPathTile.x * TILE_SIZE - this.x + TILE_SIZE / 2;
      const dy = currentPathTile.y * TILE_SIZE - this.y + TILE_SIZE / 2;
      const angle = Math.atan2(dy, dx);
      const x = Math.cos(angle) * this.properties.speed;
      const y = Math.sin(angle) * this.properties.speed;

      this.sprite.rotation = angle;

      this.translate(x, y);
    }
  }
}
