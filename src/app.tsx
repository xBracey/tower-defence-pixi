import React, { useEffect } from "react";
import "./index.css";
import { MAP_HEIGHT_PX, MAP_WIDTH_PX } from "./shared/constants";
import { Game } from "./components/game";
import { TowerDefenceGame } from "./game";
import { Header } from "./components/Header";
import { useTowerDefenceHydratedStore } from "./zustand/hydrated";
import { useTowerDefenceStore } from "./zustand/store";
import { TowersMenu } from "./components/TowersMenu";
import { Tanks } from "./shared/tanks";
import { TankOverlay } from "./components/TankOverlay";

export const TowerDefence = () => {
  const [gameInitialized, setGameInitialized] = React.useState(false);
  const { state, tankMenuOpen, tankPlacer, tankState } =
    useTowerDefenceHydratedStore((state) => state.game);
  const { dispatch, setTankMenuOpen, setTankPlacer, tankDispatch } =
    useTowerDefenceStore((state) => state.game);

  useEffect(() => {
    window.Game = new TowerDefenceGame("map1", state, dispatch);
    setGameInitialized(true);
  }, []);

  useEffect(() => {
    if (gameInitialized) {
      window.Game.updateState(state);
    }
  }, [state]);

  const onStartRound = () => {
    window.Game.startRound();
  };

  const onMenuClick = () => {
    setTankMenuOpen(!tankMenuOpen);
  };

  const buyTank = (tank: Tanks) => {
    dispatch({ type: "BUY_TANK", payload: { tank } });
  };

  return (
    <div className="flex justify-center p-4 bg-purple-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-2xl flex flex-col items-center py-16">
        {gameInitialized && (
          <div className="relative">
            <div
              className="relative"
              style={{
                height: MAP_HEIGHT_PX,
                width: MAP_WIDTH_PX,
              }}
            >
              <Header {...state} onMenuClick={onMenuClick} />
              <TowersMenu
                money={state.money}
                tankMenuOpen={tankMenuOpen}
                setTankMenuOpen={setTankMenuOpen}
                tankPlacer={tankPlacer}
                setTankPlacer={setTankPlacer}
                buyTank={buyTank}
              />
              <TankOverlay tankState={tankState} tankDispatch={tankDispatch} />
              <Game />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
