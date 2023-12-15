import { GetState, SetState, StateCreator, StoreApi } from "zustand";
import { GameActions, GameState, initialState, reducer } from "./reducer";
import { Dispatch } from "react";

export interface GameValuesSlice {
  state: GameState;
}

export interface GameActionsSlice {
  dispatch: Dispatch<GameActions>;
}

export interface GameSlice {
  game: GameValuesSlice & GameActionsSlice;
}

export const gameInitialValuesState: GameValuesSlice = {
  state: initialState,
};

const setSlice = (
  param: (state: GameSlice["game"]) => Partial<GameSlice["game"]>,
  set: (
    partial:
      | GameSlice
      | Partial<GameSlice>
      | ((state: GameSlice) => GameSlice | Partial<GameSlice>)
  ) => void
) =>
  set((state) => ({
    game: { ...state.game, ...param(state.game) },
  }));

export const createGameSlice: StateCreator<GameSlice> = (set) => ({
  game: {
    ...gameInitialValuesState,
    dispatch: (action: GameActions) =>
      setSlice(
        (state) => ({ ...state, state: reducer(state.state, action) }),
        set
      ),
  },
});

export default createGameSlice as (
  set: SetState<GameSlice>,
  get: GetState<GameSlice>,
  api: StoreApi<GameSlice>
) => GameSlice;
