import React, { Component } from 'react';
import _ from 'lodash';

var borderRadius = 3;
var gray = '#aaa';

export default class Hover extends Component {
  render() {
    if (_.isEmpty(this.props.hovered)) {
      return <div />;
    }

    var hovered = this.props.hovered;
    var padding = 10;
    var left = hovered.left - hovered.width / 2;
    left = Math.max(left, 0);

    var style = {
      position: 'absolute',
      backgroundColor: '#fff',
      border: '1px solid ' + gray,
      borderRadius,
      boxShadow: '0 0 5px ' + gray,
      textAlign: 'left',
      fontSize: 12,
      lineHeight: 1.5,
      width: hovered.width - 2 * padding,
      left,
      top: hovered.top,
      padding,
      zIndex: 1000
    };
    var metaStyle = {
      fontSize: 9,
      color: this.props.medGray,
      verticalAlign: 'middle',
      fontStyle: 'italic',
      textAlign: 'right',
      padding: '0 5px'
    };

    var lines = _.map(hovered.lines, (line, i) => {
      return (
        <tr key={i}>
          <td style={metaStyle}>{i + 1}</td>
          <td>{line}</td>
        </tr>
      );
    });
    return (
      <div ref="summary" style={style}>
        <table>
          <tbody>{lines}</tbody>
        </table>
      </div>
    );
  }
}
