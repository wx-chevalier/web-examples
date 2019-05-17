import * as d3 from 'd3';
import _ from 'lodash';

const COLORS = [
  'rgb(149,65,200)',
  'rgb(53,169,147)',
  'rgb(0,91,157)',
  'rgb(81,182,201)',
  'rgb(0,134,152)',
  'rgb(0,89,106)',
  'rgb(81,173,223)',
  'rgb(204,119,170)',
  'rgb(220,201,107)',
  'rgb(224,118,90)',
  'rgb(241,155,111)',
  'rgb(204,55,60)',
  'rgb(100,0,0)',
  'rgb(182,232,111)',
  'rgb(109,219,196)',
  'rgb(164,23,80)',
  'rgb(169,219,99)',
  'rgb(157,207,87)',
  'rgb(204,54,98)',
  'rgb(70,129,206)',
  'rgb(247,215,131)'
];

const radiusScale = d3.scaleLinear().domain([1, 5]);

/** 随机生成很多的粒子点 */
export function generateParticleRandomly(num, width) {
  radiusScale.range([6, 15]);

  const nodes = Array.from({
    length: num
  }).map(() => {
    const x = _.random(0, width);
    const y = _.random(-window.innerHeight * 1.5, window.innerHeight * 2.5);

    const radius = Math.floor(radiusScale(_.random(1, 2)));

    return {
      x,
      y,
      focusX: x,
      focusY: y,
      trueY: y,
      radius: radius / 2,
      fullRadius: radius / 2,
      length: radius,
      fill: COLORS[_.random(0, COLORS.length - 1)]
    };
  });

  return nodes;
}
