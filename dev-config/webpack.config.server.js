/**
 * Created by apple on 16/7/27.
 */
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};

//遍历所有的NodeModules以防止意外引入
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './server/server_blog.js',
  target: 'node',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server_blog.bundle.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel"
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false})
  ],
  devtool: 'sourcemap'
};
