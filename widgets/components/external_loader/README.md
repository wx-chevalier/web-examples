# ReactExternalLoader

> Inspired by [ReactScriptLoader](https://github.com/yariv/ReactScriptLoader)

React apps are typically single-page apps that are rendered client-side in Javascript. When loading a site built with React, the browser typically pre-loads the javascript necessary to render the site's React components so that they can be rendered with no latency. This works well for sites that serve a relatively small amount of javascript from their own servers in a single bundle. However, in some situations pre-loading all the scripts necessary to render the site's components is impractial. For example, a site may have a Map component that relies on a dynamically loaded 3rd party library to render itself. It may be possible to delay rendering the app until the third party library is finished loading but doing so would make the site feel unnecessarily sluggish. It's a much better strategy to first render the page with a placeholder for the map and asynchronously render the map once the third party library has loaded. Deferring the loading of the external script is even more important when the map component isn't rendered right away but is only revealed after user interaction.

ReactExternalLoader simplifies creating React components whose rendering depends on dynamically loaded scripts. It can be used for lazily loading heavy scripts but it's especially useful for loading components that rely on 3rd party scripts or stylesheets, such as Google Maps or Stripe Checkout.


ReactExternalLoader is built with Promise, you can turn to the source file to find how it works.

# Usage

```
import React from "react";
import {render} from "react-dom";
import {ReactExternalLoader} from "../external_loader";

render(<ReactExternalLoader
    srcArray={[
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.min.js"
    ]}

    onLoad={()=>{alert("Loaded!");}}

>
    <div style={{color:"white"}}>
        <h1 style={{position:"absolute"}}>HI</h1>
        <p style={{position:"absolute",top:"50px"}}>This is Demo For Scalable</p>
        <img height="504px" width="320px" src="http://img5.cache.netease.com/photo/0031/2014-09-20/A6K9J0G94UUJ0031.jpg"
             alt=""/>
    </div>
</ReactExternalLoader>, document.getElementById('root'));

```

# Demo

## [iDangero-Swiper](http://idangero.us/swiper/#.V3aS95N96qA)
```
/**
 * Created by apple on 16/7/1.
 */
import React, {PropTypes, Component} from "react";
import {ReactExternalLoader} from "../../external_loader/external_loader";
require("./swiper.scss");

/**
 * @function 默认的Swiper容器
 */
export class SwiperContainer extends Component {

    /**
     * @function 声明Props类型
     * @type {{options: *}}
     */
    static propTypes = {
        options: PropTypes.object
    };

    static defaultProps = {
        options: {}
    };


    /**
     * @function 默认的构造函数
     */
    constructor(props) {

        super(props);

        //绑定私有方法的this指针
        this._onExternalLoaded = this._onExternalLoaded.bind(this);
    }

    /**
     * @function 在外部脚本加载完成后执行Swiper的渲染
     * @private
     */
    _onExternalLoaded() {

        /**
         * @function 初始化Swiper
         * @type {Window.Swiper|Swiper}
         */
        this.swiper = new Swiper('.swiper-container', this.props.options);
    }

    render() {
        return (
            <ReactExternalLoader
                srcArray={["https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css",
                "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.min.js"]}

                onLoad={this._onExternalLoaded}

            >
                <section className="swiper-container">
                    <div className="swiper-wrapper">
                        {this.props.children}
                    </div>
                </section>
            </ReactExternalLoader>
        );
    }

}


/**
 * @function 默认的Swiper页帧
 */
export class SwiperSlide extends Component {

    /**
     * @function 默认渲染函数
     * @returns {XML}
     */
    render() {

        return (<section className="swiper-slide">
            {this.props.children}
        </section>);

    }
}


```