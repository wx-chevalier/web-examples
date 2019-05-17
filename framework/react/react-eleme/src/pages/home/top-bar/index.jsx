

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import cls from 'classnames'
import SvgIcon from 'components/icon-svg'
import { homeUpdate } from '../../../stores/home'
import styles from './index.less'

const mapStateToProps = ({ home }) => ({
  topBarShrink: home.topBarShrink,
  locationInfo: home.locationInfo,
})
const mapActionsToProps = dispatch => bindActionCreators({ homeUpdate }, dispatch)

@connect(mapStateToProps, mapActionsToProps)
@withRouter
export default class TopBar extends React.PureComponent {
  render() {
    const { topBarShrink, history } = this.props
    const { address } = this.props.locationInfo
    const clsname = cls({
      [styles.header]: true,
      [styles.shrink]: topBarShrink,
    })
    return (
      <div className={clsname}>
        <div className={styles.location} onClick={() => history.push('/search-address')}>
          <SvgIcon className={styles.icon} name="#location" />
          <h1 className={styles.address}>{address ? address : '正在识别地址...'}</h1>
          <SvgIcon className={styles.down} name="#triangle_down_fill" />
        </div>
        <div className={styles.search} onClick={() => history.push('/search-shop')}>
          <SvgIcon className={styles.icon} name="#search" />
          <p className={styles.desc}>搜索饿了么商家、商品名称</p>
        </div>
      </div>
    )
  }
}
