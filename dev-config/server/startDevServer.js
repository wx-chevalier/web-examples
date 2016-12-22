import path from 'path';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

// 默认是开发时配置
import config from './../webpack.config';
import appsConfig from './../apps.config';

new WebpackDevServer(webpack(config), {
  // 设置WebpackDevServer的开发目录
  contentBase: path.join(`${__dirname}/`),
  // publicPath: `http://0.0.0.0:${appsConfig.devServer.port}/`,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  noInfo: true,
  stats: {colors: true}
}).listen(appsConfig.devServer.port, '0.0.0.0', (err, result) => {
  console.log(`Listening at http://0.0.0.0:${appsConfig.devServer.port}/`);
});
