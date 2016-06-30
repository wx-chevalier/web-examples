# ScalableComponent

> Inspired By [pageResponse](https://github.com/peunzhang/pageResponse/blob/master/README.md), which is a Responsive plugin for the mobile


ScalableComponent is based on the CSS3 transform property: scale, it will do auto scale in different devices while abiding by the aspect ratio of visual design

# Usage

## Set Viewport to disable device scale
```
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
```

## Import ScalableComponent

```
/**
 * Created by apple on 16/6/30.
 */
import React from "react";
import {render} from "react-dom";
import ScalableComponent from "./scalable";

render(<ScalableComponent mode="contain" wrapperBackgroundColor="rgb(117,155,156)">
    <div style={{color:"white"}}>
        <h1 style={{position:"absolute"}}>HI</h1>
        <p style={{position:"absolute",top:"50px"}}>This is Demo For Scalable</p>
        <img height="504px" width="320px" src="http://img5.cache.netease.com/photo/0031/2014-09-20/A6K9J0G94UUJ0031.jpg"
             alt=""/>
    </div>
</ScalableComponent>, document.getElementById('root'));

```

ths props of ScalableComponent is :

```
    static propTypes = {
        mode: PropTypes.oneOf(['auto', 'contain', 'cover']), //modes
        width: PropTypes.number, //width of the visual Design
        height: PropTypes.number, //height of the visual Design
        origin: PropTypes.string,//origin for scale
        wrapperBackgroundColor: PropTypes.string//background Color for hatch area
    };

```


# Mode

## Contain

Contain mode ensure that page is wrapped in the window, there may be some blank area in left/right/top/bottom area.

![](https://raw.githubusercontent.com/peunzhang/pageResponse/master/pic/pageResponse_contain.gif)

## Cover

Cover mode ensure that the page cover the window while keep the aspect ratio.

![](https://raw.githubusercontent.com/peunzhang/pageResponse/master/pic/pageResponse_cover.gif)

## Auto

keep the aspect ratio and adjust the width, ensure that page is wrapped in window in vertical direction

![](https://raw.githubusercontent.com/peunzhang/pageResponse/master/pic/pageResponse_auto.gif)

# Issue or Advice

welcome to open issue, this component is in development so you can propose any thing you want to be covered in it.

