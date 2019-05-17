import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

var fontSize = 9;
var Diamonds = {
  drawCurves(ctx, themes, interpolate, props) {
    ctx.fillStyle = props.fontColor;
    ctx.strokeStyle = props.fontColor;
    ctx.textAlign = 'center';
    ctx.font = 'italic ' + fontSize + 'px ' + props.bodyFont;
    _.each(themes, theme => {
      var name = theme.themeType[0].toLowerCase() + theme.groupId;
      var x = d3.interpolateNumber(theme.x1, theme.x2 - fontSize)(interpolate);
      var y = theme.y1 + props.top - 1;

      // first clear the background for the theme to avoid overlap
      ctx.clearRect(x - fontSize / 2, y - fontSize, fontSize, fontSize);

      if (theme.endLine - theme.startLine > 1) {
        // only draw a curve if there are more than 2 lines
        var cpx = Math.min((x - theme.x1) * 0.25, fontSize) + theme.x1;
        var cpy = y - 0.85 * fontSize;
        ctx.moveTo(theme.x1, y);
        ctx.bezierCurveTo(cpx, cpy, x, cpy, x, cpy);
        ctx.stroke();
      }

      ctx.fillText(name, x, y);
    });
  },

  moveCurves(ctx, themes, top, props) {
    ctx.fillStyle = props.fontColor;
    ctx.strokeStyle = props.fontColor;
    ctx.textAlign = 'center';
    ctx.font = 'italic ' + fontSize + 'px ' + props.bodyFont;
    _.each(themes, theme => {
      var name = theme.groupedThemeId;
      var x = theme.x2 - fontSize;
      var y = theme.y1 + top - 1;

      // first clear the background for the theme to avoid overlap
      ctx.clearRect(x - fontSize / 2, y - fontSize, fontSize, fontSize);

      if (theme.endLine - theme.startLine > 1) {
        // only draw a curve if there are more than 2 lines
        var cpx = Math.min((x - theme.x1) * 0.25, fontSize) + theme.x1;
        var cpy = y - 0.85 * fontSize;
        ctx.moveTo(theme.x1, y);
        ctx.bezierCurveTo(cpx, cpy, x, cpy, x, cpy);
        ctx.stroke();
      }

      ctx.fillText(name, x, y);
    });
  }
};

export default Diamonds;
