import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import textures from 'textures';
import isMobile from 'ismobilejs';

import Lines from './Lines';
import Diamonds from './Diamonds';
import Songs from './Songs';

var sf = isMobile.phone ? 1 : 2;
var duration = 300;
var simulation = d3
  .forceSimulation()
  .force('collide', d3.forceCollide().radius(d => d.radius + 3))
  .force('x', d3.forceX().x(d => d.focusX))
  .force('y', d3.forceY().y(d => d.focusY));

var Visualization = React.createClass({
  shouldComponentUpdate(nextProps) {
    // update is true when we've entered a new section or interacted with the filter
    // so if update is false, it must be something that doesn't trigger visualization positions to change
    // also if vizHeight has changed
    if (nextProps.update && nextProps.vizHeight !== this.props.vizHeight) {
      this.crispyCanvas(this.refs.canvas, nextProps, sf);
      this.crispyCanvas(this.refs.hiddenCanvas, nextProps, sf);
      this.ctx.scale(sf, sf);
      this.hiddenCtx.scale(sf, sf);
    }

    return nextProps.update;
  },

  componentDidMount() {
    // make canvas crispy
    this.crispyCanvas(this.refs.canvas, this.props, sf);
    this.ctx = this.refs.canvas.getContext('2d');
    this.ctx.scale(sf, sf);
    // and hidden canvas
    this.crispyCanvas(this.refs.hiddenCanvas, this.props, sf);
    this.hiddenCtx = this.refs.hiddenCanvas.getContext('2d');
    this.hiddenCtx.scale(sf, sf);

    simulation
      .on('tick', this.forceTick)
      .on('end', this.forceEnd)
      .stop();
  },

  componentDidUpdate() {
    this.updating = true;

    if (this.props.useForce) {
      // because we're using alpha which goes towards 0
      // the top we're going towards must be 0
      this.interpolateTop = d3.interpolateNumber(
        this.props.top,
        this.props.prevTop
      );
      simulation
        .nodes(this.props.linePositions)
        .force('charge', this.props.random ? d3.forceManyBody() : null)
        .alphaMin(this.props.random ? 0 : 0.5)
        .alpha(1)
        .restart();
    } else {
      // as soon as this comes in, make sure to stop the simulation
      simulation.stop();
      this.interpolateTop = d3.interpolateNumber(
        this.props.prevTop,
        this.props.top
      );
      this.positionNoForce();
    }
  },

  crispyCanvas(canvas, props, sf) {
    canvas.width = props.width * sf;
    canvas.height = props.vizHeight * sf;
    canvas.style.width = props.width + 'px';
    canvas.style.height = props.vizHeight + 'px';
  },

  forceTick() {
    var interpolate =
      (simulation.alpha() - simulation.alphaMin()) /
      (1 - simulation.alphaMin());
    var top = this.interpolateTop(Math.max(0, interpolate));

    this.ctx.clearRect(0, 0, this.props.width, this.props.vizHeight);

    // 绘制随机圆
    Lines.drawCircles(this.ctx, this.props.linePositions, top);
  },

  forceEnd() {
    var t = d3.timer(elapsed => {
      this.ctx.clearRect(0, 0, this.props.width, this.props.vizHeight);

      var interpolate = Math.min(elapsed / duration, 1);
      // Diamonds.drawCurves(
      //   this.ctx,
      //   this.props.diamondPositions,
      //   interpolate,
      //   this.props
      // );
      // Songs.drawLines(
      //   this.ctx,
      //   this.props.songPositions,
      //   interpolate,
      //   this.props
      // );
      // Lines.drawPaths(
      //   this.ctx,
      //   this.props.linePositions,
      //   interpolate,
      //   this.props
      // );
      // Songs.highlightSong(
      //   this.ctx,
      //   this.props.songPositions,
      //   this.props.top,
      //   interpolate
      // );
      // if (elapsed > duration) {
      //   this.hiddenCtx.clearRect(0, 0, this.props.width, this.props.vizHeight);
      //   Lines.drawHover(
      //     this.hiddenCtx,
      //     this.props.linePositions,
      //     this.props.top
      //   );
      //   this.updating = false;
      //   t.stop();
      // }
    });
  },

  positionNoForce() {
    var t = d3.timer(elapsed => {
      this.ctx.clearRect(0, 0, this.props.width, this.props.vizHeight);

      var interpolate = Math.min(elapsed / duration, 1);
      var top = this.interpolateTop(interpolate);

      Diamonds.moveCurves(
        this.ctx,
        this.props.diamondPositions,
        top,
        this.props
      );
      Songs.moveLines(this.ctx, this.props.songPositions, top, this.props);
      Lines.movePaths(this.ctx, this.props.linePositions, top, this.props);
      Songs.highlightSong(this.ctx, this.props.songPositions, top, interpolate);
      if (elapsed > duration) {
        this.hiddenCtx.clearRect(0, 0, this.props.width, this.props.vizHeight);
        Lines.drawHover(
          this.hiddenCtx,
          this.props.linePositions,
          this.props.top
        );
        this.updating = false;
        t.stop();
      }
    });
  },

  render() {
    var style = {
      // border: '1px solid',
      position:
        this.props.section && this.props.section.consecutive
          ? 'fixed'
          : 'relative',
      // if it's a consecutive section then use the calculated top (that vertically centers the lines)
      // else use that section's top that we're currently in
      top: this.props.section
        ? this.props.section.consecutive
          ? this.props.top
          : this.props.section.top
        : this.props.scrollTop
    };
    var hiddenCanvasStyle = {
      display: 'none'
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // zIndex: -1,
    };
    var svgStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.vizHeight,
      pointerEvents: 'none'
    };

    return (
      <div style={style}>
        <canvas ref="canvas" />
        <canvas ref="hiddenCanvas" style={hiddenCanvasStyle} />
      </div>
    );
  }
});

export default Visualization;
