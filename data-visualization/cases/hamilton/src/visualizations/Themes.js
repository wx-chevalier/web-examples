import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

import Hover from '../Hover';

var fontSize = 12;
var Themes = React.createClass({
  getInitialState() {
    return {
      hovered: null
    };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.update;
  },

  componentDidMount() {
    this.container = d3.select(this.refs.container);

    this.updateThemes();
  },

  componentDidUpdate() {
    this.updateThemes();
  },

  updateThemes() {
    // only show grouped themes that aren't filtered out
    // var groupedThemes = _.filter(this.props.groupedThemes,
    //   theme => _.some(theme.diamonds, diamond => diamond.available));
    var groupedThemes = this.props.groupedThemes;
    this.themes = this.container
      .selectAll('h3')
      .data(groupedThemes, d => d.name);

    this.themes.exit().remove();

    var enter = this.themes
      .enter()
      .append('h3')
      .style('display', 'inline-block')
      .style('padding', '5px 10px')
      .style('margin', 0);

    // write theme name
    enter.append('div').text(d => d.name);

    // svg for the diamonds
    enter
      .append('svg')
      .attr('width', d => d.width)
      .attr('height', fontSize * 2);

    this.themes = enter.merge(this.themes);
    var svgs = this.themes.select('svg');

    // diamond groups
    var diamonds = svgs.selectAll('g').data(d => d.diamonds, d => d.id);

    diamonds.exit().remove();

    // enter path and text
    enter = diamonds.enter().append('g');
    enter
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', this.props.fontColor);
    enter
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-family', this.props.bodyFont)
      .attr('font-style', 'italic')
      .attr('font-size', fontSize);
    enter
      .append('rect')
      .attr('y', -fontSize)
      .attr('height', fontSize)
      .style('opacity', 0);

    // update path and text for diamonds
    diamonds = enter
      .merge(diamonds)
      .attr('transform', d => 'translate(' + [d.x, fontSize] + ')')
      .attr('opacity', d => (d.available ? (d.selected ? 1 : 0.5) : 0))
      .attr('cursor', d => (d.available ? 'pointer' : 'default'));

    diamonds
      .select('rect')
      .attr('width', d => d.x2 + fontSize / 2)
      .on('click', d => (d.available ? this.props.onSelectTheme(d.id) : null))
      .on('mouseover', d => (d.available ? this.mouseOver(d) : null))
      .on('mouseleave', d => this.mouseOver(null));

    diamonds.select('path').attr('d', this.calculateCurve);

    diamonds
      .select('text')
      .attr('x', d => d.x2)
      .text(d => d.themeType[0].toLowerCase() + d.groupId);
  },

  mouseOver(diamond) {
    if (
      (diamond && this.state.hovered && diamond.id === this.state.hovered.id) ||
      (!diamond && !this.state.hovered)
    )
      return;

    // if there's a line hovered, dismiss that
    this.props.hoverLine(null);

    var containerRect = this.refs.container.getBoundingClientRect();
    var diamondRect = d3.event.target.getBoundingClientRect();
    var top = diamondRect.top - containerRect.top + diamondRect.height + 5;
    var left = diamondRect.left - containerRect.left + diamondRect.width / 2;

    var hovered = diamond && {
      lines: diamond.lines,
      width: 250,
      top,
      left
    };
    this.setState({ hovered });
  },

  calculateCurve(diamond) {
    var cpx = Math.min(diamond.x2 * 0.25, fontSize);
    var cpy = -0.85 * fontSize;

    return (
      'M' +
      [0, 0] +
      'C' +
      [cpx, cpy] +
      ' ' +
      [diamond.x2, cpy] +
      ' ' +
      [diamond.x2, cpy]
    );
  },

  render() {
    const style = {
      display: 'inline-block',
      width: this.props.themeWidth,
      height: this.props.themeHeight,
      verticalAlign: 'top',
      textAlign: 'center',
      position: 'relative'
    };

    return (
      <div style={style}>
        <div ref="container" />
        <Hover {...this.props} {...this.state} />
      </div>
    );
  }
});

export default Themes;
