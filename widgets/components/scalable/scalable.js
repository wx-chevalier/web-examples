/**
 * Created by apple on 16/6/30.
 */
import React, {Component, PropTypes} from "react";

export default class ScalableComponent extends Component {

    //设置属性值
    static propTypes = {
        mode: PropTypes.oneOf(['auto', 'contain', 'cover']), //选择的模式
        width: PropTypes.number, //视觉稿宽度
        height: PropTypes.number, //视觉稿高度
        origin: PropTypes.string,//缩放中心点
        wrapperBackgroundColor: PropTypes.string//背景颜色
    };

    /**
     * @function 构造函数
     * @param props
     */
    constructor(props) {

        super(props);

        let userAgent = navigator.userAgent;

        //判断是否为指定设备
        this.wp = userAgent.match(/Windows Phone ([\d.]+)/); //判断是否为WindowsPhone
        this.android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/); //判断是否为Android

        //获取设备的宽高比
        this.state = {
            deviceWidth: document.documentElement.clientWidth,
            deviceHeight: document.documentElement.clientHeight
        };


        //根据模式判断页面缩放比例
        this.mode = this.props.mode || "auto";

        //缩放中心
        this.origin = this.props.origin || "left top 0";

        //传入的视觉稿
        this.visualWidth = this.props.width || 320;

        this.visualHeight = this.props.height || 504;

        this.wrapperBackgroundColor = this.props.wrapperBackgroundColor || "black";

        this._calcScaleRatio = this._calcScaleRatio.bind(this);

        this._updateDimensions = this._updateDimensions.bind(this);

    }

    /**
     * @function 为了避免重绘,在ComponentWillMount之前
     */

    componentDidMount() {
        //监听页面尺寸变化
        window.addEventListener("resize", this._updateDimensions);
    }

    componentWillUnmount() {
        //移除页面尺寸变化监听
        window.removeEventListener("resize", this._updateDimensions);
    }

    /**
     * @function 更新屏幕尺寸
     * @private
     */
    _updateDimensions() {
        this.setState({
            deviceWidth: document.documentElement.clientWidth,
            deviceHeight: document.documentElement.clientHeight
        });
    }

    /**
     * @function 计算缩放参数
     * @private
     */
    _calcScaleRatio() {

        //默认缩放比例为1
        let scaleRatio = 1;

        let deviceAspectRatio = this.state.deviceWidth / this.state.deviceHeight;

        //计算传入的视觉稿的比
        let visualAspectRatio = this.visualWidth / this.visualHeight;

        //计算缩放比
        if (this.mode === "contain") {
            //如果是包含模式,根据宽高中较大值进行缩放
            scaleRatio = deviceAspectRatio > visualAspectRatio ? this.state.deviceHeight / this.visualHeight : this.state.deviceWidth / this.visualWidth;


        } else if (this.mode === "cover") {

            scaleRatio = deviceAspectRatio < visualAspectRatio ? this.state.deviceHeight / this.visualHeight : this.state.deviceWidth / this.visualWidth;

        } else {

            scaleRatio = this.state.deviceWidth / this.visualWidth;

        }

        return scaleRatio;

    }

    /**
     * @function 默认的渲染函数
     * @returns {XML}
     */
    render() {

        const scaleRatio = this._calcScaleRatio();

        //设置包裹层样式
        let wrapperStyle = {
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: this.wrapperBackgroundColor,
            overflow: "hidden"
        };

        //设置内部元素的缩放属性
        let scaleStyle = {
            width: this.visualWidth,
            height: this.visualHeight,
            WebkitTransformOrigin: this.origin,
            transformOrigin: this.origin,
            WebkitTransform: `scale(${scaleRatio})`,
            transform: `scale(${scaleRatio})`
        };

        // 兼容android 2.3.5系统下body高度不自动刷新的bug
        if (this.mode === "auto" && this.android) {
            document.body.style.height = this.visualHeight * scaleRatio + "px";

        } else if (this.mode === "contain" || this.mode === "cover") {
            //如果是contain模式
            //设置为绝对定位
            scaleStyle.position = "absolute";

            scaleStyle.left = (this.state.deviceWidth - this.visualWidth) / 2 + "px";

            scaleStyle.top = (this.state.deviceHeight - this.visualHeight) / 2 + "px";

            scaleStyle.WebkitTransformOrigin = "center center 0";

            scaleStyle.transformOrigin = "center center 0";

            //阻止默认滑屏事件
            if (this.wp) {
                document.body.style.msTouchAction = "none";
            } else {
                document.ontouchmove = function (e) {
                    e.preventDefault()
                }
            }
        }

        return (<section style={wrapperStyle}>
            <div style={scaleStyle}>
                {/*直接将子元素放置在这里*/}
                {this.props.children}
            </div>
        </section>)
    }
}