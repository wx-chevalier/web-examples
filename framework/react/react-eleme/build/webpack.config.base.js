
const path = require('path')
const Happypack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'stores': path.resolve(__dirname, '../src/stores'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=js',
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, '../src/assets/svg'),
        options: {
          name: '[name]',
          prefixize: true
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        exclude: path.resolve(__dirname, '../src/assets/svg'),
        options: {
          name: 'static/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new Happypack({
      id: 'js',
      threads: 4,
      loaders: ['babel-loader']
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static')
      }
    ])
  ]
}
