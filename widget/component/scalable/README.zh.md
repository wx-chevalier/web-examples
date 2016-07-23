# ScalableComponent

> 借鉴了[pageResponse](https://github.com/peunzhang/pageResponse/blob/master/README.md)这个移动端响应式插件

# Usage

## 设置视口
```
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
```

# Mode

## Contain

Contain模式即保证页面完全包含在浏览器窗口中,在保证页面的宽高比情况下调整页面的宽度或者高度中的较大者,使得页面水平垂直居中,左右或上下可能出现空白。

![](https://raw.githubusercontent.com/peunzhang/pageResponse/master/pic/pageResponse_contain.gif)

## Cover

Cover模式即使页面完全覆盖浏览器窗口,保持页面的宽高比，调整页面的宽度或高度（较小者),页面水平垂直居中，超出浏览器窗口左右或上下的内容会被隐藏
![](https://raw.githubusercontent.com/peunzhang/pageResponse/master/pic/pageResponse_cover.gif)

## Auto
保持页面的宽高比，调整页面的宽度，使页面宽度完全包含在浏览器窗口中
![](https://raw.githubusercontent.com/peunzhang/pageResponse/master/pic/pageResponse_auto.gif)


