
import Toast from 'components/toast'
import { getOrderList } from '../api'

const UPDATE = 'ORDER_UPDATE'

const initState = {
  init: false,
  orderList: [],
}

export const order = (state = initState, action) => {
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

export const orderUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const fetchOrderList = (isRefresh, callback) => {
  return async (dispatch, getState) => {
    const { orderList } = getState().order
    try {
      const { data } = await getOrderList({
        limit: 8,
        offset: isRefresh ? 0 : orderList.length,
      })
      dispatch(orderUpdate({
        init: true,
        orderList: isRefresh ? data : [...orderList, ...data],
      }))
      callback && callback()     // eslint-disable-line
    } catch ({ err }) {
      Toast.info(err, 3, false)
    }
  }
}
