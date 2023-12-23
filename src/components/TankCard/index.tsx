import React from "react";
import { TANK_PROPERTIES, Tanks } from "../../shared/constants";
import { TankImage } from "../TankImage";
import { Button } from "../Button";
import { Money } from "../Icons";

interface TankCardProps {
  tank: Tanks;
  cost: number;
  money: number;
  onTankPlace: (tank: Tanks) => void;
}

export const TankCard = ({ tank, cost, money, onTankPlace }: TankCardProps) => {
  const canAfford = money >= cost;

  return (
    <div className="m-2 p-2 bg-green-100 border-green-600 border-4 rounded-md flex flex-col gap-1 max-w-xs text-base items-center">
      <h3 className="text-gray-800 text-lg -mb-2 font-bold">
        {TANK_PROPERTIES[tank].name}
      </h3>

      <TankImage className="w-16 h-16" tank={tank} outerClassName="w-16 h-16" />

      <Button
        disabled={!canAfford}
        onClick={() => onTankPlace(tank)}
        type="success"
        className="flex items-center justify-center text-sm w-full whitespace-pre"
      >
        Buy for
        <Money className="h-6 w-6 -mr-1 inline text-yellow-400" />
        <span className="font-bold">{cost}</span>
      </Button>
    </div>
  );
};
