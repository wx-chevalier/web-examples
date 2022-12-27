// @flow
import React, { Component } from "react";

import JSEngine from "./engine/JSEngine";
import WASMEngine from "./engine/WASMEngine";
import { acorn } from "./render/patterns";
import Renderer from "./render/renderer";

import "./WayOfLife.scss";

/**
 * Description 简单游戏
 */
export default class WayOfLife extends Component {
  state = {
    desiredFPS: 60,
    pixelsPerCell: 5,
    useWASM: false,
    isPlaying: true
  };

  get usedEngine() {
    if (this.state.useWASM) {
      return this.wasmEngine;
    } else {
      return this.jsEngine;
    }
  }

  componentDidMount() {
    // 获取 Canvas 句柄
    this.canvas = document.querySelector("#universe");

    const width = ~~(this.canvas.clientWidth / this.state.pixelsPerCell);
    const height = ~~(this.canvas.clientHeight / this.state.pixelsPerCell);

    this.wasmEngine = new WASMEngine(width, height);
    this.jsEngine = new JSEngine(width, height);

    this.renderer = new Renderer(this.canvas, this.usedEngine, {
      desiredFPS: this.state.desiredFPS,
      pixelsPerCell: this.state.pixelsPerCell,
      fpsNode: document.querySelector("#fps-info"),
      strokeStyle: "rgba(255,118,5,0.5)",
      fillStyle: "rgba(222,122,39,0.5)"
    });

    // allocate the engines state memory
    this.wasmEngine.init();
    this.jsEngine.init();

    console.log(~~(height / 2));

    // initialize some cells at the center
    acorn(this.wasmEngine, ~~(height / 2), ~~(width / 2));
    // acorn(this.wasmEngine, 0, 0);
    acorn(this.jsEngine, ~~(height / 2), ~~(width / 2));
    // acorn(this.jsEngine, 0, 0);

    // start
    this.renderer.start();
  }

  render() {
    return (
      <section className="WayOfLife__container">
        <canvas id="universe" />
        <div id="fps-info" />
        <section className="content controls">
          <button
            className="btn--raised btn--primary"
            id="ctrl-play-pause"
            onClick={() => {
              this.renderer.togglePlay();
              this.setState({
                isPlaying: !this.state.isPlaying
              });
            }}
          >
            {this.state.isPlaying ? "暂停" : "开始"}
          </button>
          <button
            className="btn--raised btn--secondary"
            id="ctrl-engine"
            onClick={() => {
              this.setState({
                useWASM: !this.state.useWASM
              });
            }}
          >
            {this.state.useWASM ? "使用 JS 引擎" : "使用 WASM 引擎"}
          </button>
          <br />
          <small>
            Made with ☮ by <a href="http://www.openbloc.fr">Maxime R.</a>
            <br />
            Modified by <a href="http://www.openbloc.fr">王下邀月熊</a>
          </small>
        </section>
      </section>
    );
  }
}
