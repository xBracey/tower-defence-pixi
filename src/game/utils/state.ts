export type IReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export class ReactState<T> {
  public state: T;
  public setState: React.Dispatch<React.SetStateAction<T>>;

  constructor([state, setState]: IReactState<T>) {
    this.state = state;
    this.setState = setState;
  }

  public updateState = (state: React.SetStateAction<T>): void => {
    if (!this.setState) {
      throw new Error("setState not defined");
    }

    this.setState(state);

    if (typeof state === "function") {
      const stateAction = state as (prevState: T) => T;
      this.state = stateAction(this.state);
    } else {
      this.state = state;
    }
  };

  public getState = (): T => {
    return this.state;
  };
}
