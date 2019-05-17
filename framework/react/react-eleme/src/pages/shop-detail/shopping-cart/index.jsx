

import React from 'react'
import cls from 'classnames'
import numeral from 'numeral'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Transition from 'react-transition-group/Transition'
import { TransitionGroup } from 'react-transition-group'
import { shoppingCartUpdate } from 'stores/shopping-cart'
import SvgIcon from 'components/icon-svg'
import eventProxy from 'utils/event-proxy'
import { getGuid } from 'utils/utils'
import { watchTransitionEvent } from 'utils/dom'
import Stepper from '../cartcontrol/stepper'
import styles from './index.less'


@connect(({ shoppingCart }) => ({
  cart: shoppingCart.cart,
}), dispatch => bindActionCreators({
  shoppingCartUpdate,
}, dispatch))
export default class ShoppingCart extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const cartList = nextProps.cart.filter(v => v.restaurant_id === nextProps.info.id)
    if (!cartList.length && prevState.modalVisible) {
      return {
        modalVisible: false,
      }
    }
    return null
  }

  state = {
    modalVisible: false,
    cartIconRect: {},
    balls: [],
  }

  componentDidMount() {
    this.state.cartIconRect = this.cartIcon.getBoundingClientRect()
    eventProxy.on('cartBall', (dom) => {
      this.drop(dom)
    })
  }

  componentWillUnmount() {
    eventProxy.off('cartBall')
  }

  hide = () => {
    this.setState({ modalVisible: false })
  }

  drop = (dom) => {
    const ballWidth = dom.clientWidth
    // 购物车位置
    const { cartIconRect } = this.state
    const left = cartIconRect.x + (cartIconRect.width / 2) - (ballWidth / 2)
    const top = cartIconRect.y + (cartIconRect.width / 2) - (ballWidth / 2)
    // 小球初始化样式
    const outerStyle = {
      left,
      top,
      position: 'fixed',
      transition: 'all .6s cubic-bezier(0.49,-0.29,0.75,0.41)',
    }
    const innerStyle = {
      width: ballWidth,
      height: ballWidth,
      borderRadius: ballWidth,
      background: '#0af',
      transition: 'all .6s linear',
    }
    const sRect = dom.getBoundingClientRect()
    const sx = (sRect.left + ballWidth / 2) - (cartIconRect.x + cartIconRect.width / 2)
    const sy = -((cartIconRect.bottom - cartIconRect.width / 2) - (sRect.bottom - sRect.width / 2))

    const innerTransition = {
      entering: { transform: `translate3d(${sx}px, 0, 0)` },
      entered: { transform: 'translate3d(0, 0, 0)' },
    }

    const outerTransition = {
      entering: { transform: `translate3d(0, ${sy}px, 0)` },
      entered: { transform: 'translate3d(0, 0, 0)' },
    }

    this.setState({
      balls: [
        ...this.state.balls,
        {
          outerStyle,
          innerStyle,
          innerTransition,
          outerTransition,
          id: getGuid(),
        },
      ],
    })
  }

  dropEnd = (node) => {
    node.addEventListener(watchTransitionEvent(), () => {
      const value = node.getAttribute('value')
      this.setState({
        balls: this.state.balls.filter(b => b.id !== value),
      })
    })
  }

  render() {
    const { info, cart } = this.props
    const { modalVisible, balls } = this.state
    // 当前店中选中的食物
    const cartList = cart.filter(v => v.restaurant_id === info.id)
    // count数量
    const count = cartList.reduce((acc, val) => {
      return acc + val.quantity
    }, 0)
    // price价格
    const price = cartList.reduce((acc, val) => {
      return acc + (val.price * val.quantity)
    }, 0)
    // button
    const buttonDes = (() => {
      if (price === 0) {
        return `￥${info.float_minimum_order_amount}元起送`
      } else if (price < info.float_minimum_order_amount) {
        return `还差￥${info.float_minimum_order_amount - price}元起送`
      }
      return '去结算'
    })()

    // notice 和 真实价格
    const priceInfo = (() => {
      const { activities } = info
      let notice = '暂无满减'
      let real_price = price
      if (activities.length && activities[0].type === 102) {
        const discount = JSON.parse(activities[0].attribute)
        const keys = Object.keys(discount)
        // 寻找满减key
        let discountKey
        keys.forEach((v) => {
          if (price >= v) {
            discountKey = v
          }
        })
        if (discountKey) {
          real_price = price - discount[discountKey]['1'] // 打完折后到价格
          notice = `已满${discountKey},结算减${discount[discountKey]['1']}元`
        } else {
          real_price = price // 打完折后到价格
          notice = activities[0].description
        }
      }
      return {
        price: numeral(price).format('0.00'),
        real_price: numeral(real_price).format('0.00'),
        notice,
      }
    })()

    const showList = () => {
      if (count) {
        this.setState({ modalVisible: true })
      }
    }

    // 清空购物车
    const handleDiscard = () => {
      this.props.shoppingCartUpdate({
        cart: cart.filter(v => v.restaurant_id !== info.id),
      })
      this.hide()
    }

    // 去结算
    const handleSubmit = () => {
      if (price > 0 && price > info.float_minimum_order_amount) {
        this.props.handleSubmit()
      }
    }

    return (
      <div className={styles.cart}>
        <div className={styles.notice}>{priceInfo.notice}</div>
        <div className={styles.body}>
          <div className={styles.cart}>
            <div
              ref={c => this.cartIcon = c}
              onClick={showList}
              className={cls(styles['icon-wrapper'], count > 0 ? styles.active : null)}>
              <SvgIcon className={styles.icon} name="#cart" />
              {
                count > 0 ? <span className={styles.count}>{count}</span> : null
              }
            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.price}>
              <span className={styles.real}>¥ {priceInfo.real_price}</span>
              {
                priceInfo.real_price !== priceInfo.price ? (
                  <span className={styles.old}>¥ {priceInfo.price}</span>
                ) : null
              }
            </p>
            <p className={styles.desc}>
              {info.float_delivery_fee ? `配送费¥${info.float_delivery_fee}` : '免配送费'}
            </p>
          </div>
          <div
            onClick={handleSubmit}
            className={cls(
              styles.button,
              price >= info.float_minimum_order_amount ? styles.active : null,
            )}>
            {buttonDes}
          </div>
        </div>

        <TransitionGroup component="span" appear>
          {
            balls.map(v => (
              <Transition key={v.id} timeout={0} addEndListener={this.dropEnd}>
                {
                  state => (
                    <div
                      value={v.id}
                      style={{
                        ...v.outerStyle,
                        ...v.outerTransition[state],
                      }}>
                      <div
                        style={{
                          ...v.innerStyle,
                          ...v.innerTransition[state],
                        }} />
                    </div>
                  )
                }
              </Transition>
            ))
          }
        </TransitionGroup>

        <QueueAnim type="bottom">
          {
            modalVisible ? (
              <div key="a" className={styles['cart-list']}>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <h1 className={styles.title}>已选商品</h1>
                    <SvgIcon className={styles.icon} name="#delete" onClick={handleDiscard} />
                  </div>
                  <div className={styles.list}>
                    {
                      cartList.map((v, i) => (
                        <div className={styles.item} key={i}>
                          <div className={styles.desc}>
                            <h1 className={styles.name}>{v.name}</h1>
                            <h3 className={styles.attr}>{v.attrs.map(a => a.value).join('-')}</h3>
                          </div>
                          <div className={styles.price}>¥ {numeral(v.price * v.quantity).format('0.00')}</div>
                          <div className={styles.stepper}>
                            <Stepper food={v} dropBall={false} />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={styles.mask} onClick={this.hide} />
              </div>
            ) : null
          }
        </QueueAnim>
      </div>
    )
  }
}
