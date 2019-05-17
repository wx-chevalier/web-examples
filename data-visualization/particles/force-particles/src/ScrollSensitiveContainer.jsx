import React, { Component } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

import RandomTiledParticles from './RandomTiledParticles';

export default class ScrollSensitiveContainer extends Component {
  state = {
    top: 0,
    prevTop: 0
  };

  componentDidMount() {
    this.onScroll();
    window.addEventListener('scroll', _.throttle(this.onScroll, 500));
  }

  onScroll = () => {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.setState({
      top: scrollTop,
      prevTop: this.state.top
    });
  };

  render() {
    const { top, prevTop } = this.state;

    return (
      <div style={{ height: 4096 }}>
        <RandomTiledParticles update={true} top={top} prevTop={prevTop} />
      </div>
    );
  }
}
