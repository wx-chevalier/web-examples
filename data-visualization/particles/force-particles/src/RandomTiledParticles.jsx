import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { crispyCanvas } from './canvas-utils';
import { generateParticleRandomly } from './particle-factory';
import { drawCircles, drawPaths } from './brush';

const duration = 300;
const simulation = d3
  .forceSimulation()
  .force('collide', d3.forceCollide().radius(d => d.radius + 3))
  .force('x', d3.forceX().x(d => d.focusX))
  .force('y', d3.forceY().y(d => d.focusY));

export default class RandomTiledParticles extends Component {
  static propTypes = {
    update: PropTypes.bool,
    width: PropTypes.number,
    vizHeight: PropTypes.number,
    top: PropTypes.number,
    prevTop: PropTypes.number
  };

  static defaultProps = {
    update: false,
    width: window.innerWidth,
    vizHeight: window.innerHeight,
    top: 0
  };

  nodes = [];
  $canvas = null;
  $hiddenCanvas = null;
  $ctx = null;
  $hiddenCtx = null;
  updating = false;
  interpolateTop = n => n;

  timer = null;

  shouldComponentUpdate(nextProps) {
    // 当位置发生变化时候，重置 Canvas
    if (nextProps.update && nextProps.vizHeight !== this.props.vizHeight) {
      crispyCanvas(this.$canvas, nextProps);
      crispyCanvas(this.$hiddenCanvas, nextProps);
    }

    return nextProps.update;
  }

  componentDidMount() {
    const { width, vizHeight } = this.props;

    crispyCanvas(this.$canvas, { width, vizHeight });
    this.$ctx = this.$canvas.getContext('2d');

    // and hidden canvas
    crispyCanvas(this.$hiddenCanvas, { width, vizHeight });
    this.$hiddenCtx = this.$hiddenCanvas.getContext('2d');

    this.generateNodes();

    simulation.on('tick', this.forceTick).on('end', this.forceEnd);
  }

  componentDidUpdate() {
    const { top, prevTop } = this.props;
    this.updating = true;

    this.interpolateTop = d3.interpolateNumber(top, prevTop);

    simulation
      .nodes(this.nodes)
      .force('charge', d3.forceManyBody())
      .alphaMin(0)
      .alpha(1)
      .restart();
  }

  componentWillUnmount() {
    if (this.timer) {
      this.timer.stop();
    }
  }

  generateNodes = () => {
    const { width, vizHeight } = this.props;
    this.nodes = generateParticleRandomly(1500, width, vizHeight);
  };

  forceTick = () => {
    const { width, vizHeight } = this.props;

    // 获取插值
    const interpolate =
      (simulation.alpha() - simulation.alphaMin()) /
      (1 - simulation.alphaMin());

    const top = this.interpolateTop(Math.max(0, interpolate));

    this.$ctx.clearRect(0, 0, width, vizHeight);

    // 绘制随机圆
    drawCircles(this.$ctx, this.nodes, top);
  };

  forceEnd = () => {
    const { top, width, vizHeight } = this.props;

    this.timer = d3.timer(elapsed => {
      this.$ctx.clearRect(0, 0, width, vizHeight);

      const interpolate = Math.min(elapsed / duration, 1);

      drawPaths(this.$ctx, this.nodes, interpolate, { top });
    });
  };

  render() {
    const style = {
      position: 'fixed'
    };

    const hiddenCanvasStyle = {
      display: 'none'
    };

    return (
      <div style={style}>
        <canvas
          ref={$ele => {
            this.$canvas = $ele;
          }}
        />
        <canvas
          ref={$ele => {
            this.$hiddenCanvas = $ele;
          }}
          style={hiddenCanvasStyle}
        />
      </div>
    );
  }
}
