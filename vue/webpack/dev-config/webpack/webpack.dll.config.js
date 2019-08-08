const path = require('path');
const webpack = require('webpack');

const pkg = require('../../package.json');

let dllConfig = {
  name: 'vendor',
  entry: Object.keys(pkg.dependencies),
  output: {
    path: path.resolve(__dirname, '../../public/dll'),
    filename: 'vendor.bundle.js',
    library: 'vendor_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_[hash]',
      path: path.resolve(__dirname, '../../public/dll/manifest.json'),
    }),
  ],
};

module.exports = dllConfig;
