import { create, GetState, SetState, StoreApi } from "zustand";
import { devtools, persist } from "zustand/middleware";
import createGameSlice, {
  GameActionsSlice,
  GameSlice,
  GameValuesSlice,
  gameInitialValuesState,
} from "./game";

export type RootState = GameSlice;

export type RootValuesState = {
  game: GameValuesSlice & Partial<GameActionsSlice>;
};

export const initialValuesState: RootValuesState = {
  game: gameInitialValuesState,
};

export const useTowerDefenceStore = create<RootState>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...createGameSlice(
          set as unknown as SetState<GameSlice>,
          get as GetState<GameSlice>,
          api as unknown as StoreApi<GameSlice>
        ),
      }),
      {
        name: "towerDefence",
        partialize: (state) => ({
          game: {
            // state: state.game.state,
          },
        }),
        merge: (persistedState: any, currentState) => {
          return {
            ...currentState,
            game: {
              ...currentState.game,
              ...persistedState.game,
            },
          };
        },
      }
    )
  )
);
