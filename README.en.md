# Webpack React Redux Boilerplate

Page-Driven Webpack Boilerplate For React-Redux Work Flow

It is initial from [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)


[Webpack-React-Redux-Boilerplate](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/tree/boilerplate)，其允许在一个项目中配置多个应用入口，同时支持开发模式、构建模式与库构建模式。同时笔者习惯不将webpack配置文件分成单独的dev与prod文件，而是合并到一个文件中。如果需要使用该模板，直接使用如下命令:

```

git clone -b boilerplate https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/ # 克隆模板文件夹
./install.sh # 安装运行所需要的依赖项
```

得到的模本文件夹主要由以下构成:

```

├── README.md
├── README.zh.md
├── dev-config : 配置文件入口
│   ├── apps.config.js : 应用配置文件
│   ├── dev.html : 开发模式下使用的HTML文件
│   ├── devServer.js : 开发服务器
│   ├── eslint.js : ESLint配置文件
│   ├── template.html : 构建模式下推荐的HTML模板文件
│   └── webpack.config.js : webpack配置文件
├── install.sh 
├── package.json
└── src : 源代码目录
    ├── count : 某个应用
    │   ├── App.js
    │   ├── async_library.js
    │   ├── colors.js
    │   ├── count.html
    │   └── count.js
    ├── helloworld
    │   ├── App.css
    │   ├── App.js
    │   ├── helloworld.css
    │   ├── helloworld.html
    │   ├── helloworld.js
    │   └── logo.svg
    ├── library
    │   ├── foo.js
    │   ├── library.html
    │   └── library_portal.js
    └── vendors.js
```

其核心的关于应用的配置文件即`apps.config.js`，在模板项目中其配置为:

```

/**

 * Created by apple on 16/6/8.

 */

module.exports = {

    apps: [

        //HelloWorld

        {

            id: "helloworld",

            title: "HelloWorld",

            entry: {

                name: "helloworld",

                src: "./src/helloworld/helloworld.js"

            },

            indexPage: "./src/helloworld/helloworld.html",

            compiled: true

        },

        //Count

        {

            id: "count",

            title: "Count",

            entry: {

                name: "count",

                src: "./src/count/count.js"

            },

            indexPage: "./src/count/count.html",

            compiled: true

        }

    ],



    //开发服务器配置

    devServer: {

        appEntrySrc: "./src/helloworld/helloworld.js", //当前待调试的APP的编号

        port: 3000 //监听的Server端口

    },



    //如果是生成的依赖库的配置项

    library: {

        name: "library_portal",//依赖项入口名

        entry: "./src/library/library_portal.js",//依赖库的入口,

        library: "libraryName",//生成的挂载在全局依赖项下面的名称

        libraryTarget: "var"//挂载的全局变量名

    }

};

```

### 开发模式

开发模式下主要读取`apps.config.js`中的`devServer`配置，主要是可以配置调试的入口JS文件与开发服务器监听的端口号。开发模式下会自动使用`dev.html`作为默认的HTML文件传输到浏览器中展示，譬如在模板项目中是将helloworld项目作为当前正在开发的项目，切换到项目目录下使用`npm start`，即可开启开发模式，此时在浏览器内打开`http://localhost:3000`，即可以看到如下画面:

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/3/8775DB19-1394-41FB-9CA0-645936E35E86.png)

开发模式默认是支持热加载机制，另外，因为笔者经常需要进行移动端开发，因此需要在局域网内使用手机端进行访问，目前开发模式已经支持以LAN地址进行访问，你可以直接在其他端输入`http://192.168.1.1:3000`即可。

### 构建模式

对于应用中存在的多应用入口，主要是在`apps.config.js`中的apps下进行配置的，一个典型的应用配置为:

```


            id: "helloworld", //编号

            title: "HelloWorld", //生成的HTML文件中的标题

            entry: {

                name: "helloworld", //用于webpack的入口名

                src: "./src/helloworld/helloworld.js" //入口文件地址

            },

            indexPage: "./src/helloworld/helloworld.html", //HTML模板文件地址

            compiled: true //是否进行编译

```

我们使用`npm run build`即可以自动进行打包，同样的，会自动进行代码压缩与优化，同时还会将CSS提取到一个单独的文件中，以在文件头部引入。对于图片等资源也会自动放置到dist目录下。如果你使用`npm run deploy`，则会自动地建立一个监听dist目录的HTTP Server，譬如在模板项目中使用`npm run deploy`，然后再访问`http://localhost:8080`，既可以得到如下界面:

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/3/B1C9E083-02E5-4507-9C79-66E9EF92BECE.png)

另外，构建模式下也默认设置了`vendors`这个公共的Chunk来进行公共代码提取，建议是将React等公共代码的引入放置到`src/vendors.js`文件中，这样多应用之间共享的公共代码就会被提取出来。



### 库构建模式

有时候，我们希望使用Webpack编译好的函数能够直接在Global作用域下使用，或者能够通过AMD/CMD规范引入，最直观的用法就是能够直接挂载在script标签下使用。关于此部分的理论说明参考[Webpack Configuration](https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/builder/webpack/webpack-configuration.md#library)。在模板项目中，关于库构建的配置在:

```

    //如果是生成的依赖库的配置项

    library: {

        name: "library_portal",//依赖项入口名

        entry: "./src/library/library_portal.js",//依赖库的入口,

        library: "libraryName",//生成的挂载在全局依赖项下面的名称

        libraryTarget: "var"//挂载的全局变量名

}

```

我们首先构建一个基于ES6类的服务:

```

/**
 * Created by apple on 16/7/23.
 */

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

然后设置一个模板的入口文件:

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

注意，暴露出来的接口貌似只能是静态函数。最后我们使用`npm run build:library`进行库构建，构建完成后再HTML文件中可以如此使用:

```

alert(window.libraryName.foo.echo());
```