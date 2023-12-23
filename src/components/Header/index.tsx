import React from "react";
import { Heart, Money, Next, Tank } from "../Icons";
import { Button } from "../Button";

interface HeaderProps {
  lives: number;
  round: number;
  money: number;
  onMenuClick: () => void;
}

export const Header = ({ lives, round, money, onMenuClick }: HeaderProps) => {
  const onNextRound = () => {
    window.Game.startRound();
  };

  return (
    <div className="absolute h-16 grid grid-cols-3 w-80 left-1/2 -translate-x-1/2 bg-gray-800 rounded-b-lg text-white text-base">
      <div className="flex items-center p-2 justify-center">
        {lives}
        <Heart className="text-red-600 ml-2 h-8 w-8" />
      </div>

      <div
        className="flex items-center p-2 justify-center"
        style={{
          fontFamily: "Play",
        }}
      >
        {`Round ${round + 1}`}

        <button onClick={onNextRound}>
          <Next className="text-green-600 ml-1 h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center p-2 justify-center">
        <Money className="text-yellow-500 h-8 w-8" />
        {money}
      </div>

      <div className="absolute -right-8 w-8 h-12 top-2">
        <Button onClick={onMenuClick}>
          <Tank />
        </Button>
      </div>
    </div>
  );
};
