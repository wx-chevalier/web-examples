const { externals } = require('@wx/rtw-core');
const path = require('path');
const merge = require('webpack-merge');

const devConfig = require('../../../../scripts/webpack/webpack.config.dev');

module.exports = merge(devConfig, {
  devServer: {
    contentBase: path.resolve(__dirname, '../../public')
  },
  externals,
  output: {
    libraryTarget: 'umd'
  }
});
