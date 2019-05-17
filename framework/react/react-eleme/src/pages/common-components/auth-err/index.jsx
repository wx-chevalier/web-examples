

import React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './index.less'

@withRouter
export default class AuthErr extends React.PureComponent {
  render() {
    const goLogin = () => {
      this.props.history.push('/login')
    }
    return (
      <div className={styles.err}>
        <div className={styles.img}>
          <img src="//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" />
        </div>
        <p className={styles.desc}>登录后查看更多信息</p>
        <button className={styles.login} onClick={goLogin}>登录</button>
      </div>
    )
  }
}
