import { useEffect, useState } from "react";
import {
  RootValuesState,
  initialValuesState,
  useTowerDefenceStore,
} from "./store";

export function useTowerDefenceHydratedStore<T>(
  stateFunction: (state: RootValuesState) => T
): T {
  const [state, setState] = useState<T>(stateFunction(initialValuesState));
  const zustandState = useTowerDefenceStore(stateFunction);

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
}
