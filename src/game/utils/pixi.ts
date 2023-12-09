import { Application, Ticker } from "pixi.js";

export class PixiApp extends Application {
  constructor(width?: number, height?: number) {
    super();
    // this.renderer.resize(width || 800, height || 600);
    this.init({ width, height });
    this.ticker = new Ticker();
  }

  public addToDOM(element: HTMLElement): void {
    const interval = setInterval(() => {
      if (this.renderer.view.canvas) {
        element.appendChild(
          this.renderer.view.canvas as unknown as HTMLElement
        );
        clearInterval(interval);
      }
    }, 100);
  }
}
