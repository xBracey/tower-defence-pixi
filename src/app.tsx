import React, { useEffect } from "react";
import "./index.css";
import { MAP_HEIGHT_PX, MAP_WIDTH_PX } from "./shared/constants";
import { Towers } from "./components/towers";
import { Game } from "./components/game";
import { TowerDefenceGame } from "./game";
import { Header } from "./components/Header";
import { useTowerDefenceHydratedStore } from "./zustand/hydrated";
import { useTowerDefenceStore } from "./zustand/store";

export const TowerDefence = () => {
  const [gameInitialized, setGameInitialized] = React.useState(false);
  const { state } = useTowerDefenceHydratedStore((state) => state.game);
  const { dispatch } = useTowerDefenceStore((state) => state.game);

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

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
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
              <Header {...state} />
              <Towers />
              <Game />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
