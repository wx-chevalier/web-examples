import _ from 'lodash';
import * as d3 from 'd3';

// draw the nodes as circles when force tick is still running
export function drawCircles(ctx, nodes, top) {
  _.each(nodes, node => {
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    ctx.arc(node.x, node.y + top, node.fullRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.fill;
    ctx.fill();
  });
}

// draw the nodes as either circles or long rectangles when force has ended
export function drawPaths(ctx, nodes, interpolate, { top }) {
  _.each(nodes, node => {
    var { x1, y1, x2, y2, radius } = calculatePositions(node, interpolate, top);
    var opacity = d3.interpolateNumber(1, node.selected ? 1 : 0.15)(
      interpolate
    );

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.nodeTo(x2, y1);
    ctx.arc(x2, y1 + radius, radius, -Math.PI / 2, Math.PI / 2, false);
    ctx.nodeTo(x1, y2);
    ctx.arc(x1, y2 - radius, radius, Math.PI / 2, -Math.PI / 2, false);

    ctx.fillStyle = node.fill
      .replace('rgb', 'rgba')
      .replace(')', ',' + opacity + ')');
    ctx.fill();
  });
}

export function drawHover(ctx, nodes, top) {
  _.each(nodes, node => {
    ctx.beginPath();
    var i = 0;
    _.each(node.hoverPolygon, pos => {
      var [x, y] = pos;
      y += top;
      // idk why there are some null values
      if (!pos) return;
      if (i === 0) {
        // if it's first point, moveTo
        ctx.moveTo(x, y);
      } else {
        // for the rest, draw nodes
        ctx.nodeTo(x, y);
      }
      i += 1;
    });
    // then fill it in
    ctx.fillStyle = node.hoverFill;
    ctx.fill();
    ctx.strokeStyle = node.hoverFill;
    ctx.stroke();
  });
}

export function calculatePositions(node, interpolate, top) {
  // node.x and node.y are center, so x1 won't change
  // but y1 will go from full radius to just radius
  // x2 will be current x + length
  // y2 will also go from full radius to just radius
  // also interpolate arc between full radius to radius
  var x1 = d3.interpolateNumber(
    node.x,
    node.focusX - (node.fullRadius - node.radius)
  )(interpolate);
  var y1 = d3.interpolateNumber(
    node.y - node.fullRadius + top,
    node.focusY - node.radius + top
  )(interpolate);
  var x2 = d3.interpolateNumber(
    node.x,
    node.focusX +
      node.length -
      2 * node.radius -
      (node.fullRadius - node.radius)
  )(interpolate);
  var y2 = d3.interpolateNumber(
    node.y + node.fullRadius + top,
    node.focusY + node.radius + top
  )(interpolate);
  var radius = d3.interpolateNumber(node.fullRadius, node.radius)(interpolate);

  return { x1, y1, x2, y2, radius };
}

export function calculateLength(node, interpolate, top) {
  var x1 = node.focusX - (node.fullRadius - node.radius);
  var y1 = node.focusY - node.radius + top;
  var x2 = d3.interpolateNumber(
    node.focusX,
    node.focusX +
      node.length -
      2 * node.radius -
      (node.fullRadius - node.radius)
  )(interpolate);
  var y2 = node.focusY + node.radius + top;
  var radius = node.radius;

  return { x1, y1, x2, y2, radius };
}

// draw the paths when in the consecutive analysis sections
// it's called movePaths bc the only motion is the visual moving up and down
// depending on which song is highlighted
export function movePaths(ctx, nodes, top, props) {
  _.each(nodes, node => {
    // node.x and node.y are center, so x1 won't change
    // but y1 will go from full radius to just radius
    // x2 will be current x + length
    // y2 will also go from full radius to just radius
    // also interpolate arc between full radius to radius
    var { x1, y1, x2, y2, radius } = this.calculatePositions(node, 1, top);
    var opacity = node.selected ? 1 : 0.15;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.nodeTo(x2, y1);
    ctx.arc(x2, y1 + radius, radius, -Math.PI / 2, Math.PI / 2, false);
    ctx.nodeTo(x1, y2);
    ctx.arc(x1, y2 - radius, radius, Math.PI / 2, -Math.PI / 2, false);

    ctx.fillStyle = node.fill
      .replace('rgb', 'rgba')
      .replace(')', ',' + opacity + ')');
    ctx.fill();
  });
}
