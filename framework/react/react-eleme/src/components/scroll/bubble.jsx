
/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

export default class Bubble extends React.Component {
  /*
   * y: 拖动距离
   */
  static propTypes = {
    y: PropTypes.number.isRequired,
  }

  static defaultProps = {
    y: 0,
  }

  constructor(props) {
    super(props)
    this.ratio = window.devicePixelRatio
    // 初始半径
    this.initRadius = 18 * this.ratio
    // 上半圆最小半径
    this.minHeadRadius = 12 * this.ratio
    // 下半圆最小半径
    this.minTailRadius = 5 * this.ratio
    // 初始箭头半径
    this.initArrowRadius = 10 * this.ratio
    // 最小箭头半径
    this.minArrowRadius = 6 * this.ratio
    // 箭头宽度
    this.arrowWidth = 3 * this.ratio
    // 最大移动距离
    this.maxDistance = 40 * this.ratio
    // x 坐标
    this.initCenterX = 25 * this.ratio
    // y 坐标
    this.initCenterY = 25 * this.ratio
    // 上半圆初始中心坐标
    this.headCenter = {
      x: this.initCenterX,
      y: this.initCenterY,
    }
    // y移动距离
    this.distance = 0
    this.state = {
      width: 50 * this.ratio,
      height: 80 * this.ratio,
    }
  }

  componentDidMount() {
    this.draw()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.y !== this.props.y) {
      this.distance = Math.max(0, Math.min(this.props.y * this.ratio, this.maxDistance))
      this.draw()
    }
  }

  draw = () => {
    const ctx = this.bubble.getContext('2d')
    ctx.clearRect(0, 0, this.bubble.width, this.bubble.height)
    this.drawBubble(ctx)
    this.drawArrow(ctx)
  }

  drawBubble = (ctx) => {
    ctx.save()
    ctx.beginPath()
    // 计算移动比率
    const rate = this.distance / this.maxDistance
    // 上半圆半径
    const headRadius = this.initRadius - ((this.initRadius - this.minHeadRadius) * rate)
    // 上半圆 y 坐标
    this.headCenter.y = this.initCenterY - ((this.initRadius - this.minHeadRadius) * rate)
    // 画上半圆弧
    ctx.arc(this.headCenter.x, this.headCenter.y, headRadius, 0, Math.PI, true)
    // 画左侧贝塞尔
    // 下半圆半径
    const tailRadius = this.initRadius - ((this.initRadius - this.minTailRadius) * rate)
    // 小圆中心
    const tailCenter = {
      x: this.headCenter.x,
      y: this.headCenter.y + this.distance,
    }
    const tailPointL = {
      x: tailCenter.x - tailRadius,
      y: tailCenter.y,
    }
    const controlPointL = {
      x: tailPointL.x,
      y: tailPointL.y - (this.distance / 2),
    }
    ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y)
    // 画下半弧线
    ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true)
    // 画右侧贝塞尔
    const headPointR = {
      x: this.headCenter.x + headRadius,
      y: this.headCenter.y,
    }
    const controlPointR = {
      x: tailCenter.x + tailRadius,
      y: headPointR.y + (this.distance / 2),
    }
    ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y)
    ctx.shadowBlur = 10
    ctx.shadowOffsetY = 4
    ctx.shadowColor = 'rgba(0,170,255,.3)'
    ctx.fillStyle = 'rgb(0,170,255)'
    ctx.fill()
    ctx.strokeStyle = 'rgb(0,170,255)'
    ctx.stroke()
    ctx.restore()
  }

  drawArrow = (ctx) => {
    ctx.save()
    ctx.beginPath()
    const rate = this.distance / this.maxDistance
    // 半径
    const arrowRadius = this.initArrowRadius - ((this.initArrowRadius - this.minArrowRadius) * rate)
    // 画内圆
    ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius - this.arrowWidth - rate, -Math.PI / 2, 0, true)
    // 画外圆
    ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false)
    ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius - this.arrowWidth / 2 + rate)
    ctx.lineTo(this.headCenter.x + this.arrowWidth * 2 - rate * 2, this.headCenter.y - arrowRadius + this.arrowWidth / 2)
    ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius + this.arrowWidth * 3 / 2 - rate)
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.fill()
    ctx.strokeStyle = 'rgb(255,255,255)'
    ctx.stroke()
    ctx.restore()
  }

  render() {
    const { width, height } = this.state
    return <canvas ref={c => this.bubble = c} width={width} height={height} style={{ width: width / this.ratio, height: height / this.ratio }} />
  }
}
