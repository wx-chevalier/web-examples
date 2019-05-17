

import React from 'react'
import cls from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { shoppingCartUpdate } from 'stores/shopping-cart'
import Toast from 'components/toast'
import Modal from 'components/modal'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

@connect(({ shoppingCart }) => ({
  cart: shoppingCart.cart,
}), dispatch => bindActionCreators({
  shoppingCartUpdate,
}, dispatch))
export default class Specs extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      food: props.food,
      specsVisible: false,
      defaultValue: this.getDefaultValue(props),
    }
  }

  getDefaultValue = (props) => {
    const { food } = props
    const specs = food.specfoods[0]
    const attrs = food.attrs.map(v => ({ name: v.name, value: v.values[0] }))
    return {
      attrs,
      quantity: 1,
      restaurant_id: food.restaurant_id,
      price: specs.price,
      new_specs: specs.specs,
      name: specs.name,
      food_id: specs.food_id,
      virtual_food_id: food.virtual_food_id,
    }
  }

  specClick = (v) => {
    const { defaultValue } = this.state
    this.setState({
      defaultValue: {
        ...defaultValue,
        price: v.price,
        name: v.name,
        new_specs: v.specs,
      },
    })
  }

  attrClick = (name, value) => {
    const { defaultValue } = this.state
    const attrs = defaultValue.attrs.map((v) => {
      if (v.name === name) {
        return { ...v, value }
      }
      return v
    })
    this.setState({
      defaultValue: {
        ...defaultValue,
        attrs,
      },
    })
  }

  toggleModal= () => {
    this.setState({
      specsVisible: !this.state.specsVisible,
    })
  }

  render() {
    const {
      specsVisible,
      food,
      defaultValue,
    } = this.state
    const { cart } = this.props

    const count = () => {
      return cart.reduce((acc, val) => {
        if (val.virtual_food_id === food.virtual_food_id) {
          return acc + val.quantity
        }
      }, 0)
    }

    const handleDecrease = () => {
      if (count() > 1) {
        return Toast.info('多规格且带属性商品只可以在购物车中删除', 2)
      }
      const result = cart.filter(v => v.virtual_food_id !== food.virtual_food_id)
      this.props.shoppingCartUpdate({
        cart: result,
      })
    }

    const addCart = () => {
      const isHas = cart.find(v => v.virtual_food_id === defaultValue.virtual_food_id)
      if (!isHas) {
        this.props.shoppingCartUpdate({
          cart: [...cart, defaultValue],
        })
      } else {
        // 判断是否包含相同规格 相同属性的食物
        let index
        const isEqual = cart.find((v, i) => {
          const defaultAttrs = defaultValue.attrs.map(f => `${f.name}-${f.value}`).join('')
          const vAttrs = v.attrs.map(f => `${f.name}-${f.value}`).join('')
          index = i
          return defaultAttrs === vAttrs && v.food_id === defaultValue.food_id
        })

        let result = []
        if (isEqual) {
          result = cart.map((v, i) => {
            if (i === index) {
              return { ...v, quantity: v.quantity + 1 }
            }
            return v
          })
        } else {
          result = [...cart, defaultValue]
        }
        this.props.shoppingCartUpdate({
          cart: result,
        })
      }
      this.toggleModal()
    }

    return (
      <div className={styles.specs}>
        <div className={styles.wrapper}>
          {
            count() ? (
              <button
                className={cls(styles.decrease, count() > 1 ? styles.disable : null)}
                onClick={handleDecrease}>
                -
              </button>
            ) : null
          }
          {
            count() ? (
              <div className={styles.count}>{count()}</div>
            ) : null
          }
          <button
            className={styles.btn}
            onClick={this.toggleModal}>
            选规格
          </button>
        </div>

        <Modal visible={specsVisible}>
          <div className={styles['specs-modal']} key="specs">
            <div className={styles.body}>
              <h1 className={styles.title}>{food.name}</h1>
              <SvgIcon name="#close" className={styles.close} onClick={this.toggleModal} />
              <div className={styles.content}>
                {
                  food.specfoods && food.specfoods.length ? (
                    <div className={styles.container}>
                      <h1 className={styles.title}>规格</h1>
                      <div className={styles.wrapper}>
                        {
                          food.specfoods.filter(v => v.food_id > 0).map(v => (
                            <div
                              onClick={() => this.specClick(v)}
                              key={v.food_id}
                              className={cls(
                                styles.item,
                                defaultValue.new_specs[0].value === v.specs[0].value
                                ? styles.active : null,
                              )}>
                              {v.specs[0].value}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ) : null
                }
                {
                  food.attrs && food.attrs.length ? (
                    food.attrs.map((v, i) => {
                      const item = defaultValue.attrs.find(attr => attr.name === v.name)
                      return (
                        <div className={styles.container} key={i}>
                          <h1 className={styles.title}>{v.name}</h1>
                          <div className={styles.wrapper}>
                            {
                              v.values.map((specs, ids) => (
                                <div
                                  key={ids}
                                  onClick={() => this.attrClick(v.name, specs)}
                                  className={cls(
                                    styles.item,
                                    item.value === specs ? styles.active : null,
                                  )}>
                                  {specs}
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )
                    })
                  ) : null
                }
              </div>
              <div className={styles.footer}>
                <span className={styles.price}>¥{defaultValue.price}</span>
                <button className={styles.btn} onClick={addCart}>选好了</button>
              </div>
            </div>
            <div className={styles.mask} onClick={this.toggleModal} />
          </div>
        </Modal>
      </div>
    )
  }
}
