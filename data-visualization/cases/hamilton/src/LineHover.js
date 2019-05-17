import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

var width = 360;
var maxHeight = 300;
var borderRadius = 3;
var gray = '#aaa';
var LineHover = React.createClass({
  shouldComponentUpdate(nextProps) {
    // update if there's hover OR there's no hover
    // but it's not music playing either
    return nextProps.hovered || !nextProps.playing;
  },

  renderImage() {
    var hovered = this.props.hovered;
    var headerHeight = 40;
    var imageSize = 50;
    var headerStyle = {
      backgroundColor: hovered.fill,
      borderTopRightRadius: borderRadius,
      borderTopLeftRadius: borderRadius,
      height: headerHeight,
      borderBottom: '1px solid ' + gray
    };
    var titleStyle = {
      marginTop: imageSize / 2 + 10,
      fontSize: 15,
      padding: '0 40px'
    };
    var imageStyle = {
      width: imageSize,
      marginTop: headerHeight - imageSize / 2
    };

    return (
      <div>
        <div style={headerStyle}>
          <img
            style={imageStyle}
            src={this.props.images[hovered.characterId]}
            role="presentation"
          />
        </div>
        <h3 style={titleStyle}>
          {hovered.characterName}
          <div style={{ fontSize: 12 }}>in "{hovered.songName}"</div>
        </h3>
      </div>
    );
  },

  renderLines() {
    var hovered = this.props.hovered;
    var linesStyle = {
      fontSize: 12,
      lineHeight: 1.5,
      padding: '0 10px 10px 10px',
      textAlign: 'left',
      overflowY: 'scroll',
      maxHeight: maxHeight - 100
    };
    var metaStyle = {
      fontSize: 9,
      color: this.props.medGray,
      verticalAlign: 'middle',
      fontStyle: 'italic',
      textAlign: 'right',
      padding: '0 5px'
    };
    var lines = _.map(hovered.data[2], (line, i) => {
      var lineNum = hovered.startLine + i + 1;
      var themes = _.chain(hovered.themes)
        .filter(theme => theme[1] <= lineNum && lineNum <= theme[2])
        .map(3)
        .uniq()
        .value()
        .join(', ');

      return (
        <tr key={i}>
          <td style={Object.assign({ width: 12 }, metaStyle)}>{lineNum}</td>
          <td>{line}</td>
          <td style={metaStyle}>{themes}</td>
        </tr>
      );
    });

    return (
      <div style={linesStyle}>
        <table style={{ width: '100%' }}>
          <tbody>{lines}</tbody>
        </table>
      </div>
    );
  },

  calculatePosition() {
    var hovered = this.props.hovered;

    var scrollLeft = d3.event.clientX - d3.mouse(d3.select('canvas').node())[0];
    var scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (this.props.section && this.props.section.consecutive) {
      // if it's in the consecutive sections
      scrollTop = this.props.top;
    } else if (this.props.section) {
      scrollTop = this.props.section.top - scrollTop;
    }

    // find the center of the line then subtract the width
    var left = hovered.focusX + hovered.length / 2 - width / 2 + scrollLeft;
    // check if it goes out of bounds
    if (left < 0) {
      left = scrollLeft;
    } else if (left + width > this.props.width) {
      left = this.props.width - width + scrollLeft;
    }

    // top should be 5 pixels below the radius
    var verticalPadding = 5;
    var y = hovered.trueY || hovered.focusY;
    var windowHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    var top = y + hovered.fullRadius + 1 * verticalPadding + scrollTop;
    var bottom;
    // if the top is more than the height, and it's not mobile
    // have to set the bottom instead
    if (!this.props.isMobile && top + maxHeight > windowHeight) {
      bottom =
        windowHeight -
        (y - hovered.fullRadius + 1.5 * verticalPadding + scrollTop);
    }

    var positions = { left };
    if (!bottom) {
      positions.top = top;
    } else {
      positions.bottom = bottom;
    }

    return positions;
  },

  render() {
    if (_.isEmpty(this.props.hovered)) {
      return <div />;
    }

    var style = Object.assign(
      {
        position: 'fixed',
        backgroundColor: '#fff',
        border: '1px solid ' + gray,
        borderRadius,
        boxShadow: '0 0 5px ' + gray,
        textAlign: 'center',
        width
      },
      this.calculatePosition()
    );

    return (
      <div ref="summary" style={style}>
        {this.renderImage()}
        {this.renderLines()}
      </div>
    );
  }
});

LineHover.displayName = 'LineHover';

export default LineHover;
