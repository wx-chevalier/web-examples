// @flow

import React, { PureComponent } from "react";
import WayOfLife from "./game/WayOfLife";
import Counter from "./counter/Counter";

export default class WebAssembly extends PureComponent {
  render() {
    return (
      <section
        style={{
          height: "90%"
        }}
      >
        <Counter />
        <WayOfLife />
      </section>
    );
  }
}
