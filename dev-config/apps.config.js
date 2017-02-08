/**
 * Created by apple on 16/6/8.
 */
const defaultIndexPage = "./dev-config/server/template.html";

module.exports = {

  //基本的应用配置信息
  apps: [
    //HelloWorld
    {
      id: "helloworld",
      src: "./src/simple/helloworld/helloworld.js",
      indexPage: defaultIndexPage,
      compiled: true
    },
    {
      id: "react",
      src: "./src/react/react_app.js",
      indexPage: defaultIndexPage,
      compiled: false
    },
    {
      id: "redux",
      src: "./src/redux/redux_app.js",
      indexPage: defaultIndexPage,
      compiled: false
    }
  ],

  //开发服务器配置
  devServer: {
    // appEntrySrc: "./src/simple/helloworld/helloworld.js", //当前待调试的APP的入口文件
    appEntrySrc: "./src/react/react_app.js", //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },

  //用于服务端渲染的Server路径
  ssrServer: {
    serverEntrySrc: './src/react/ssr_server.js'
  },

  //依赖项配置
  proxy: {
    //后端服务器地址 http://your.backend/
    backend: "",
  },

  //如果是生成的依赖库的配置项
  library: {
    name: "library_portal",//依赖项入口名
    entry: "./src/simple/library/library_portal.js",//依赖库的入口,
    libraryName: "libraryName",//生成的挂载在全局依赖项下面的名称
    libraryTarget: "var"//挂载的全局变量名
  }
};