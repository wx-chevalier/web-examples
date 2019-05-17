

import React from 'react'
import cls from 'classnames'
import { connect } from 'react-redux'
import Scroll from 'components/scroll'
import styles from './index.less'

const mapStateToProps = ({ shop }) => ({
  menu: shop.menu,
  foodMenuIndex: shop.foodMenuIndex,
})
@connect(mapStateToProps)
export default class Menu extends React.PureComponent {
  render() {
    const { menu, foodMenuIndex, menuClick } = this.props
    const menuCls = v => cls([styles.item, v === foodMenuIndex ? styles.active : null])
    return (
      <div className={styles['food-menu']}>
        <Scroll dataSource={menu} className={styles.scroll} stopPropagation={true}>
          {
            menu.map((v, i) => (
              <div key={i} className={menuCls(i)} onClick={() => menuClick(i)}>
                <span className={styles.text}>{v.name}</span>
              </div>
            ))
          }
        </Scroll>
      </div>
    )
  }
}
