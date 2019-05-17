

import React from 'react'
import numeral from 'numeral'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

export default class OrderRow extends React.PureComponent {
  render() {
    const { data, handleClick } = this.props

    return (
      <div className={styles['order-row']} onClick={handleClick}>
        <div className={styles['order-body']}>
          <div className={styles['shop-img']}>
            <img src={data.restaurant_image_path} />
          </div>

          <div className={styles['info-wrapper']}>
            <div className={styles['shop-info']}>
              <div className={styles.shop}>
                <h1 className={styles.name}>{data.restaurant_name}</h1>
                <div className={styles.icon}>
                  <SvgIcon name="#right" />
                </div>
              </div>
              <p className={styles.status} style={{ color: `#${data.status_bar.color}` }}>{data.status_bar.title}</p>
            </div>

            <p className={styles.time}>{data.formatted_created_at}</p>
            <div className={`${styles.line} hairline-h`} />

            <div className={styles['order-detail']}>
              <p className={styles.desc}>
                {data.basket.group[0][0].name}
                {
                  data.basket.group[0].length ? `等${data.basket.group[0].length}商品` : ''
                }
              </p>
              <h1 className={styles.price}>¥{numeral(data.total_amount).format('0.00')}</h1>
            </div>
          </div>
        </div>

        <div className={`${styles.line} hairline-h`} style={{ marginTop: 0 }} />

        <div className={styles['order-footer']}>
          <button className={styles.more}>再来一单</button>
        </div>
      </div>
    )
  }
}
