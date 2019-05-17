import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

var Lines = {
  // draw the lines as circles when force tick is still running
  drawCircles(ctx, lines, top) {
    _.each(lines, line => {
      ctx.beginPath();
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      ctx.arc(line.x, line.y + top, line.fullRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = line.fill;
      ctx.fill();
    });
  },

  calculatePositions(line, interpolate, top) {
    // line.x and line.y are center, so x1 won't change
    // but y1 will go from full radius to just radius
    // x2 will be current x + length
    // y2 will also go from full radius to just radius
    // also interpolate arc between full radius to radius
    var x1 = d3.interpolateNumber(
      line.x,
      line.focusX - (line.fullRadius - line.radius)
    )(interpolate);
    var y1 = d3.interpolateNumber(
      line.y - line.fullRadius + top,
      line.focusY - line.radius + top
    )(interpolate);
    var x2 = d3.interpolateNumber(
      line.x,
      line.focusX +
        line.length -
        2 * line.radius -
        (line.fullRadius - line.radius)
    )(interpolate);
    var y2 = d3.interpolateNumber(
      line.y + line.fullRadius + top,
      line.focusY + line.radius + top
    )(interpolate);
    var radius = d3.interpolateNumber(line.fullRadius, line.radius)(
      interpolate
    );

    return { x1, y1, x2, y2, radius };
  },

  calculateLength(line, interpolate, top) {
    var x1 = line.focusX - (line.fullRadius - line.radius);
    var y1 = line.focusY - line.radius + top;
    var x2 = d3.interpolateNumber(
      line.focusX,
      line.focusX +
        line.length -
        2 * line.radius -
        (line.fullRadius - line.radius)
    )(interpolate);
    var y2 = line.focusY + line.radius + top;
    var radius = line.radius;

    return { x1, y1, x2, y2, radius };
  },

  // draw the lines as either circles or long rectangles when force has ended
  drawPaths(ctx, lines, interpolate, props) {
    _.each(lines, line => {
      var { x1, y1, x2, y2, radius } = this.calculatePositions(
        line,
        interpolate,
        props.top
      );
      var opacity = d3.interpolateNumber(1, line.selected ? 1 : 0.15)(
        interpolate
      );

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y1);
      ctx.arc(x2, y1 + radius, radius, -Math.PI / 2, Math.PI / 2, false);
      ctx.lineTo(x1, y2);
      ctx.arc(x1, y2 - radius, radius, Math.PI / 2, -Math.PI / 2, false);

      ctx.fillStyle = line.fill
        .replace('rgb', 'rgba')
        .replace(')', ',' + opacity + ')');
      ctx.fill();
    });
  },

  // draw the paths when in the consecutive analysis sections
  // it's called movePaths bc the only motion is the visual moving up and down
  // depending on which song is highlighted
  movePaths(ctx, lines, top, props) {
    _.each(lines, line => {
      // line.x and line.y are center, so x1 won't change
      // but y1 will go from full radius to just radius
      // x2 will be current x + length
      // y2 will also go from full radius to just radius
      // also interpolate arc between full radius to radius
      var { x1, y1, x2, y2, radius } = this.calculatePositions(line, 1, top);
      var opacity = line.selected ? 1 : 0.15;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y1);
      ctx.arc(x2, y1 + radius, radius, -Math.PI / 2, Math.PI / 2, false);
      ctx.lineTo(x1, y2);
      ctx.arc(x1, y2 - radius, radius, Math.PI / 2, -Math.PI / 2, false);

      ctx.fillStyle = line.fill
        .replace('rgb', 'rgba')
        .replace(')', ',' + opacity + ')');
      ctx.fill();
    });
  },

  drawHover(ctx, lines, top) {
    _.each(lines, line => {
      ctx.beginPath();
      var i = 0;
      _.each(line.hoverPolygon, pos => {
        var [x, y] = pos;
        y += top;
        // idk why there are some null values
        if (!pos) return;
        if (i === 0) {
          // if it's first point, moveTo
          ctx.moveTo(x, y);
        } else {
          // for the rest, draw lines
          ctx.lineTo(x, y);
        }
        i += 1;
      });
      // then fill it in
      ctx.fillStyle = line.hoverFill;
      ctx.fill();
      ctx.strokeStyle = line.hoverFill;
      ctx.stroke();
    });
  }
};

export default Lines;
