
import React from 'react'
import ReactDOM from 'react-dom'
import Notice from './notices'
import styles from './index.less'

const prefixCls = 'notification'
let noticeNumber = 0
const getUuid = () => `notification-${+new Date()}-${noticeNumber++}`

export default class Notification extends React.Component {
  constructor(props) {
    super(props)
    /**
     * notices 存放notices数组
     * hasMask 是否显示遮罩
     */
    this.state = {
      notices: [],
      hasMask: true,
    }
  }

  // 创建noticeDom
  getNoticeDOM = () => {
    const { notices } = this.state
    return notices.map((notice) => {
      return <Notice key={notice.key} {...notice} />
    })
  }

  // 创建mask遮罩
  getMaskDOM = () => {
    const { notices, hasMask } = this.state
    // notices 不为空 && 始终只显示一个 mask
    if (notices.length && hasMask) {
      return <div className={styles.mask} />
    }
  }

  // 添加 notice 方法
  add = (notice) => {
    const key = notice.key || getUuid()
    const mask = notice.mask || false
    // 排除重复因素后再添加
    this.setState((preState) => {
      const { notices } = preState
      if (!notices.find(v => v.key === key)) {
        return {
          notices: [...notices, { ...notice, key }],
          hasMask: mask,
        }
      }
    })
  }

  // 移除notice
  remove = (key) => {
    this.setState((preState) => {
      return {
        notices: preState.notices.filter(v => v.key === key),
      }
    })
  }

  render() {
    const noticesDOM = this.getNoticeDOM()
    const maskDOM = this.getMaskDOM()
    return (
      <div className={styles[`${prefixCls}-container`]}>
        {maskDOM}
        <div className={styles[`${prefixCls}-box`]}>
          {noticesDOM}
        </div>
      </div>
    )
  }
}

/**
 * Notification静态类方法 用于创建 Notification组件 以及返回他的方法和组件本身
 * properties 需要传递给 Notification的props
 * callback 用于接收 Notification各种方法的回调
 */
Notification.newInstance = (properties, callback) => {
  const { ...props } = properties || {}
  const div = document.createElement('div')
  document.body.appendChild(div)

  let called = false
  function ref(notification) {
    if (called) return
    called = true
    callback({
      notice(noticeProps) {
        notification.add(noticeProps)
      },
      removeNotice(key) {
        notification.remove(key)
      },
      destroy() {
        ReactDOM.unmountComponentAtNode(div)
        div && div.parentNode.removeChild(div)      // eslint-disable-line
      },
    })
  }
  ReactDOM.render(<Notification {...props} ref={ref} />, div)
}
