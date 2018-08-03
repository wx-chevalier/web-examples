const path = require('path');

const prodConfig = require('./webpack.config.prod');
const { libraryName, libraryEntry = 'index.js' } = require('../package.json');

const PATHS = {
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
};

const umdConfig = {
  ...prodConfig,
  entry: path.join(PATHS.src, libraryEntry),
  output: {
    filename: '[name].umd.js',
    path: PATHS.build,
    sourceMapFilename: '[name].map',
    library: libraryName,
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components'
    }
  }
};

delete umdConfig.optimization;

module.exports = umdConfig;
