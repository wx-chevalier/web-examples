

import React from 'react'
import { connect } from 'react-redux'
import { getImageUrl } from 'utils/utils'
import Scroll from 'components/scroll'
import Badge from '../../common-components/badge'
import styles from './index.less'

@connect(({ shop }) => ({
  info: shop.info,
}))
export default class ShopInfo extends React.PureComponent {
  render() {
    const { show, info } = this.props
    const flavors = info.flavors.length ? info.flavors.map(v => v.name).join(',') : '--'
    const opening_hours = info.opening_hours.length ? info.opening_hours.join(',') : '--'

    return !show ? null : (
      <div className={styles['shop-info']}>
        <Scroll className={styles.scroll}>
          <div className={styles.card}>
            <h1 className={styles.title}>配送信息</h1>
            <p className={styles.desc}>{`由蜂鸟快送提供配送,约${info.order_lead_time}分钟送达,距离${info.distance}m`}</p>
            <p className={styles.desc}>{info.piecewise_agent_fee ? info.piecewise_agent_fee.description : ''}</p>
          </div>

          <div className={styles.card}>
            <h1 className={styles.title}>活动与服务</h1>
            {
              info.activities ? info.activities.map(v => (
                <div className={styles.activities} key={v.id}>
                  <Badge
                    className={styles.icon}
                    text={v.icon_name}
                    style={{ backgroundColor: `#${v.icon_color}` }} />
                  <span className={styles.tips}>{v.tips}</span>
                </div>
              )) : <p className={styles.desc}>暂无活动</p>
            }
          </div>

          <div className={styles.card}>
            <h1 className={styles.title}>商家实景</h1>
            <div>
              {
                info.albums ? info.albums.map((img, i) => (
                  <div className={styles.img} key={i}>
                    <img src={getImageUrl(img.photos[0].image_hash)} />
                  </div>
                )) : <p className={styles.desc}>暂无实景</p>
              }
            </div>
          </div>

          <div className={styles.card}>
            <h1 className={styles.title}>商家信息</h1>
            <p className={styles.desc}>{info.description}</p>
            <div className={styles.item}>
              <div className={styles.label}>品类</div>
              <div className={styles.value}>{flavors}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>商家电话</div>
              <div className={styles.value}>{info.phone}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>地址</div>
              <div className={styles.value}>{info.address}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>营业时间</div>
              <div className={styles.value}>{opening_hours}</div>
            </div>
          </div>
        </Scroll>
      </div>
    )
  }
}
