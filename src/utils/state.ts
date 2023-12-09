export class ReactState<T> {
  public state: T;
  public setState: React.Dispatch<React.SetStateAction<T>>;

  constructor(
    initialState: T,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) {
    this.state = initialState;
    this.setState = setState;
  }

  public updateState = (state: T): void => {
    if (!this.setState) {
      throw new Error("setState not defined");
    }

    this.setState(state);
    this.state = state;
  };
}
