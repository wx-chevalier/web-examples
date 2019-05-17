

import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { home } from './home'
import { globalState } from './global'
import { order } from './order'
import { shop } from './shop'
import { compass } from './compass'
import { restaurant } from './restaurant'
import { searchShop } from './search-shop'
import { shoppingCart } from './shopping-cart'

const store = createStore(
  combineReducers({
    home,
    globalState,
    order,
    shop,
    compass,
    restaurant,
    searchShop,
    shoppingCart,
  }),
  applyMiddleware(thunk),
)

export default store
