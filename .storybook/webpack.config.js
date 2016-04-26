/**
 * Created by apple on 16/4/24.
 */
const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.css?$/,
                loader: 'style-loader!css-loader!postcss-loader',
                include: path.resolve(__dirname, '../')
            }
        ]
    }
}