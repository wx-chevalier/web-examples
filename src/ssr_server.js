/* eslint-disable no-unused-vars */
/**
 * Created by apple on 16/9/13.
 */
const fs = require("fs");
const path = require("path");

// 声明使用实例
declare var process: Object;

import express from "express";
import { StaticRouter } from "react-router-dom";
import { matchPath } from "react-router";
import App from "./container/App";
import { NoMatch } from "./container/showcase/showcase_decorator";
import React from "react";
import { renderToString } from "react-dom/server";
import renderHTML from "../dev-config/server/template";
//构建express实例
const app = express();

//读取静态资源
app.use("/static", express.static(process.env.PWD + "/dist"));

// 404 From Server
const routes = ["/404"];

//处理所有的请求地址
app.get("/*", function(req, res) {
  try {
    // 判断页面是否匹配
    const match = routes.reduce((acc, route) => {
      return matchPath(req.url, { path: route, exact: true }) || acc;
    }, false);

    // 如果待寻找页面不存在
    // 仅当访问 404 界面时，提示不存在
    if (match) {
      res.status(404).send(renderToString(<NoMatch location={req.url} />));
      return;
    }

    // 存放渲染之后的 Context 数据
    let context = {};

    // 将组件渲染为 HTML
    let markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App serverSideMessage={"Hello World By Server Side Rendering"} />
      </StaticRouter>
    );

    // 判断是否存在转发
    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      });
      res.end();
    } else {
      res
        .status(200)
        .send(
          renderHTML(
            markup,
            { key: "value" },
            [
              "/static/vendor.bundle.js",
              "/static/index.bundle.js"
            ],
            ["/static/index.css"]
          )
        );
      res.end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

//监听地址
const server = app.listen(3001, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
