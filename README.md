
> 本文从属于笔者的[Web Frontend Introduction And Best Practices:前端入门与最佳实践](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/tree/master/Frontend),项目的Github地址为[Webpack2-React-Redux-Boilerplate](https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate).

> Warning!笔者自己构建的基于Webpack+React+Redux的脚手架已经经历了三个版本,之前的两个版本参考[Webpack实战之Quick Start](https://segmentfault.com/a/1190000003873739)以及[我的Webpack套装](https://segmentfault.com/a/1190000005122575)。在本文文首此处,我必须严肃吐槽下,我深刻感觉到Boilerplate就像当年的Rails,方便入门的同时会给你无尽的束缚,因此笔者不建议任何人在正式项目中直接使用自己不能完全掌控的脚手架。我觉得我是无法忘记当初被[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)支配的恐惧。

# Webpack2 React Redux Boilerplate

> 核心组件代码与脚手架之间务必存在有机分割，整个程序架构清晰易懂。

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/2/1-raWO3dhM4jMjf9VY-kZzNg.png)

如果你是完全的React初学者,那么建议首先了解下[使用Facebook的create-react-app快速构建React开发环境](https://segmentfault.com/a/1190000006055973)，同时参考笔者的[React 入门与最佳实践](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/tree/master/Frontend/Framework/View/React)以及[Redux 入门与最佳实践](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/tree/master/Frontend/Framework/StateManagement/Redux)。本项目算是个半自动化的脚手架工具,笔者并不希望做成完全傻瓜式的开箱即用的工具,这只会给你的项目埋下危险的伏笔,希望每个可能用这个Boilerplate的同学都能阅读文本,至少要保证对文本提及的知识点有个全局的了解。

## Features

本部分假设你已经对Webpack有了大概的了解，这里我们会针对笔者自己在生产环境下使用的Webpack编译脚本进行的一个总结，在介绍具体的配置方案之前笔者想先概述下该配置文件的设计的目标，或者说是笔者认为一个前端编译环境应该达成的特性，这样以后即使Webpack被淘汰了也可以利用其他的譬如JSPM之类的来完成类似的工作。

- 考虑到同一项目对多编译目标的支持，包括开发环境、纯前端运行环境（包括Cordova、APICloud、Weapp这种面向移动端的方案）、同构直出环境，并且保证项目可以在这三个环境之间平滑切换，合理分割脚手架工具与核心应用代码。

- 单一的配置文件：很多项目里面是把开发环境与生产环境写了两个配置文件，可能笔者比较懒吧，不喜欢这么做，因此笔者的第一个特性就是单一的配置文件，然后通过npm封装不同的编译命令传入环境变量，然后在配置文件中根据不同的环境变量进行动态响应。另外，要保证一个Boilerplate能够在最小修改的情况下应用到其他项目。

- 多应用入口支持：无论是单页应用还是多页应用，在Webpack中往往会把一个html文件作为一个入口。笔者在进行项目开发时，往往会需要面对多个入口，即多个HTML文件，然后这个HTML文件加载不同的JS或者CSS文件。譬如登录页面与主界面，往往可以视作两个不同的入口。Webpack原生提倡的配置方案是面向过程的，而笔者在这里是面向应用方式的封装配置。

- 调试时热加载：这个特性毋庸多言，不过热加载因为走得是中间服务器，同时只能支持监听一个项目，因此需要在多应用配置的情况下加上一个参数，即指定当前调试的应用。

- 自动化的Polyfill：这个是Webpack自带的一个特性吧，不过笔者就加以整合，主要是实现了对于ES6、React、CSS(Flexbox)等等的自动Polyfill。

- 资源文件的自动管理：这部分主要指从模板自动生成目标HTML文件、自动处理图片/字体等资源文件以及自动提取出CSS文件等。

- 文件分割与异步加载：可以将多个应用中的公共文件，譬如都引用了React类库的话，可以将这部分文件提取出来，这样前端可以减少一定的数据传输。另外的话还需要支持组件的异步加载，譬如用了React Router，那需要支持组件在需要时再加载。

## 真的需要Redux吗?

> - [思考:我需要怎样的前端状态管理工具?](https://segmentfault.com/a/1190000007103433)
> - [你不一定需要Redux](https://segmentfault.com/a/1190000006966262)

虽然本项目是面向Webpack+React+Redux的Boilerplate，但是笔者还是希望在此抛出这个问题，也是便于大家能够理解Redux。对于这个问题笔者没有明确的答案,但是在这两年的自己对于Redux的实战中,也一直在摇把。我坚定的认为Redux指明了解决某类问题的正确方向,但是它真的适合于所有的项目吗?笔者在[我的前端之路](https://segmentfault.com/a/1190000004292245)一文中提及,从以DOM操作为核心的jQuery时代到以声明式组件为核心的React时代的变迁是声明式编程对于命令式的慢慢代替,而Redux则是纯粹的声明式编程典范。这里以某个登录认证的小例子进行说明，产品的需求是允许用户在登录成功之后在登录页面上显示“登录成功，正在跳转”，然后延时跳转到其他页面。这里强调要在登录页面上进行回显是因为很多人习惯将，跳转作为Side Effect在Thunk或者Saga中就处理了，并没有影响到界面本身。具体的代码对比可以参考[纯粹的React实现的登录跳转](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/react/component/login.js)与[基于Redux实现的登录跳转](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/blob/master/src/redux/container/login.js)。首先，如果是纯粹的React命令式的话，会是:

```
class ReactComponent{
  ...
  if(!isValid){ //isValid是外部传入的状态变量，存放用户是否已经登录
  //如果尚未登录，则进行登录操作
  login().then(()=>{
    //登录成功之后，显示文字并且执行跳转
    show('登录成功，正在跳转');
    redirect();
  });
}
}
```

如果我们引入Redux，并且将Component中的所有副作用移除的话:

```
class ReduxComponent{
  ...
  if(!isValid){ 
  	login(); //执行登录操作，其会dispatch某个Action，触发外部状态变化
  }
  
  if(shouldRedirect){ //需要添加该变量来记录是否需要进行跳转
    show('登录成功，正在跳转');
    dispatch({type:'SET_SHOULDREDIRECT_FALSE'});//将控制是否跳转的状态变量重置
    redirect();
  }
}
}
```

从上面的例子中我们能看出,就好像能量守恒定理一样,对于任何的业务逻辑的实现要么以命令的方式,要么以声明的方式辅以大量的状态变量（参考基于变量的循环与基于迭代的循环二者的代码复杂度比较）。Redux以函数式编程的强约束将我们很多的逻辑拆分为了多个纯函数表示,并以数据流驱动整个项目。Redux允许我们以支离破碎的逻辑代码与相较于命令式编程膨胀很多的模板代码为代价实现百分百的可测试性与可预测性。经过这么长时间的摸索与社区广泛的讨论实践，Redux的优势与劣势都已经很明显了。对于具体的使用者也是见仁见智，以笔者而言因为一直都在中小型企业中，往往对于产品进度的要求会多余测试，并且更多的以人工测试为主，因此笔者目前是尝试在项目中混用[MobX](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/tree/master/OpenSource/mobx-react-webpack-boilerplate)与Redux，希望能够有效平衡开发速度与整体的鲁棒性/可扩展性。

## Personal Best Practice

本部分是列举一些通用的个人最佳实践的感受，不局限于React或者Redux。具体的关于React与Redux的实践建议会在下文中介绍。

- Promise

  使用Promise进行异步操作，建议使用await/async作为Promise语法糖构建异步函数。

- fetch

  使用fetch作为统一的数据获取函数，在本项目中使用了笔者的[fluent-fetcher]()作为fetch的上层封装使用。

- 尽可能少的使用行内样式,将每个组件的样式文件与组件声明文件同地存放
  譬如Material-UI这个著名的React样式组件库与[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)
  之前的版本都是用的CSS-IN-JavaScript,全部内联样式。笔者感觉还是需要将CSS与JS剥离开来,一方面是处于职责分割的考虑,另一方面也是为了样式的可变性。通过样式类的方式来定义方式很方便地可以通过CSS来修正样式,而不需要每次都要找半天内联样式在哪里,然后去重新编译整个项目。

- 适当合理地编写纯函数，在合理范围内尽可能地将逻辑处理抽象为纯函数

## Reference

### Boilerplate

- [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)
- [react-boilerplate](https://github.com/mxstbr/react-boilerplate)
- [react-redux-saga-boilerplate](https://github.com/gilbarbara/react-redux-saga-boilerplate)
- [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)

### Blogs

- [webpack-for-the-fast-and-the-furious](https://medium.freecodecamp.com/webpack-for-the-fast-and-the-furious-bf8d3746adbd#.poot9r5ee)
- [react-project](https://github.com/ryanflorence/react-project#lazy)



# Quick Start

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/2/1-7M1eE4GO6_Lh2c-pmjGkcA.jpeg)

本部分笔者首先会介绍本项目中所有预置的项目编译及运行命令。首先需要明确的两点，本Boilerplate是希望达成以下两个目标：

（1）将关于应用的配置与关于Webpack的配置剥离开

项目中开发配置主要在dev-config目录下，如果你要基于本项目进行二次开发,可以直接拷贝dev-config与package.json到你自己的项目中,然后根据需要配置dev-config/apps.config.js项目。而主要的应用配置信息目前是抽象到了`dev-config/app.config.js`文件中，主要的可配置项如下:

```
/**
 * Created by apple on 16/6/8.
 */
const defaultIndexPage = "./dev-config/server/template.html";

module.exports = {
  apps: [
    //HelloWorld
    {
      id: "helloworld",
      src: "./src/simple/helloworld/helloworld.js",
      indexPage: defaultIndexPage,
      compiled: false //控制在执行npm run build时是否会编译该app
    },
    {
      id: "react",
      src: "./src/react/react_app.js",
      indexPage: defaultIndexPage,
      compiled: true
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
    appEntrySrc: "./src/react/react_app.js", //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },

  //依赖项配置
  proxy: {
    //后端服务器地址 http://your.backend/
    backend: "",
  },

  //如果是生成的依赖库的配置项
  library: {
    name: "library_portal",//依赖项入口名
    entry: "./src/library/library_portal.js",//依赖库的入口,
    libraryName: "libraryName",//生成的挂载在全局依赖项下面的名称
    libraryTarget: "var"//挂载的全局变量名
  }
};
```

（2）能够以平滑的方式编译为三个不同的目标，主要是独立部署（往往作为单页应用或者离线WebAPP）与Server Side Rendering这两种。

## Simple

> 笔者正在逐步采用[yarn](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/blob/master/Server/NodeJS/Yarn.md)作为替代npm的依赖管理工具，不过在目前的README中还是保留了npm方式，有兴趣的朋友可以自己进行尝试。

首先使用`git clone`命令将项目Clone到本地:

```
git clone https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate
cd Webpack2-React-Redux-Boilerplate
```

然后使用 `npm install` / `npm link`命令安装依赖项目，同时如果你要实现部署的话还需要一些全局命令，可以使用`sh install.sh`进行安装。然后将`dev-config/app.config.js`作如下配置:

```
  //开发服务器配置
  devServer: {
    appEntrySrc: "./src/simple/helloworld/helloworld.js", //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },
```

然后使用`npm start`命令启动调试服务器，此时在命令行中Webpack DashBoard会自动输出编译信息:

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/2/D78DFC34-9668-4FF1-8E80-8AD7CB82B686.png)

然后在浏览器中打开[http://localhost:3000](http://localhost:3000)，你可以看到如下画面：

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/2/14890568-05F2-475F-9E02-D9DA45E8B0F1.png)

此时在编辑器中实时修改App.js，结果可以通过热加载实时反馈到界面上，热加载主要是利用实时传送描述热加载的json与js文件:
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/2/1AE31998-054B-4AB2-A28A-513D242963AE.png)

这样当我们有需要自定义某些热加载的规则时可以同样利用这种方式。我们通过`npm start`利用WebpackDevServer来启动开发服务器，这个很方便我们进行开发。接下来我们通过`npm run build`命令来构建可发布版本，这种方式编译得出的基于hashHistory，可以用于单页应用（路径不变）或者离线应用（譬如应用到Cordova中），首先我们需要在`dev-config/apps.config.js`中将目标应用编译状态设置为true。注意，如果同时编译多个应用，那么CommonsChunkPlugin会将这几个应用中的公共代码抽取出来:

```
    //HelloWorld
    {
      id: "helloworld",
      src: "./src/simple/helloworld/helloworld.js",
      indexPage: defaultIndexPage,
      compiled: true //控制在执行npm run build时是否会编译该app
    },
```

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/2/6AE32545-2A26-43F0-B184-C2EA41297FB6.png)

直接在浏览器中打开`helloworld.html`文件，即可看到与刚才热加载时相同的页面。另外需要注意的是，这里使用的HTML模板都是统一放置于`dev-config/server/template.html`文件，笔者建议使用[Helmet](https://github.com/nfl/react-helmet)来为HTML添加自定义的元标签或者样式脚本等。

### Library

以上述方式编译的是独立可运行的脚本，而在有些情况下我们希望以类似于jQuery的方式挂载全局变量/函数的方式使用部分功能，这里我们就需要将编译目标设置为Library。首先将`dev-config/apps.config.js`中Library配置如下:

```
  //如果是生成的依赖库的配置项
  library: {
    name: "library_portal",//依赖项入口名
    entry: "./src/simple/library/library_portal.js",//依赖库的入口,
    libraryName: "libraryName",//生成的挂载在全局依赖项下面的名称
    libraryTarget: "var"//挂载的全局变量名
  }
```

然后使用`npm run build:library`进行编译，这里我们希望将某个简单的ES6类导出到页面中使用:

```
/**
 * @function 基于ES6的服务类
 */
export class FooService {

    static echo(){

        const fooService = new FooService();

        return fooService.getMessage();
    }

    /**
     * @function 默认构造函数
     */
    constructor() {
        this.message = "This is Message From FooService!";
    }

    getMessage() {
        return this.message;
    }

}
```

我们还需要设置专门的入口文件:

```
/**
 * Created by apple on 16/7/23.
 */
import {FooService} from "./foo";

/**
 * @function 配置需要暴露的API
 * @type {{foo: {echo: FooService.echo}}}
 */
module.exports = {

    foo: {
        echo: FooService.echo
    }

};
```

然后在需要的页面中引入编译好的两个脚本:

```
<script src="../../../dist/vendors.bundle.js"></script>
<script src="../../../dist/library_portal.library.js"></script>
```

此时打开该界面，即可以弹出如下窗口:

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/2/50EC5FF2-DFAA-43EF-A0E3-43070275C5EC.png)



## Server Side Rendering Support

本部分我们使用react_app这个应用作为示例，首先同样将配置中调试目标设置为react_app.js:

```
  //开发服务器配置
  devServer: {
    appEntrySrc: "./src/react/react_app.js", //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },
```

然后使用`npm start`命令来启动开发服务器，然后同样可以使用`npm run build`命令编译可发布版本。然后打开`dist/`目录下的`react.html`文件，即可以看到界面，注意，此时使用的是hashHistory，因此URL的形式为:

```
react.html?_ijt=4t0fmg7f6rhsv85efsau6j3t1r#/detail?_k=f9r3og
```

然后我们需要以Server Side Rendering的方式发布项目，其主要区别在于支持browserHistory以及服务端完成渲染。注意，实际上页面发送到客户端之后还会依靠加载的JS脚本全部重新渲染，其只是为了方便SEO/首屏显示速度/填充初始状态到界面中。

首先，我们需要将`apps.config.js`文件中的ssrServer项目设置为我们目标的ssrServer:

````
  //用于服务端渲染的Server路径
  ssrServer: {
    serverEntrySrc: './src/react/ssr_server.js'
  },
````

我们使用`npm run build:ssr`命令进行编译，在`dist`目录下可以得到如下文件:

```
.
├── react.bundle.js
├── react.css
├── react.html
├── ssr_server.bundle.js
├── ssr_server.bundle.js.map
└── vendors.bundle.js
```

在本项目中为了尽可能的代码复用，使用了变量来控制是否支持服务端渲染，我们直接使用` node dist/ssr_server.bundle.js`即可以启动服务器，此时URL格式为:

```
http://localhost:3001/login
```

## Lint

### Flow

### ESLint


# Develop Environment:开发环境机制详解

## Webpack2

> - [What's new in webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7)

本项目中使用Webpack 2替代原本的Webpack 1，从Webpack 1到Webpack 2很多的配置项目发生了变化，详细列表可以参考引用中提供的链接。而在本项目中，其中几个典型的修改为:
（1）所有loader的配置提取到了LoaderOptionsPlugin中。

```
  //提取Loader定义到同一地方
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: '/',
      postcss: [
        utils.postCSSConfig
      ]
    }
  }),
```

这里包含对于原本的UglifyJsPlugin与PostCSS的配置。

（2）loader配置更加灵活。

```
loaders: [
    {
        test: /\.css$/,
        loaders: [
            "style-loader",
            { loader: "css-loader", query: { modules: true } },
            {
                loader: "sass-loader",
                query: {
                    includePaths: [
                        path.resolve(__dirname, "some-folder")
                    ]
                }
            }
        ]
    }
]
```



## WebpackDevServer & Hot Loader

在前一版本的devServer中，笔者使用了express加上webpack-dev-middleware与webpack-hot-middleware中间件，本版本中是迁移到了WebpackDevServer:

```
new WebpackDevServer(webpack(config), {
  //设置WebpackDevServer的开发目录
  contentBase: path.join(__dirname + "/"),
  // publicPath: `http://0.0.0.0:${appsConfig.devServer.port}/`,
  hot: true,
  historyApiFallback: true,
  quiet:true,
  // noInfo: true,
  stats: {colors: true}
}).listen(appsConfig.devServer.port, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at http://0.0.0.0:${appsConfig.devServer.port}/`);
});
```

另外就是对于HotReloader的使用，目前很多热加载的实现方式还是基于[react-transform](https://github.com/gaearon/react-transform-boilerplate)，不过该项目已经废弃了，因此这里如果要自己添加热加载组件的话，建议使用[react-hot-loader](https://github.com/gaearon/react-hot-loader)，目前笔者使用了3.0版本。我们分别需要将上面的WebpackDevServer中的hot设置为true，并且在Babel配置文件中添加如下配置:

```
  "env": {
    "development": {
      "presets": [
        "react-hmre"
      ],
      "plugins": [
        "react-hot-loader/babel"
      ]
    }
  }
```

## API Proxy

待补充。

# React Router & Server Side Rendering

> - [React路由解决方案React-Router介绍与实践](https://github.com/wxyyxc1992/Web-Develop-Introduction-And-Best-Practices/blob/master/Frontend/Framework/View/React/Router/React-Router.md)



## Pure Frontend 

我们首先从应用的入口程序看起:

```
let history;

//判断是否为SSR从而确定应该选用哪个History
if (__SSR__) {
  //如果是浏览器环境,则使用browserHistory
  history = browserHistory;
} else {
  //如果是独立环境,则使用hashHistory
  history = hashHistory;
}

//在浏览器环境下使用hashHistory
const router = <Router history={history}>
  {getRoutes(localStorage)}
</Router>;

//将组件渲染到DOM中
render(
  router,
  document.getElementById('root')
);
```

这里将路由配置提取到单独文件中，是因为路由配置是需要在服务端与客户端共享的，因此将可能是DOM下独有的localStorage或者类似的对象以参数方式传入。对于Route的配置倒是客户端与服务端保持一致:

```
  return (
    <Route path="/" history={browserHistory} component={Container}>
      <IndexRoute component={Home}/>
      <Route path="home" component={withRouter(Home)}/>
      <Route path="login" component={withRouter(Login)}/>
      <Route path="detail" component={withRouter(Detail)} onEnter={auth}/>
    </Route>
  );
```

其余的代码不多，可以自行浏览整个项目。这里有个关于React Router的点我想说明下,在Route配置时使用`withRouter`这个方法可以以HOC方式注入router对象到Props中，这样我们在进行页面跳转时可以使用:

```
this.props.router.goBack()
```



## Server Side Rendering

首先我们说几句废话，需要了解服务端渲染到底做了啥:

（1）Server端只负责首页的渲染，其他页面仍然由客户端进行渲染。即虽然URL Path发生了变化，但是并未触发整个页面的完全刷新。

（2）以Redux为代表的状态管理工具中的Store只是在第一次渲染时将数据传递给客户端，在后续的页面切换/认证等操作中的所有代码皆在客户端运行。

这里我们不需要改造上面的客户端入口文件，而需要添加一个用于服务端运行的文件，其核心代码为:

```
//处理所有的请求地址
app.get('/*', function (req, res) {

  //匹配客户端路由
  match({routes: getRoutes(), location:req.originalUrl}, (error, redirectLocation, renderProps) => {

    if (error) {

      res.status(500).send(error.message)

    } else if (redirectLocation) {

      res.redirect(302, redirectLocation.pathname + redirectLocation.search)

    } else if (renderProps) {

      let html = renderToString(<RouterContext {...renderProps} />);

      res.status(200).send(renderHTML(html, {key: "value"}, ['/static/vendors.bundle.js', '/static/react.bundle.js']));

    } else {
      res.status(404).send('Not found')
    }
  })
});
```

可以看出，即是用户首次向服务端发起请求时，首先对于首屏展示的组件进行渲染。我们来做一个对比，服务端渲染之后的得到的HTML字符串为:


```
<div data-reactroot="" data-reactid="1" data-react-checksum="663537196">
    <section class="login__container" data-reactid="2"><!-- react-text: 3 -->登陆界面<!-- /react-text -->
        <div data-reactid="4utton data-reactid=" 5
        ">点击登陆</button>
        <button data-reactid="6">点击登出</button>
</div></section></div>
```

而原始的JSX组件如下，可以发现事件处理等很多代码都被过滤了。

```
/**
 * Created by apple on 16/9/13.
 */
export class Login extends Component {

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {
    return <section className="login__container">
      登陆界面

      <div>
        <button onClick={()=> {
          //将登陆信息写入cookies与localStorage
          login().then(()=> {
            //登陆成功跳转到详情页
            this.props.router.push('/detail');
          });
        }}>
          点击登陆
        </button>

        <button onClick={()=> {
          //将登陆信息写入cookies与localStorage
          logout();
          //登陆成功跳转到详情页
          this.props.router.push('/');
        }}>
          点击登出
        </button>
      </div>

    </section>
  }
}
```

## Authentication

有时候我们需要对某些URL添加权限认证，即只允许认证用户才能访问，这里我们可以通过Route中的onEnter属性进行控制:

```
<Route path="detail" component={withRouter(Detail)} onEnter={auth}/>
```

而我们在上文中传入的Store对象也是在这个时候派上用场:

```
/**
   * @function 判断用户是否登陆,如果未登陆则强制性跳转到登录页面
   * @param nextState
   * @param replace
   * @param callback
   */
  async function auth(nextState, replace, callback) {

    let userToken = store.userToken;

    //在这里执行异步认证,假设传入的store中包含userToken
    //这里使用Promise执行异步操作
    //如果是SSR,则本部分代码会在服务端运行

    let isValid = await valid_user(userToken);

    //如果用户尚未认证,则进行跳转操作
    isValid || replace('/login');

    //执行回调函数
    callback();

  }
```



# Isomorphic Redux

笔者目前在自己主导的几个前端项目中渐渐的转向MobX与Redux并行.本项目中对于Redux的文件布局采取的是[Ducks](https://github.com/erikras/ducks-modular-redux)这种方式,参考了[my-journey-toward-a-maintainable-project-structure-for-react-redux](https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5#.yot2mml9t)一文。即按照特性来将Reducers、ActionCreators、Actions、Selectors集中到单个文件中:
```
// src/ducks/auth.js
const AUTO_LOGIN = 'AUTH/AUTH_AUTO_LOGIN'
const SIGNUP_REQUEST = 'AUTH/SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'AUTH/SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'AUTH/SIGNUP_FAILURE'
const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE'
const LOGOUT = 'AUTH/LOGOUT'

const initialState = {
  user: null,
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null }

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.user }

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error }

    case LOGOUT:
      return { ...state, user: null }

    default:
      return state
  }
}

