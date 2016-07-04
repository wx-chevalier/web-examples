/**
 * Created by apple on 16/7/1.
 */
import React, {Component, PropTypes} from "react";

//加载ES6 Promise Polyfill
require('es6-promise').polyfill();

//判断某个脚本是否已经被加载
const promises = {};

/**
 * @function 用于加载Script脚本
 * @param src
 * @returns {*}
 */
function loadScript(src) {

    //判断该脚本是否被加载过
    if (promises[src]) {
        return promises[src]
    }

    //构造一个Promise对象
    let promise = promises[src] = new Promise(resolve => {

        //创建一个script元素
        var el = document.createElement('script');

        var loaded = false;

        //设置加载完成的回调事件
        el.onload = el.onreadystatechange = () => {

            //防止重复加载
            if ((el.readyState && el.readyState !== 'complete' && el.readyState !== 'loaded') || loaded) {
                return false;
            }

            //加载完成后将该脚本的onload设置为null
            el.onload = el.onreadystatechange = null;

            loaded = true;

            resolve();
        };

        el.async = true;

        el.src = src;

        let head = document.getElementsByTagName('head')[0];

        head.insertBefore(el, head.firstChild);

    });

    return promise;

}

/**
 * @function 用于加载CSS文件
 * @param src
 * @returns {*}
 */
function loadCSS(src) {

    //判断该脚本是否被加载过
    if (promises[src]) {
        return promises[src]
    }

    //构造一个Promise对象
    let promise = promises[src] = new Promise(resolve => {

        //创建一个script元素
        var el = document.createElement('link');

        el.rel = "stylesheet";

        el.href = src;

        el.media = "only x";

        var loaded = false;

        //设置加载完成的回调事件
        el.onload = el.onreadystatechange = () => {

            //防止重复加载
            if ((el.readyState && el.readyState !== 'complete' && el.readyState !== 'loaded') || loaded) {
                return false;
            }

            //加载完成后将该脚本的onload设置为null
            el.onload = el.onreadystatechange = null;

            loaded = true;

            el.media = "all";

            resolve();
        };

        //获取文档头元素
        let head = document.getElementsByTagName('head')[0];

        //插入刚才创建好的元素
        head.insertBefore(el, head.firstChild);

    });

    return promise;

}

export class ReactExternalLoader extends Component {

    //设置默认的Props
    static defaultProps = {

        //需要加载的外部资源地址
        srcArray: ['javascript:void(0)'],

        //正在加载的指示
        loadingIndicator: (<div>
            Loading
        </div>),

        //加载完成回调
        onLoad: () => {
        }
    };

    //设置需要载入的Props
    static propTypes = {
        srcArray: React.PropTypes.array,
        loadingIndicator: React.PropTypes.object,
        onLoad: React.PropTypes.func
    };

    //全局状态
    state = {
        done: false
    };

    /**
     * @function 组件加载完毕之前的回调
     */
    componentWillMount() {

        Promise.all(
            this.props.srcArray.map((src)=> {

                //判断是否为JS
                if (typeof src === "string" && src.indexOf(".js") > -1) {
                    return loadScript(src);
                } else {
                    return loadCSS(src);
                }

            })
        ).then(
            ()=> {

                //设置加载完成
                this.setState({
                    done: true
                });

                //调用外部的完成回调
                this.props.onLoad();
            }
        );

    }

    /**
     * @function 渲染方法
     * @returns {*}
     */
    render() {

        //如果加载完成
        if (this.state.done) {

            //返回实际的子组件
            return this.props.children
        } else {

            //返回加载指示
            return this.props.loadingIndicator;

        }
    }


}