import { Tanks } from "../../shared/tanks";

interface SingleTankState {
  id: string;
  x: number;
  y: number;
  tank: Tanks;
  xp: number;
  kills: number;
}

export type TankState = {
  tanks: SingleTankState[];
  activeTank?: string;
};

type AddTank = {
  type: "ADD_TANK";
  payload: Omit<SingleTankState, "xp" | "kills">;
};

type ClickTank = {
  type: "CLICK_TANK";
  payload: string;
};

type Reset = { type: "RESET" };

export type TankActions = AddTank | ClickTank | Reset;

export const initialTankState: TankState = {
  tanks: [],
  activeTank: undefined,
};

export const tankReducer = (
  state: TankState,
  action: TankActions
): TankState => {
  switch (action.type) {
    case "RESET":
      return initialTankState;

    case "ADD_TANK":
      return {
        ...state,
        tanks: [
          ...state.tanks,
          {
            ...action.payload,
            xp: 0,
            kills: 0,
          },
        ],
      };

    case "CLICK_TANK":
      return { ...state, activeTank: action.payload };
  }
};
