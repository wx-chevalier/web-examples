// @flow

class JSEngine {
  constructor(width, height) {
    this.wasm = false;
    this.width = width;
    this._width = width + 2;
    this.height = height;
    this._height = height + 2;
    this.module = { calledRun: true };
  }

  init() {
    const buffer = new ArrayBuffer(this._width * this._height);
    this._current = new Uint8Array(buffer);
    const nextBuffer = new ArrayBuffer(this._width * this._height);
    this._next = new Uint8Array(nextBuffer);
    this.module = { calledRun: true };
  }

  index(i, j) {
    return i * this._width + j;
  }

  cell(i, j) {
    return this._current[this.index(i, j)];
  }

  cellSafe(i, j) {
    return this._current[(i + 1) * this._width + j + 1];
  }

  next(i, j) {
    return this._next[this.index(i, j)];
  }

  loopCurrentState() {
    for (let j = 1; j < this._width + 1; j++) {
      this._current[this.index(0, j)] = this._current[
        this.index(this._height - 2, j)
      ];
      this._current[this.index(this._height - 1, j)] = this._current[
        this.index(1, j)
      ];
    }
    for (let i = 1; i < this._height + 1; i++) {
      this._current[this.index(i, 0)] = this._current[
        this.index(i, this._width - 2)
      ];
      this._current[this.index(i, this._width - 1)] = this._current[
        this.index(i, 1)
      ];
    }
    this._current[this.index(0, 0)] = this._current[
      this.index(this._height - 2, this._width - 2)
    ];
    this._current[this.index(0, this._width - 1)] = this._current[
      this.index(this._height - 2, 1)
    ];
    this._current[this.index(this._height - 1, 0)] = this._current[
      this.index(1, this._width - 2)
    ];
    this._current[
      this.index(this._height - 1, this._width - 1)
    ] = this._current[this.index(1, 1)];
  }

  computeNextState() {
    let neighbors, iM1, iP1, i_, jM1, jP1;

    this.loopCurrentState();

    for (let i = 1; i < this._height - 1; i++) {
      iM1 = (i - 1) * this._width;
      iP1 = (i + 1) * this._width;
      i_ = i * this._width;
      for (let j = 1; j < this._width - 1; j++) {
        jM1 = j - 1;
        jP1 = j + 1;
        neighbors = this._current[iM1 + jM1];
        neighbors += this._current[iM1 + j];
        neighbors += this._current[iM1 + jP1];
        neighbors += this._current[i_ + jM1];
        neighbors += this._current[i_ + jP1];
        neighbors += this._current[iP1 + jM1];
        neighbors += this._current[iP1 + j];
        neighbors += this._current[iP1 + jP1];
        if (neighbors === 3) {
          this._next[i_ + j] = 1;
        } else if (neighbors === 2) {
          this._next[i_ + j] = this._current[i_ + j];
        } else {
          this._next[i_ + j] = 0;
        }
      }
    }
    this._current.set(this._next);
  }

  set(i, j, value = 1) {
    this._current[this.index(i, j)] = value;
  }

  setNext(i, j, value = 1) {
    this._next[this.index(i, j)] = value;
  }
}

export { JSEngine as default };
