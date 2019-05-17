import React, { Component } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

import Hover from '../Hover';

export default class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: null
    };
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.update;
  }

  componentDidMount() {
    this.container = d3
      .select(this.refs.images)
      .attr(
        'transform',
        'translate(' +
          [this.props.characterWidth / 2, this.props.characterHeight / 2] +
          ')'
      );
    this.defineFilters();

    this.updateLinks();
    this.updateImages();
  }

  componentDidUpdate() {
    this.updateLinks();
    this.updateImages();
  }

  updateImages = () => {
    this.images = this.container
      .selectAll('g')
      .data(this.props.characterNodes, d => d.id);

    this.images.exit().remove();

    var enter = this.images
      .enter()
      .append('g')
      .classed('image', true);

    enter
      .append('circle')
      .classed('bg', true)
      .attr('fill', '#fff');
    enter.append('image');
    enter
      .append('circle')
      .classed('ring', true)
      .attr('fill', 'none')
      .attr('stroke-width', 2);

    this.images = enter
      .merge(this.images)
      .attr('transform', (d, i) => 'translate(' + [d.x, d.y] + ')')
      .style('cursor', d => (d.available ? 'pointer' : 'default'))
      .on('click', d => d.available && this.props.onSelectCharacter(d.id))
      .on('mouseover', d => (d.available ? this.mouseoverCharacter(d) : null))
      .on('mouseleave', d => this.mouseoverCharacter(null));

    this.images.selectAll('.bg').attr('r', d => d.radius);
    this.images
      .selectAll('image')
      .attr('width', d => d.radius * 2)
      .attr('height', d => d.radius * 2)
      .attr('x', d => -d.radius)
      .attr('y', d => -d.radius)
      .attr('xlink:href', d => this.props.images[d.id])
      .attr('filter', d => (!d.selected && !d.filtered ? 'url(#gray)' : ''))
      .attr('opacity', d => {
        if (d.selected) return 1;
        if (d.filtered) return 0.5;
        if (d.available) return 1;
        return 0;
      });
    this.images
      .selectAll('.ring')
      .attr('r', d => d.radius)
      .attr('stroke', d =>
        !d.selected && !d.filtered ? this.props.gray : d.color
      )
      .attr('opacity', d =>
        !d.available ? 0 : !d.selected && d.filtered ? 0.5 : 1
      );
  };

  updateLinks = () => {
    this.links = this.container
      .selectAll('path')
      .data(this.props.characterLinks, d => d.id);

    this.links.exit().remove();

    this.links = this.links
      .enter()
      .insert('path', '.image')
      .attr('fill', 'none')
      .merge(this.links)
      .attr('d', this.calcualteLinkPath)
      .attr('stroke', d =>
        d.selected || d.filtered ? d.color : this.props.gray
      )
      .on('click', d => d.available && this.props.onSelectConversation(d.id))
      .on('mouseover', d => d.available && this.mouseoverLink(d))
      .on('mouseleave', d => d.available && this.mouseoverLink(null))
      .style('cursor', d => (d.available ? 'pointer' : 'default'))
      .attr('opacity', d => {
        if (!d.available) return 0;
        if (d.selected) return 1;
        if (!d.selected && d.filtered) return 0.25;
        return 0.75;
      });
    // .transition()
    // .duration(500)
    // .attr('stroke-width', d => (d.available ? d.weight : 2));
  };

  calcualteLinkPath = link => {
    var x1, x2, y1, y2;
    var spaceApart = 30;
    if (link.source.x < link.target.x) {
      x1 = link.source.x;
      y1 = link.source.y - link.weight / 2;
      x2 = link.target.x;
      y2 = link.target.y - link.weight / 2;

      // if points are within 10px of each other horizontally
      // push it apart
      if (x2 - x1 < spaceApart) {
        x1 -= link.weight / 2;
        x2 -= link.weight / 2;
      }
    } else {
      x1 = link.target.x;
      y1 = link.target.y + link.weight / 2;
      x2 = link.source.x;
      y2 = link.source.y + link.weight / 2;

      // if points are within 10px of each other horizontally
      // push it apart
      if (x2 - x1 < spaceApart) {
        x1 += link.weight / 2;
        x2 += link.weight / 2;
      }
    }

    // if it's on same level, then curve if not straight line
    var curve = y1 === y2 ? (x2 - x1) / 4 : 0;
    var cx1 = x1 + curve;
    var cy1 = y1 + curve;
    var cx2 = x2 - curve;
    var cy2 = y1 + curve;
    return (
      'M' + [x1, y1] + ' C' + [cx1, cy1] + ' ' + [cx2, cy2] + ' ' + [x2, y2]
    );
  };

  defineFilters = () => {
    var defs = this.container.append('defs');
    var gray = defs.append('filter').attr('id', 'gray');
    gray
      .append('feColorMatrix')
      .attr('type', 'matrix')
      .attr('values', '1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 1 0');
  };

  mouseoverCharacter = character => {
    if (
      (character &&
        this.state.hovered &&
        character.id === this.state.hovered.id) ||
      (!character && !this.state.hovered)
    )
      return;

    // if there's a line hovered, dismiss that
    this.props.hoverLine(null);

    var hovered = character && {
      lines: [character.name],
      width: 180,
      top: character.y + this.props.characterHeight / 2 + character.radius + 5,
      left: character.x + this.props.characterWidth / 2
    };

    this.setState({ hovered });
  };

  mouseoverLink = link => {
    if (
      (link && this.state.hovered && link.id === this.state.hovered.id) ||
      (!link && !this.state.hovered)
    )
      return;

    // if there's a line hovered, dismiss that
    this.props.hoverLine(null);

    var [x, y] = d3.mouse(this.refs.container);
    var hovered = link && {
      lines: [link.source.name, 'to ' + link.target.name],
      width: 200,
      top: y + 5,
      left: x
    };

    this.setState({ hovered });
  };

  render() {
    var style = {
      position: 'relative'
    };

    return (
      <div style={style}>
        <svg
          ref="container"
          width={this.props.characterWidth}
          height={this.props.characterHeight}
        >
          <g ref="images" className="images" />
        </svg>
        <Hover {...this.props} {...this.state} />
      </div>
    );
  }
}
