import { Sprite, Texture } from "pixi.js";
import { PathTile } from "../map";
import { TILE_SIZE } from "../shared/constants";
import { Entity } from "../utils/entity";

export class Enemy extends Entity {
  private pathTiles: PathTile[];
  private currentPathTileIndex: number;
  private state: "moving" | "idle" = "idle";
  private speed: number = 2;
  private onDestroyEnemy: (id: string) => void;

  constructor(
    pathTiles: PathTile[],
    texture: Texture,
    onDestroyEnemy: (id: string) => void
  ) {
    super({ texture, idPrefix: "enemy" });
    console.log(this.id);
    this.pathTiles = pathTiles;
    this.currentPathTileIndex = 0;
    this.x = -TILE_SIZE;
    this.y = -TILE_SIZE;
    this.anchor.set(0, 0);
    this.onDestroyEnemy = onDestroyEnemy;
  }

  public start(): void {
    this.state = "moving";
    this.x = this.pathTiles[0].x * TILE_SIZE;
    this.y = this.pathTiles[0].y * TILE_SIZE;
  }

  public onTick(): void {
    if (this.state === "moving" && this.pathTiles[this.currentPathTileIndex]) {
      if (
        this.x === this.pathTiles[this.currentPathTileIndex].x * TILE_SIZE &&
        this.y === this.pathTiles[this.currentPathTileIndex].y * TILE_SIZE
      ) {
        if (this.currentPathTileIndex === this.pathTiles.length - 1) {
          this.state = "idle";
          this.onDestroyEnemy(this.id);
          this.destroy();
          return;
        }

        this.currentPathTileIndex++;
      }

      const currentPathTile = this.pathTiles[this.currentPathTileIndex];
      const dx = currentPathTile.x * TILE_SIZE - this.x;
      const dy = currentPathTile.y * TILE_SIZE - this.y;
      const angle = Math.atan2(dy, dx);
      const x = Math.cos(angle) * this.speed;
      const y = Math.sin(angle) * this.speed;

      this.translate(x, y);
    }
  }
}
