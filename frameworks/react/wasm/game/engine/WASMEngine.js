// @flow

import EngineWASM from "./wasm/engine.wasm";

export default class WASMEngine {
  constructor(width, height) {
    this.wasm = true;
    this.width = width;
    this.height = height;
    this.module = new EngineWASM({
      env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new window.WebAssembly.Memory({ initial: 1024 }),
        table: new window.WebAssembly.Table({ initial: 0, element: "anyfunc" }),
        _malloc: size => {
          let buffer = new ArrayBuffer(size);
          return new Uint8Array(buffer);
        },
        _memcpy: (source, target, size) => {
          let sourceEnd = source.byteLength;

          let i, j;

          for (
            (i = 0), (j = 0), (k = new Uint8Array(target)), (l = new Uint8Array(
              source
            ));
            i < sourceEnd;
            ++i, ++j
          )
            k[j] = l[i];
        }
      }
    });
  }

  init() {
    // _init returns a pointer to the array of the current game state
    // we'll save it to have a fast access to the state in cellSafe
    this.currentAdress = this.module.exports._init(this.width, this.height);
  }

  cellSafe(i, j) {
    // cellSafe should only be called when we know i and j are within
    // the bounds of the game state array.
    return this.module.HEAP8[
      this.currentAdress + (i + 1) * (this.width + 2) + j + 1
    ];
  }

  computeNextState() {
    this.module.exports._computeNextState();
  }

  set(i, j, value = 1) {
    this.module.exports._set(i, j, value);
  }
}
