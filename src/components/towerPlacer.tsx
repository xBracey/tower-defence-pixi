import React, { CSSProperties, useEffect, useMemo } from "react";
import { TILE_SIZE, Tanks } from "../shared/constants";
import { useKey } from "react-use";
import { TankImage } from "./TankImage";

interface TowerPlacerProps {
  tank: Tanks;
  setTankMenuOpen: (tankMenuOpen: boolean) => void;
  setTankPlacer: (tankPlacer?: Tanks) => void;
  buyTank: (tank: Tanks) => void;
}

const CIRCLE_RADIUS = 64;

export const TowerPlacer = ({
  tank,
  setTankPlacer,
  setTankMenuOpen,
  buyTank,
}: TowerPlacerProps) => {
  const [mapConfig, setMapConfig] = React.useState<[number, number][]>([]);

  const cancelPlacement = () => {
    setTankPlacer(undefined);
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

  const onClick = () => {
    if (position && isValidTile) {
      window.Game.createTower(position.x, position.y, tank);
      setTankPlacer(undefined);
      setTankMenuOpen(false);
      buyTank(tank);
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

        <TankImage
          className="h-16 w-16 z-10"
          outerClassName={"h-16 w-16"}
          tank={tank}
        />
      </div>
    </div>
  );
};
