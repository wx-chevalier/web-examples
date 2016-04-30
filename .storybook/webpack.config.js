/**
 * Created by apple on 16/4/24.
 */
var path = require('path');
var webpack = require('webpack');

//PostCSS plugins
var autoprefixer = require('autoprefixer');

//webpack plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    module: {
        loaders: [
            {
                test: /\.(css|scss|sass)?$/,
                loader: 'style-loader!css-loader!postcss-loader',
                include: path.resolve(__dirname, '../')
            },
            {test: /\.(jsx|js)$/, exclude: /(libs|node_modules)/, loader: 'babel'},
            {test: /\.(png|jpg|ttf|woff|svg|eot)$/, loader: 'url-loader?limit=8192&name=assets/imgs/[hash].[ext]'},// inline base64 URLs for <=8k images, direct URLs for the rest,
            {test: /\.vue$/, loader: 'vue'}
        ]
    }
}