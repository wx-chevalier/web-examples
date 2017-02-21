/**
 * Created by apple on 16/9/13.
 */
const fs = require("fs");
const path = require('path');
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createHistory from 'react-router/lib/createMemoryHistory';
import { RouterContext, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store/store';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import renderHTML from '../../dev-config/server/template';

//构建express实例
const app = express();

//读取静态资源
app.use('/static', express.static(process.env.PWD + '/dist/'));

//处理所有的请求地址
app.get('/*', function (req, res) {

  //构建出内存中历史记录
  const memoryHistory = createHistory(req.originalUrl);

  //服务端构建出Store
  const store = createStore(memoryHistory);

  //构建出与Store同步的history
  const history = syncHistoryWithStore(memoryHistory, store);

  //匹配客户端路由
  match({history, routes: getRoutes(), location: req.originalUrl}, (error, redirectLocation, renderProps) => {

    if (error) {

      res.status(500).send(error.message)

    } else if (redirectLocation) {

      res.redirect(302, redirectLocation.pathname + redirectLocation.search)

    } else if (renderProps) {

      let html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      //设置全局的navigator值
      // global.navigator = {userAgent: req.headers['user-agent']};

      res.status(200).send(renderHTML(html, {key: "value"}, ['/static/vendors.bundle.js', '/static/redux.bundle.js']));

    } else {
      res.status(404).send('Not found')
    }
  })
});

//监听地址
const server = app.listen(3001, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});