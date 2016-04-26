# Webpack React Redux Boilerplate

Page-Driven Webpack Boilerplate For React-Redux Work Flow

It is initial from [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)

## Features

本部分假设你已经对Webpack有了大概的了解，这里我们会针对笔者自己在生产环境下使用的Webpack编译脚本进行的一个总结，在介绍具体的配置方案之前笔者想先概述下该配置文件的设计的目标，或者说是笔者认为一个前端编译环境应该达成的特性，这样以后即使Webpack被淘汰了也可以利用其他的譬如JSPM之类的来完成类似的工作。

- 单一的配置文件：很多项目里面是把开发环境与生产环境写了两个配置文件，可能笔者比较懒吧，不喜欢这么做，因此笔者的第一个特性就是单一的配置文件，然后通过npm封装不同的编译命令传入环境变量，然后在配置文件中根据不同的环境变量进行动态响应。另外，要保证一个Boilerplate能够在最小修改的情况下应用到其他项目。

- 多应用入口支持：无论是单页应用还是多页应用，在Webpack中往往会把一个html文件作为一个入口。笔者在进行项目开发时，往往会需要面对多个入口，即多个HTML文件，然后这个HTML文件加载不同的JS或者CSS文件。譬如登录页面与主界面，往往可以视作两个不同的入口。Webpack原生提倡的配置方案是面向过程的，而笔者在这里是面向应用方式的封装配置。

- 调试时热加载：这个特性毋庸多言，不过热加载因为走得是中间服务器，同时只能支持监听一个项目，因此需要在多应用配置的情况下加上一个参数，即指定当前调试的应用。

- 自动化的Polyfill：这个是Webpack自带的一个特性吧，不过笔者就加以整合，主要是实现了对于ES6、React、CSS(Flexbox)等等的自动Polyfill。

- 资源文件的自动管理：这部分主要指从模板自动生成目标HTML文件、自动处理图片/字体等资源文件以及自动提取出CSS文件等。

- 文件分割与异步加载：可以将多个应用中的公共文件，譬如都引用了React类库的话，可以将这部分文件提取出来，这样前端可以减少一定的数据传输。另外的话还需要支持组件的异步加载，譬如用了React Router，那需要支持组件在需要时再加载。

具体的特性包括但不限于：
"react","reactjs","boilerplate","hot","reload","hmr","live","edit","webpack","babel","react-transform","PostCSS(FlexBox Polyfill)"

# Quick Start

use `npm install` / `npm link` to set up environment

use `npm start` to start Develop Server:localhost:3000

use `npm run storybook` to start StoryBook UI

use `npm run build` to build the release version

use `npm run deploy` to build and set up a simple http server for the dist directory

**注意**

- 鉴于node_modules实在比较大,在本项目中默认配置使用了根目录下的node_modules,详情可见各个子模块的webpack.config.js中的`resolve.root`配置。


# Directory Structure

## src:基本讲解的示范

## Module:常见的功能模块示例

## Widget:常见的页面组件控件

## boilerplate:可开箱即用的模板

## dashboard:基于React+Redux的仪表盘界面

## Electron:基于Electron的示例


# Todos

- 借鉴并且集成[webpack-boilerplate](https://github.com/geniuscarrier/webpack-boilerplate)中好的地方

- 局部状态放在局部处理,全局状态放在全局处理