import React from "react";
import "./index.css";
import { MAP_HEIGHT_PX, MAP_WIDTH_PX } from "./shared/constants";
import { Towers } from "./components/towers";
import { Game } from "./components/game";
import { TowerDefenceGame } from "./tower-defence";

export const TowerDefence = () => {
  const [game, setGame] = React.useState<TowerDefenceGame | null>(null);

  const onStartGame = () => {
    setGame(new TowerDefenceGame());
  };

  const onStartLevel = () => {
    game?.start();
  };

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-2xl flex flex-col items-center">
        <p className="my-4">Hello World</p>

        <div className="flex items-center gap-4 w-full justify-between">
          <button
            className="bg-lime-500 hover:bg-lime-700 text-gray-900 font-bold py-2 px-4 rounded my-4"
            onClick={onStartGame}
          >
            Start Game
          </button>

          <button
            className="bg-lime-500 hover:bg-lime-700 text-gray-900 font-bold py-2 px-4 rounded my-4"
            onClick={onStartLevel}
          >
            Start Level
          </button>
        </div>
        {game && (
          <div
            className="relative"
            style={{
              height: MAP_HEIGHT_PX,
              width: MAP_WIDTH_PX,
            }}
          >
            <Towers game={game} />
            <Game addToDOM={game.addToDOM.bind(game)} ready={!!game} />
          </div>
        )}
      </div>
    </div>
  );
};
