import React, { useEffect } from "react";

interface GameProps {
  addToDOM: (element: HTMLElement) => void;
  ready?: boolean;
}

export const Game = ({ addToDOM, ready }: GameProps) => {
  useEffect(() => {
    if (ready) {
      const gameElement = document.getElementById("game");

      if (gameElement) addToDOM(gameElement);
    }
  }, [ready]);

  return <div id="game" />;
};
