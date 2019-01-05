const path = require('path');
const umdConfig = require('../../../../scripts/webpack/webpack.config.umd');

const rootPath = process.cwd();

module.exports = {
  ...umdConfig,
  entry: {
    index: path.resolve(rootPath, './src/index.ts')
  }
};
