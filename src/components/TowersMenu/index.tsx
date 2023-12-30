import React from "react";
import { MAP_HEIGHT_PX } from "../../shared/constants";
import { TowerPlacer } from "../towerPlacer";
import { TankCard } from "../TankCard";
import { Tanks } from "../../shared/tanks";

interface TowersMenuProps {
  money: number;
  tankMenuOpen: boolean;
  setTankMenuOpen: (tankMenuOpen: boolean) => void;
  tankPlacer?: Tanks;
  setTankPlacer: (tankPlacer?: Tanks) => void;
  buyTank: (tank: Tanks) => void;
}

export const TowersMenu = ({
  money,
  tankMenuOpen,
  setTankMenuOpen,
  tankPlacer,
  setTankPlacer,
  buyTank,
}: TowersMenuProps) => {
  return (
    <>
      {tankPlacer && (
        <TowerPlacer
          tank={tankPlacer}
          setTankPlacer={setTankPlacer}
          setTankMenuOpen={setTankMenuOpen}
          buyTank={buyTank}
        />
      )}

      {tankMenuOpen && (
        <div
          className="absolute top-0 right-0 bg-green-300 z-10"
          style={{
            width: 200,
            height: MAP_HEIGHT_PX,
          }}
        >
          <div className="flex flex-col gap-4 p-2">
            <TankCard tank="Normal" money={money} onTankPlace={setTankPlacer} />
            <TankCard
              tank="Powerful"
              money={money}
              onTankPlace={setTankPlacer}
            />
            <TankCard tank="Fast" money={money} onTankPlace={setTankPlacer} />
            <TankCard tank="Sniper" money={money} onTankPlace={setTankPlacer} />
          </div>
        </div>
      )}
    </>
  );
};
