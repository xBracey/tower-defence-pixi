import { Tanks } from "../../shared/tanks";
import { TANK_PROPERTIES } from "../../shared/tanks";

export type GameState = {
  lives: number;
  money: number;
  experience: number;
  round: number;
};

type EnemyKilled = {
  type: "ENEMY_KILLED";
};

type EnemyReachedEnd = {
  type: "ENEMY_REACHED_END";
};

type EndGame = {
  type: "END_GAME";
};

type FinishedRound = {
  type: "FINISHED_ROUND";
};

type BuyTank = {
  type: "BUY_TANK";
  payload: { tank: Tanks };
};

type SetState = { type: "SET_STATE"; payload: GameState };
type Reset = { type: "RESET" };

export type GameActions =
  | EnemyKilled
  | SetState
  | Reset
  | EndGame
  | FinishedRound
  | EnemyReachedEnd
  | BuyTank;

export const initialState: GameState = {
  lives: 20,
  money: 150,
  experience: 0,
  round: 0,
};

export const reducer = (state: GameState, action: GameActions): GameState => {
  switch (action.type) {
    case "RESET":
      return initialState;

    case "SET_STATE": {
      return { ...action.payload };
    }

    case "ENEMY_KILLED":
      return {
        ...state,
        experience: state.experience + 1,
        money: state.money + 2,
      };

    case "END_GAME":
      return {
        ...state,
        round: 0,
      };

    case "FINISHED_ROUND":
      return {
        ...state,
        round: state.round + 1,
      };

    case "ENEMY_REACHED_END":
      return {
        ...state,
        lives: state.lives - 1,
      };

    case "BUY_TANK":
      return {
        ...state,
        money: state.money - TANK_PROPERTIES[action.payload.tank].cost,
      };
  }
};
