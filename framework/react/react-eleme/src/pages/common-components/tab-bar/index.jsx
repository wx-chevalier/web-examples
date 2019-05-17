

import React from 'react'
import cls from 'classnames'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

export default (Component) => {
  return class TabBar extends React.Component {
    render() {
      const { pathname } = this.props.location
      const itemCls = name => cls({
        [styles.item]: true,
        [styles.active]: pathname === name,
      })
      const handleClick = (path) => {
        if (path === pathname) return
        this.props.history.push(path)
      }
      return (
        <div className={styles.root}>
          <Component {...this.props} />
          <div className={styles['tab-wrapper']}>
            <div className={itemCls('/home')} onClick={() => handleClick('/home')}>
              <SvgIcon className={cls(styles.icon, styles.scale)} name="#elem" />
              <h1 className={styles.text}>微淘</h1>
            </div>
            <div className={itemCls('/compass')} onClick={() => handleClick('/compass')}>
              <SvgIcon className={styles.icon} name="#compass" />
              <h1 className={styles.text}>发现</h1>
            </div>
            <div className={itemCls('/order')} onClick={() => handleClick('/order')}>
              <SvgIcon className={styles.icon} name="#form" />
              <h1 className={styles.text}>订单</h1>
            </div>
            <div className={itemCls('/profile')} onClick={() => handleClick('/profile')}>
              <SvgIcon className={styles.icon} name="#people" />
              <h1 className={styles.text}>我的</h1>
            </div>
          </div>
        </div>
      )
    }
  }
}
