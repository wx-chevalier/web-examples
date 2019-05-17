
/* eslint-disable */
import React from 'react'
import Proptypes from 'prop-types'
import loading from './loading.gif'
import styles from './index.less'

export default class Loading extends React.Component {
  static proptypes = {
    title: Proptypes.string,
    style: Proptypes.object,
  }

  static defaultProps = {
    title: '',
    style: {},
  }

  constructor(props) {
    super(props)
    this.ratio = window.devicePixelRatio
    this.state = {
      width: 14 * this.ratio,
      height: 14 * this.ratio,
    }
  }

  render() {
    const { width, height } = this.state
    const { title, style } = this.props
    return (
      <div className={styles.loading} style={style}>
        <img
          src={loading}
          width={width}
          height={height}
          style={{ width: width / this.ratio, height: height / this.ratio }} />
        <p className={styles.desc}>正在加载...</p>
      </div>
    )
  }
}
