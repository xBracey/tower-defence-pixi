import React, { CSSProperties, useEffect, useMemo } from "react";
import { SPRITES, TILE_SIZE } from "../shared/constants";
import { useKey, useMouse } from "react-use";

interface TowerPlacerProps {
  setIsPlacingTower: (isPlacingTower: boolean) => void;
}

const CIRCLE_RADIUS = 64;

const getBackgroundPosition = (sprite: keyof typeof SPRITES) => {
  return `left -${SPRITES[sprite][0] * TILE_SIZE}px top -${
    SPRITES[sprite][1] * TILE_SIZE
  }px`;
};

export const TowerPlacer = ({ setIsPlacingTower }: TowerPlacerProps) => {
  const [mapConfig, setMapConfig] = React.useState<[number, number][]>([]);

  const cancelPlacement = () => {
    setIsPlacingTower(false);
  };

  useKey("Escape", cancelPlacement);

  const [position, setPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const isValidTile = useMemo(() => {
    if (!mapConfig.length || !position) return false;
    const x = Math.floor((position.x + TILE_SIZE / 2) / TILE_SIZE);
    const y = Math.floor((position.y + TILE_SIZE / 2) / TILE_SIZE);

    const isInvalid = mapConfig.some(
      ([mapX, mapY], i) => mapX === x && mapY === y
    );
    return !isInvalid;
  }, [mapConfig, position]);

  useEffect(() => {
    const mapConfig = window.Game.mapConfig.config;
    setMapConfig(mapConfig);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - CIRCLE_RADIUS / 2;
    const y = e.clientY - rect.top - CIRCLE_RADIUS / 2;
    setPosition({ x, y });
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (position && isValidTile) {
      window.Game.createTower(position.x, position.y);
      setIsPlacingTower(false);
    }
  };

  const onRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    cancelPlacement();
  };

  const centerStyle: CSSProperties = {
    position: "absolute",
    top: position?.y,
    left: position?.x,
  };

  return (
    <div
      className="absolute top-0 left-0 bottom-0 right-0"
      onMouseMove={onMouseMove}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      <div className="h-16 w-16" style={centerStyle}>
        <div
          className={`z-30 ${
            isValidTile ? "bg-blue-600" : "bg-red-600"
          } opacity-25 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-48 w-48`}
        />

        <div
          className="absolute h-16 w-16 z-10 top-0 left-0 right-0 bottom-0"
          style={{
            background: "url(/tilesheet.png)",
            backgroundPosition: getBackgroundPosition("tankBody"),
          }}
        />
        <div
          className="absolute h-16 w-16 z-20 top-0 left-0 right-0 bottom-0"
          style={{
            background: "url(/tilesheet.png)",
            backgroundPosition: getBackgroundPosition("tankCannon"),
          }}
        />
      </div>
    </div>
  );
};
