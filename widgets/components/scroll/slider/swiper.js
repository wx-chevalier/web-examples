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

