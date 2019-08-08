const path = require('path')
const alias = require('../alias')

module.exports = {
  entry: {
    logic: path.resolve(__dirname, 'logic.js')
  },
  output: {
    path: path.resolve(__dirname, 'src/lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  // devtool: '#inline-source-map',
  resolve: {
    alias,
    extensions: ['.json', '.js']
  },
  target: 'node'
}
