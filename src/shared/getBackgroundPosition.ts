import { SPRITES, TILE_SIZE } from "../shared/constants";

export const getBackgroundPosition = (sprite: keyof typeof SPRITES) => {
  return `left -${SPRITES[sprite][0] * TILE_SIZE}px top -${
    SPRITES[sprite][1] * TILE_SIZE
  }px`;
};
