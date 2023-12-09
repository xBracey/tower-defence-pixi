import React from "react";
import { MAP_HEIGHT_PX } from "../shared/constants";
import { TowerPlacer } from "./towerPlacer";
import { MenuIcon } from "./menu";

export const Towers = () => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [isPlacingTower, setIsPlacingTower] = React.useState<boolean>(false);

  const onMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {isPlacingTower && <TowerPlacer setIsPlacingTower={setIsPlacingTower} />}

      <button
        className="absolute top-0 right-0 z-20 bg-blue-600 rounded-full flex items-center justify-center w-12 h-12"
        onClick={onMenuClick}
      >
        <MenuIcon className="w-8 h-8" />
      </button>

      {menuOpen && (
        <div
          className="absolute top-0 right-0 bg-blue-600 z-10 pt-12"
          style={{
            width: 200,
            height: MAP_HEIGHT_PX,
          }}
        >
          <div className="flex flex-col gap-4 p-4">
            <button
              className="bg-lime-500 hover:bg-lime-700 text-gray-900 font-bold py-2 px-4 rounded my-4"
              onClick={() => {
                setIsPlacingTower(true);
                setMenuOpen(false);
              }}
            >
              Basic Tower
            </button>
          </div>
        </div>
      )}
    </>
  );
};
