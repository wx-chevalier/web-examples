

import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.less'

const noticeProps = {
  duration: PropTypes.number,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onClose: PropTypes.func,
}

const defaultProps = {
  duration: 2,
  content: '',
  onClose: () => {},
}

// 动画时间
const animationDuration = 300
const prefixCls = 'notice'

/**
 * Notice 初始化的时候 生成一个定时器
 * 根据输入的时间 加载一个动画 然后执行输入的回调
 * Notice的显示和隐藏收到父组件Notification的绝对控制
 */
export default class Notice extends React.Component {
  static defaultProps = defaultProps
  static propTypes = noticeProps

  constructor(props) {
    super(props)
    // shouldClose 用于判断何时改添加上离场动画
    this.state = {
      shouldClose: false,
    }
  }

  componentDidMount() {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.onClose()
      }, (this.props.duration * 1000) - animationDuration)
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer()
  }

  onClose = () => {
    // 清除定时器 并且 开启离场动画 并且等待动画结束后执行 onClose回调
    this.clearCloseTimer()
    this.setState({ shouldClose: true })
    this.timer = setTimeout(() => {
      if (this.props.onClose) {
        this.props.onClose()
      }
      clearTimeout(this.timer)
    }, animationDuration)
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
      this.closeTimer = null
    }
  }

  render() {
    const { shouldClose } = this.state
    const { content } = this.props

    return (
      <div className={cls([
        styles[`${prefixCls}-container`],
        { [styles.leave]: shouldClose },
      ])}>
        <div className={styles[`${prefixCls}-content`]}>{content}</div>
      </div>
    )
  }
}
