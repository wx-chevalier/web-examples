

import React from 'react'
import SvgIcon from 'components/icon-svg'
import { getImageUrl } from 'utils/utils'
import styles from './index.less'

export default class RecommedFoodRow extends React.PureComponent {
  render() {
    const { data, rowClick } = this.props
    const { food, restaurant } = data
    const foodUrl = getImageUrl(food.image_path)
    return (
      <div className={styles.row} onClick={rowClick}>
        <div className={styles.pic}>
          <img src={foodUrl} />
          <p className={styles.tip}><span>{food.reason}</span></p>
        </div>
        <div className={styles.desc}>
          <h1 className={styles.title}>{food.name}</h1>
          <p className={styles.sell}>{`月售${food.month_sales} 好评率${food.satisfy_rate}%`}</p>
          <h4 className={styles.amount}>
            <span className={styles.unit}>¥</span>
            <span>{food.price}</span>
          </h4>
          <div className={styles.shop}>
            <SvgIcon className={styles.icon} name="#shop" />
            <h1 className={styles.name}>{restaurant.name}</h1>
          </div>
        </div>
      </div>
    )
  }
}
