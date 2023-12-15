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

type SetState = { type: "SET_STATE"; data: GameState };
type Reset = { type: "RESET" };

export type GameActions =
  | EnemyKilled
  | SetState
  | Reset
  | EndGame
  | FinishedRound
  | EnemyReachedEnd;

export const initialState: GameState = {
  lives: 0,
  money: 0,
  experience: 0,
  round: 0,
};

export const reducer = (state: GameState, action: GameActions): GameState => {
  switch (action.type) {
    case "RESET":
      return initialState;

    case "SET_STATE": {
      return { ...action.data };
    }

    case "ENEMY_KILLED":
      return {
        ...state,
        experience: state.experience + 1,
        money: state.money + 10,
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
  }
};
