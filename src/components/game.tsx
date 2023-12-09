import React, { useEffect } from "react";

export const Game = () => {
  useEffect(() => {
    const gameElement = document.getElementById("game");

    if (gameElement) {
      window.Game.addToDOM(gameElement);
    }
  }, []);

  return <div id="game" />;
};
