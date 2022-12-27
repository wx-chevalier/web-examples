// @flow

class Renderer {
  constructor(canvas, engine, options = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.engine = engine;

    // options
    this.pixelsPerCell = options.pixelsPerCell || 5;
    this.desiredFPS = options.desiredFPS || 30;
    this.fpsNode = options.fpsNode || false;
    this.strokeStyle = options.strokeStyle || "rgba(255,118,5,0.5)";
    this.fillStyle = options.fillStyle || "rgba(222,122,39,0.5)";

    // renderer variables
    this.play = false;
    this.fpsTime = 0;
    this.engineTime = 0;
    this.fps = 0;
    this.frameNumber = 0;

    // setup canvas with correct size
    this.canvas.width = this.engine.width * this.pixelsPerCell;
    this.canvas.height = this.engine.height * this.pixelsPerCell;
  }

  togglePlay() {
    this.play = !this.play;
  }

  draw(timeStamp) {
    window.requestAnimationFrame(this.draw.bind(this));

    // display engine state on each frame
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = this.strokeStyle;
    this.context.fillStyle = this.fillStyle;
    const shouldFillRect = this.pixelsPerCell > 1;
    for (let i = 0; i < this.engine.height; i++) {
      for (let j = 0; j < this.engine.width; j++) {
        if (this.engine.cellSafe(i, j)) {
          const jPx = this.pixelsPerCell * j;
          const iPx = this.pixelsPerCell * i;
          this.context.strokeRect(
            jPx,
            iPx,
            this.pixelsPerCell,
            this.pixelsPerCell
          );
          if (shouldFillRect) {
            this.context.fillRect(
              jPx,
              iPx,
              this.pixelsPerCell,
              this.pixelsPerCell
            );
          }
        }
      }
    }

    // compute engine next step with appropriate frequency
    const engineElapsed = timeStamp - this.engineTime;
    if (engineElapsed > 1000 / this.desiredFPS && this.play) {
      this.engine.computeNextState();
      this.frameNumber += 1;
      this.engineTime = timeStamp - engineElapsed % (1000 / this.desiredFPS);
    }

    // Update FPS display every half second
    if (this.fpsNode) {
      const fpsElapsed = timeStamp - this.fpsTime;
      if (fpsElapsed > 500) {
        this.fps = 1000 / fpsElapsed * this.frameNumber;
        this.fpsNode.textContent = `${this.fps.toFixed(2)} FPS`;
        this.fpsTime = timeStamp;
        this.frameNumber = 0;
      }
    }
  }

  start() {
    this.engine.computeNextState();
    this.play = true;
    window.requestAnimationFrame(this.draw.bind(this));
  }
}

export { Renderer as default };
