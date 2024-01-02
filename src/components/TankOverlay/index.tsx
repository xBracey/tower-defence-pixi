import React, { Dispatch } from "react";
import { TankActions, TankState } from "../../zustand/game/tankReducer";

interface TankOverlayProps {
  tankState: TankState;
  tankDispatch: Dispatch<TankActions>;
}

export const TankOverlay = ({ tankState, tankDispatch }: TankOverlayProps) => {
  const onTankClick = (id: string) =>
    tankDispatch({ type: "CLICK_TANK", payload: id });

  return (
    <>
      {tankState.tanks.map((tank) => (
        <div
          className="absolute h-8 w-8 bg-purple-600 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ left: tank.x, top: tank.y }}
          onClick={() => onTankClick(tank.id)}
        />
      ))}
    </>
  );
};
