
import React from 'react'
import cls from 'classnames'
import Toast from 'components/toast'
import Scroll from 'components/scroll'
import { getImageUrl } from 'utils/utils'
import NavBar from '../common-components/nav-bar'
import { getOrderSnapshot, getOrderDesc } from '../../api'
import styles from './index.less'

export default class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      desc: {},
      snapshot: {},
    }
  }

  componentDidMount() {
    this.initPage()
  }

  initPage = async () => {
    const { state } = this.props.location
    try {
      const [snapshot, desc] = await Promise.all([
        getOrderSnapshot(state),
        getOrderDesc(state),
      ])
      this.setState({
        desc: desc.data,
        snapshot: snapshot.data,
      })
    } catch ({ err }) {
      Toast.info(err)
    }
  }

  render() {
    const { desc, snapshot } = this.state
    const food = snapshot.basket ? snapshot.basket.group[0] : []
    const extra = snapshot.basket ? snapshot.basket.extra : []

    return (
      <div className={styles.detail}>
        <NavBar
          title="订单详情"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <Scroll className={styles.scroll} dataSource={food}>
          <div className={styles.content}>
            <div className={styles.item}>
              <div className={styles.img}>
                <img src={getImageUrl(snapshot.restaurant_image_hash)} />
              </div>
              <span className={styles.text}>{snapshot.restaurant_name}</span>
            </div>

            {
              food.map((v, i) => (
                <div className={styles.item} key={i}>
                  <span className={styles.text}>{v.name}</span>
                  <span className={styles.num}>x{v.quantity}</span>
                  <span className={styles.price}>¥{v.price}</span>
                </div>
              ))
            }

            <div className={styles.item}>
              <span className={styles.text}>配送费</span>
              <span className={styles.price}>
                ¥{snapshot.basket && snapshot.basket.deliver_fee.price}
              </span>
            </div>

            {
              extra.map((v, i) => (
                <div className={styles.item} key={i}>
                  <span className={styles.text}>{v.name}</span>
                  <span
                    className={cls(styles.price, styles.red)}>
                    - ¥{v.price.toString().slice(1)}
                  </span>
                </div>
              ))
            }

            {
              snapshot.basket && snapshot.basket.hongbao.category_id ? (
                <div className={styles.item}>
                  <span className={styles.text}>{snapshot.basket.hongbao.name}</span>
                  <span
                    className={cls(styles.price, styles.red)}>
                    - ¥{snapshot.basket.hongbao.price.toString().slice(1)}
                  </span>
                </div>
              ) : null
            }

            <h1 className={styles.total}>实付 ¥{snapshot.total_amount}</h1>
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>配送信息</h1>
            <div className={styles.desc}>
              <div className={styles.item}>
                <span className={styles.label}>送达时间</span>
                <span className={styles.text}>{snapshot.deliver_time}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>送货地址</span>
                <span className={styles.text}>
                  {snapshot.consignee}<br />{snapshot.phone}<br />{snapshot.address}
                </span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>配送方式</span>
                <span className={styles.text}>{desc.delivery_company}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>配送骑手</span>
                <span className={styles.text}>{desc.rider_name},{desc.rider_phone}</span>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>订单信息</h1>
            <div className={styles.desc}>
              <div className={styles.item}>
                <span className={styles.label}>订单号</span>
                <span className={styles.text}>{snapshot.id}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>支付方式</span>
                <span className={styles.text}>{snapshot.pay_method}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>下单时间</span>
                <span className={styles.text}>{snapshot.formatted_created_at}</span>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    )
  }
}
