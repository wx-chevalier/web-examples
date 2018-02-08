> [Storybook 3.2 引入 Vue.js 支持](https://github.com/wxyyxc1992/create-webpack-app/tree/master/vue/Storybook.md)从属于笔者的[前端每周清单](https://parg.co/bh1)系列，更多 Vue.js 相关资料参考[ Vue.js 学习实践资料索引](https://parg.co/byL)。

# Vue.js Storybook

在 React 开发中我们已经习惯了使用 Storybook 来进行组件交互式开发与预览，也就是所谓的 Storybook Driven Development；而在近日发布的 [Storybook 3.2](https://parg.co/bgX)版本中，其引入了对于 Vue.js 的支持。这里我们为笔者的[基于 Webpack 3 的 Vue.js 工程项目脚手架](https://github.com/wxyyxc1992/create-webpack-app/tree/master/vue)添加 Storybook 支持：

```shell
# 安装 Storybook 依赖
npm i -g @storybook/cli
cd my-vue-project

# 项目目录下获取 Storybook
getstorybook

# 运行 Storybook
npm run storybook
```


我们在 src/component 文件夹下添加简单的按钮组件：

```vuejs
<template>
  <button class="button-styles" @click="onClick">
    <slot>Fallback Content</slot>
  </button>
</template>

<script>
  export default {
    name: 'my-button',
  
    methods: {
      onClick () {
      }
    }
  }
</script>

<style>
  .button-styles {
    border: 1px solid #eee;
    border-radiuas: 3px;
    background-color: #FFFFFF;
    cursor: pointer;
    font-size: 15pt;
    padding: 3px 10px;
    margin: 10px;
  }
</style>
```

然后在 src/stories 目录下，可以利用 Storybook 提供的接口注册 Story:
```vuejs
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MyButton from '../component/MyButton.vue';

storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') },
  }))
  .add('with some emoji', () => ({
    components: { MyButton },
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: { action: action('clicked') },
  }));

```

最后在 .storybook/config.js 文件中指明 stories 的配置地址：


```javascript
import { configure } from '@storybook/vue'

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
```

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/6/1/1-fUZGDSIAVBJYKNaAd_yZaw.gif)


我们也可以自定义 Webpack 配置，在 .storybook 中添加 webpack.config.js:
```javascript
// @flow

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: [
          autoprefixer({
            browsers: [
              'ie >= 9',
              'ie_mob >= 10',
              'ff >= 30',
              'chrome >= 34',
              'safari >= 7',
              'opera >= 23',
              'ios >= 7',
              'android >= 4.4',
              'bb >= 10'
            ]
          }),
          require('postcss-flexibility')
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
```
同样的，也可以使用 Storybook 丰富的插件系统：
```javascript
// @flow

import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

setAddon(infoAddon);

# 设置 全局信息展示
setOptions({
  name: 'fractal-components',
  url: 'https://github.com/wxyyxc1992/fractal-components',
  showDownPanel: false
});


function loadStories() {
  ...
}


configure(loadStories, module);

```






