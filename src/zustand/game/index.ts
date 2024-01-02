import { GetState, SetState, StateCreator, StoreApi } from "zustand";
import { GameActions, GameState, initialState, reducer } from "./reducer";
import { Dispatch } from "react";
import { Tanks } from "../../shared/tanks";
import {
  TankActions,
  TankState,
  initialTankState,
  tankReducer,
} from "./tankReducer";

export interface GameValuesSlice {
  state: GameState;
  tankMenuOpen: boolean;
  tankPlacer?: Tanks;
  tankState: TankState;
}

export interface GameActionsSlice {
  dispatch: Dispatch<GameActions>;
  setTankMenuOpen: (tankMenuOpen: boolean) => void;
  setTankPlacer: (tankPlacer?: Tanks) => void;
  tankDispatch: Dispatch<TankActions>;
}

export interface GameSlice {
  game: GameValuesSlice & GameActionsSlice;
}

export const gameInitialValuesState: GameValuesSlice = {
  state: initialState,
  tankMenuOpen: false,
  tankPlacer: undefined,
  tankState: initialTankState,
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
    setTankMenuOpen: (tankMenuOpen: boolean) =>
      setSlice((state) => ({ ...state, tankMenuOpen }), set),
    setTankPlacer: (tankPlacer?: Tanks) =>
      setSlice((state) => ({ ...state, tankPlacer }), set),
    tankDispatch: (action: TankActions) =>
      setSlice(
        (state) => ({
          ...state,
          tankState: tankReducer(state.tankState, action),
        }),
        set
      ),
  },
});

export default createGameSlice as (
  set: SetState<GameSlice>,
  get: GetState<GameSlice>,
  api: StoreApi<GameSlice>
) => GameSlice;
