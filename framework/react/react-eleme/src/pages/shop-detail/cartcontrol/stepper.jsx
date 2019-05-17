

import React from 'react'
import QueueAnim from 'rc-queue-anim'
import cls from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { shoppingCartUpdate } from 'stores/shopping-cart'
import eventProxy from 'utils/event-proxy'
import styles from './index.less'

@connect(({ shoppingCart }) => ({
  cart: shoppingCart.cart,
}), dispatch => bindActionCreators({
  shoppingCartUpdate,
}, dispatch))
export default class Stepper extends React.PureComponent {
  increment = ({ target }) => {
    const { food, cart, dropBall = true } = this.props
    const specs = food.specfoods ? food.specfoods[0] : null
    const isHas = cart.find(v => v.virtual_food_id === food.virtual_food_id)
    if (!isHas && specs) {
      this.props.shoppingCartUpdate({
        cart: [
          ...cart,
          {
            attrs: [],
            quantity: 1,
            restaurant_id: food.restaurant_id,
            price: specs.price,
            new_specs: specs.specs,
            name: specs.name,
            food_id: specs.food_id,
            virtual_food_id: food.virtual_food_id,
          },
        ],
      })
    } else {
      const result = cart.map((v) => {
        if (v.virtual_food_id === food.virtual_food_id) {
          return { ...v, quantity: v.quantity + 1 }
        }
        return v
      })
      this.props.shoppingCartUpdate({ cart: result })
    }

    dropBall && eventProxy.trigger('cartBall', target) // eslint-disable-line
  }

  decrement = () => {
    const { food, cart } = this.props
    const result = cart.map((v) => {
      if (v.virtual_food_id === food.virtual_food_id) {
        return { ...v, quantity: v.quantity - 1 }
      }
      return v
    }).filter(v => v.quantity > 0)
    this.props.shoppingCartUpdate({ cart: result })
  }

  render() {
    const { food, cart } = this.props
    const cartFood = cart.find(v => v.virtual_food_id === food.virtual_food_id)
    const count = cartFood ? cartFood.quantity : 0

    return (
      <div className={styles.stepper}>
        <QueueAnim
          component="span"
          animConfig={{ rotate: [-180, 0], translateX: [0, 24], opacity: [1, 0] }}>
          {
            count > 0 ? (
              <button
                className={styles.btn}
                key="a"
                onClick={this.decrement}>
                -
              </button>
            ) : null
          }
        </QueueAnim>
        {
          count > 0 ? (
            <div className={styles.count}>{count}</div>
          ) : null
        }
        <button
          className={cls(styles.btn, styles.fill)}
          onClick={this.increment}>
          +
        </button>
      </div>
    )
  }
}
