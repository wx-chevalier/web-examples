# mobx-weapp

`weapp + react / mobx` 示例,解放你的双手

## Usage

```shell
npm install

npm run dev:react   # react 开发
npm run dev:weapp   # react 开发
```

打开http://localhost:7778/dist/index.html 或用小程序打开 `path/to/mobx-weapp/shells/weapp`

### 如果需要看控制台信息

```js
localStorage.setItem('debug', 'React:*');
```

## 文档结构

```
shells
├── alias.js
├── react
│   ├── index.html
│   ├── src
│   └── webpack.config.js
└── weapp
    ├── build
    ├── gulpfile.js
    ├── logic.js
    ├── src
    ├── webpack.config.js
    └── webpack.dll.js
src
├── css
│   ├── app.css
│   └── todos.css
├── store
│   ├── index.js
│   ├── timerView.js
│   └── todos
└── utils.js
```

## 小程序组件探索

### 1. 使用createTransformer生成自动反应组件探索

1. 优点
    - 无状态组件分层，结构清晰
    - 各组件自动响应，修改当前组件渲染数据
    - 在满足第二点下，最少运行
2. 缺点
    - 优点3，需要保证组件入参为observable数据或是基本类型数据，不然百分百运行
    - 需要遵循的规则较多
    - 自动运行下，debug难度大
    - 还未做到增量setData

## tips

- 全局的 onError 处理方法可以通过 extras.onReactionError(handler) 来设置


## 截图

![demo](https://raw.githubusercontent.com/cytle/mobx-weapp/a5acb7a38a257ac63c892532a8cdb48be4b70834/images/demo.png)
