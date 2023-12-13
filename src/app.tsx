import React, { useEffect } from "react";
import "./index.css";
import { MAP_HEIGHT_PX, MAP_WIDTH_PX } from "./shared/constants";
import { Towers } from "./components/towers";
import { Game } from "./components/game";
import { TowerDefenceGame } from "./game";

export const TowerDefence = () => {
  const [gameInitialized, setGameInitialized] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [lives, setLives] = React.useState(10);
  const [money, setMoney] = React.useState(0);
  const [round, setRound] = React.useState(0);

  useEffect(() => {
    window.Game = new TowerDefenceGame(
      "map1",
      [lives, setLives],
      [money, setMoney],
      [round, setRound]
    );
    setGameInitialized(true);
  }, []);

  const onStartLevel = () => {
    window.Game.startRound();
  };

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-2xl flex flex-col items-center">
        <p className="my-4">Hello World</p>

        <div className="flex items-center gap-4 w-full justify-between">
          <button
            className="bg-lime-500 hover:bg-lime-700 text-gray-900 font-bold py-2 px-4 rounded my-4"
            onClick={onStartLevel}
          >
            Start Round
          </button>

          <div>
            <p className="text-lime-300">Lives: {lives}</p>
            <p className="text-lime-300">Money: {money}</p>
            <p className="text-lime-300">Round: {round + 1}</p>
          </div>
        </div>
        {gameInitialized && (
          <div
            className="relative"
            style={{
              height: MAP_HEIGHT_PX,
              width: MAP_WIDTH_PX,
            }}
          >
            <Towers />
            <Game />
          </div>
        )}
      </div>
    </div>
  );
};