export const signup = (email, password) => ({ type: SIGNUP_REQUEST, email, password })
export const login = (email, password) => ({ type: LOGIN_REQUEST, email, password })
export const logout = () => ({ type: LOGOUT })
```

对于[Redux Dev Tools](https://github.com/gaearon/redux-devtools#browser-extension),请自行使用[Browser Extension]()。

## Simple Count 

我们首先以简单的基于Redux的计数器为例，将`dev-config/apps.config.js`中的开发配置设置为如下:

```
  //开发服务器配置
  devServer: {
    appEntrySrc: "./src/redux/redux_app.js", //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },
```

然后使用`npm start`运行开发服务器，界面上的如下表示即为该示例:

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/2/1FB65E46-3771-4A87-B217-6181A502945A.png)

在Redux DevTools中，红色框线标示出的即为count相关的状态，我们接下来简单描述下其核心代码。在Redux开发中，我们首先需要构建一个Ducks，即包含Action、ActionCreator与Reducer:

```
/**
 * Created by apple on 16/10/11.
 */
// no changes here 😀

/**
 * @function 定义Actions
 * @type {string}
 */
export const INCREMENT_COUNT = 'INCREMENT';

export const DECREMENT_COUNT = 'DECREMENT';

/**
 * @function 定义Reducer
 * @param state
 * @param action
 * @return {number}
 */
export default (state = 0, {type}) => {
  switch (type) {
    case INCREMENT_COUNT:
      return state + 1;
    case DECREMENT_COUNT:
      return state - 1;
    default:
      return state
  }
}

/**
 *@region 定义Action Creator
 */

/**
 * @function 触发加1操作
 * @return {{type: string}}
 */
export const increment = ()=> {

  return {
    type: INCREMENT_COUNT
  }

};

/**
 * @function 在这里进行异步加1操作
 * @return {function(*)}
 */
export const incrementAsync = ()=> {

  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
};

/**
 * @function 执行计数器减一操作
 * @return {{type: string}}
 */
export const decrement = ()=> {

  return {
    type: DECREMENT_COUNT
  }

};
```

这里为了简单起见，我们是使用了redux-thunk来处理异步Action，实际上在Redux中对于异步Action的处理也有各种各样的实践，包括笔者在这里自定义的promiseMiddleware，也是一种方式。然后我们需要构建一个Store来存放全局的状态，Store本身是基于Reducer来递归生成状态树的,其核心代码如下:

```
  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' && __DEV__ ? window.devToolsExtension() : f => f);

  /**
   * @function 保证Redux Reducer的热加载
   */
  if (__DEV__ && module.hot) {
    module.hot.accept('./reducer', () => {
      //替换Store中的Reducer
      store.replaceReducer(require('./reducer'));
    })
  }
```

现在我们已经写完了Redux部分的代码，下面就是需要将状态导入到界面中:

```
@connect(
  state => ({
    count: state.count
  }),
  {pushState: push, increment, incrementAsync, decrement}
)
export class Home extends Component {
  render() {

    //在非SSR状态下导入SCSS文件
    __SSR__ || require('./home.scss');

    const {count, pushState, increment, incrementAsync, decrement} = this.props;

    return <section className="home__container">

      <div>
        王下邀月熊 Webpack2-React-Redux-Boilerplate
      </div>

      <br/>
      <br/>

      <div>导航栏目:</div>

      <li>
        <button onClick={()=> {
          pushState('/detail')
        }}>
          详情页(需要先进行登陆操作)
        </button>
      </li>
      <li><Link to="/login">登陆页</Link></li>

      <br/>
      <br/>

      <div>基于Redux的Count实例</div>
      <div>{count}</div>
      <div>
        <button onClick={increment}>加1</button>
        <button onClick={incrementAsync}>异步加1</button>
        <button onClick={decrement}>减1</button>
      </div>

    </section>
  }
}
```



## [React Router Redux](https://github.com/reactjs/react-router-redux)

React Router Redux的代码还是简单易懂的,其只是在用户点击/跳转与React Router自身的History之间加上了一层封装

> [history](https://github.com/reactjs/history) + `store` ([redux](https://github.com/reactjs/redux)) → [**react-router-redux**](https://github.com/reactjs/react-router-redux) → enhanced [history](https://github.com/reactjs/history) → [react-router](https://github.com/reactjs/react-router)

如果你需要自定义其他的Location,譬如如果你需要引入ImmutableJS作为Store:
```
import Immutable from 'immutable';
import {
    LOCATION_CHANGE
} from 'react-router-redux';

let initialState;

initialState = Immutable.fromJS({
    locationBeforeTransitions: undefined
});

export default (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }

    return state;
};
```
## SSR

与上文中的Server Side Rendering Server相比，其添加了对于状态传递的支持:

```

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
```




> 欢迎大家指导与讨论,同时再次建议,在不能掌握本项目的情况慎重直接用于大型项目中,对自己负责。