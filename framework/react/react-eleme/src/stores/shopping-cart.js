

const UPDATE = 'SHOPPINGCART_UPDATE'

// {
//   restaurant_id: '商店id',
//   food_id: '商品id',
//   name: '名字',
//   price: '价格',
//   quantity: '数量',
//   attrs: '属性',
//   new_specs: '规格'
// }

const initState = {
  cart: [],
}

export const shoppingCart = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const shoppingCartUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}
