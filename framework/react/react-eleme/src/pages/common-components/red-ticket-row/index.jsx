

import React from 'react'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

export default class RedTicketRow extends React.PureComponent {
  render() {
    const { data, rowClick } = this.props
    return (
      <div className={styles.row}>
        <div className={styles.body}>
          <SvgIcon className={styles.icon} name="#new" />
          <div className={styles.left}>
            <h1 className={styles.amount}>
              <span className={styles.unit}>¥</span>
              <span>{data.amount}</span>
            </h1>
            <p className={styles.desc}>{data.description_map.sum_condition}</p>
          </div>
          <div className={styles.center}>
            <h1 className={styles.title}>{data.name}</h1>
            <p className={styles.desc}>{data.description_map.validity_periods}</p>
            <p className={styles.desc}>{data.description_map.phone}</p>
          </div>
          <div className={styles.right}>
            <h1 className={styles.title}>{data.description_map.validity_delta}</h1>
            <button className={styles.btn} onClick={rowClick}>去使用</button>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.desc}>
            <span>{data.limit_map.restaurant_flavor_ids}</span>
          </p>
        </div>
      </div>
    )
  }
}
