

import React from 'react'
import cls from 'classnames'
import numeral from 'numeral'
import Rate from 'components/rate'
import SvgIcon from 'components/icon-svg'
import Badge from '../badge'
import styles from './index.less'

export default class ShopListRow extends React.PureComponent {
  state = {
    showAll: false,
  }

  showAll = (e) => {
    e.stopPropagation()
    // 刷新 betterscroll
    const { refresh } = this.props
    this.setState({
      showAll: !this.state.showAll,
    }, () => {
      refresh && refresh()     // eslint-disable-line
    })
  }

  render() {
    const { showAll } = this.state
    const { data, handleClick } = this.props
    const activities = data.activities || []

    const arrowCls = cls({
      [styles.down]: true,
      [styles.active]: showAll,
    })

    return (
      <div className={styles['shop-row']} onClick={handleClick}>
        <div className={styles['info-wrapper']}>
          <div className={styles.img}>
            <img alt="" src={data.image_url} />
            {
              data.next_business_time ? (
                <div className={styles.desc} content={`${data.next_business_time}开始配送`} />
              ) : null
            }
          </div>

          <div className={styles.describe}>
            <h1 className={styles.name}>{data.name}</h1>
            <div className={styles['rate-wrapper']}>
              <div className={styles.rate}>
                <Rate className={styles['rate-style']} value={data.rating} size="1em" />
              </div>
              <span className={styles.text}>{data.rating}</span>
              <span className={styles.text}>{`月售${data.recent_order_num}单`}</span>
              {
                data.delivery_mode ? (
                  <Badge className={styles.delivery} text={data.delivery_mode.text} />
                ) : null
              }
            </div>

            <div className={styles['price-info']}>
              <div className={styles.delivery}>
                <span className={styles.text}>{`¥起送${data.float_minimum_order_amount}`}</span>
                <span className={`${styles.line} hairline-v`} />
                <span className={styles.text}>{`配送费¥${data.float_delivery_fee}`}</span>
              </div>
              <div className={styles.address}>
                <span className={styles.text}>{`${numeral(data.distance / 1000).format('0.00')}km`}</span>
                <span className={`${styles.line} hairline-v`} />
                <span className={styles.text}>{`${data.order_lead_time}分钟`}</span>
              </div>
            </div>
            {
              data.recommend.color && data.recommend.image_url ? (
                <div className={styles.koubei}>
                  <div className={styles.img}>
                    <img src={data.recommend.image_url} />
                  </div>
                  <span style={{ color: data.recommend.color }}>{data.recommend.reason}</span>
                </div>
              ) : null
            }
            <span className={`${styles['dash-line']} hairline-h`} />

            <div className={styles.activities}>
              <div className={styles['item-wrapper']}>
                {
                  activities.map((v, i) => (
                    <div
                      className={styles.item}
                      key={v.id}
                      style={{ display: i > 1 && !showAll ? 'none' : 'flex' }}>
                      <Badge
                        className={styles.icon}
                        text={v.icon_name}
                        style={{ backgroundColor: `#${v.icon_color}` }} />
                      <span className={styles.tips}>{v.tips}</span>
                    </div>
                  ))
                }
              </div>
              {
                activities.length > 2 ? (
                  <div className={styles['active-wrapper']} onClick={this.showAll}>
                    <span className={styles.text}>{activities.length}个活动</span>
                    <SvgIcon className={arrowCls} name="#triangle_down_fill" />
                  </div>
                ) : null
              }
            </div>

          </div>
        </div>
        <span className={`${styles['bottom-line']} hairline-h`} />
      </div>
    )
  }
}
