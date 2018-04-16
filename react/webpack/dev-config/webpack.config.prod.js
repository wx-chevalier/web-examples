const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const config = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      ...baseConfig.module.rules.filter(
        rule =>
          ![
            '/\\.css$/',
            '/antdTheme\\.less$/',
            '/\\.less$/',
            '/\\.(scss|sass)$/'
          ].includes(rule.test.toString())
      ),
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /antdTheme\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /antdTheme/,
        use: [
          MiniCssExtractPlugin.loader,
          baseConfig.extra.moduleCSSLoader,
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          baseConfig.extra.moduleCSSLoader,
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    })

    // 使用 Prepack 优化包体大小
    // 暂时存在 Bug,等待修复
    // 使用前 21 - 425
    // 使用后 21 - 433
    // new PrepackWebpackPlugin({
    //   mathRandomSeed: '0'
    // }),

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // })
  ],
  optimization: {
    ...baseConfig.optimization,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        ...baseConfig.optimization.splitChunks.cacheGroups,
        // 将所有的样式文件打包到单个项目
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};

delete config.extra;

module.exports = config;
