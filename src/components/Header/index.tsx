import React from "react";
import { Heart, Money } from "../Icons";

interface HeaderProps {
  lives: number;
  round: number;
  money: number;
}

export const Header = ({ lives, round, money }: HeaderProps) => {
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
      </div>

      <div className="flex items-center p-2 justify-center">
        <Money className="text-yellow-500 h-8 w-8" />
        {money}
      </div>
    </div>
  );
};
