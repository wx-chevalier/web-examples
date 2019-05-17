

import Toast from 'components/toast'
import omit from 'lodash.omit'
import { getGeolocation, getFoodSiftFactors, getShopList, getTotalCategory, getFilterAttr } from '../api'
import { homeUpdate } from './home'

const UPDATE = 'RESTAURANT_UPDATE'

const initState = {
  loading: true,
  category: [],
  siftFactors: [],
  sub_categories: [],
  selectFactorsId: undefined,
  shopList: [],
  rank_id: undefined,
  order_by: 0,
  super_vip: undefined,
  restaurant_category_ids: [],
  activityList: [], // 优惠活动列表
  costsList: [], // 人均消费列表
  supportsList: [], // 商家属性列表
  activity_types: [], // 优惠活动
  average_cost_ids: [], // 人均消费
  support_ids: [], // 商家属性
}

export const restaurant = (state = initState, action) => {
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

export const restaurantUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const restaurantDestroy = () => {
  return {
    payload: initState,
    type: UPDATE,
  }
}

export const restaurantInit = (params) => {
  return async (dispatch, getState) => {
    let { locationInfo } = getState().home
    const { rank_id, order_by, super_vip } = getState().restaurant
    if (!locationInfo.latitude && !locationInfo.longitude) {
      try {
        const { data } = await getGeolocation()
        if (data) {
          locationInfo = data
          dispatch(homeUpdate({
            locationInfo: data,
          }))
        }
      } catch ({ err }) {
        return Toast.info(err)
      }
    }
    const location = omit(locationInfo, 'address')
    try {
      const [siftFactors, shopList, category, filter] = await Promise.all([
        getFoodSiftFactors({
          ...location,
          entry_id: params.entry_id,
          terminal: 'h5',
        }),
        getShopList({
          ...location,
          rank_id,
          order_by,
          super_vip,
          terminal: 'h5',
          offset: 0,
          limit: 8,
          extras: ['activities', 'tags'],
          restaurant_category_ids: params.restaurant_category_id,
        }),
        getTotalCategory({ ...location }),
        getFilterAttr({
          ...location,
          terminal: 'h5',
        }),
      ])
      const categorys = category.data.filter(v => v.id)
      dispatch(restaurantUpdate({
        category: categorys,
        sub_categories: categorys[0].sub_categories,
        loading: false,
        selectFactorsId: siftFactors.data.length ? siftFactors.data[0].id : undefined,
        siftFactors: siftFactors.data,
        rank_id: shopList.data.rank_id,
        shopList: shopList.data.items,
        restaurant_category_ids: params.restaurant_category_id,

        activityList: filter.data.activity_types,
        costsList: filter.data.average_costs,
        supportsList: filter.data.supports,
      }))
    } catch ({ err }) {
      Toast.info(err)
    }
  }
}

export const fetchShopList = (params, more = false) => {
  return async (dispatch, getState) => {
    if (!more) {
      dispatch(restaurantUpdate({
        loading: true,
        shopList: false,
      }))
    }
    const { locationInfo } = getState().home
    const {
      rank_id,
      order_by,
      super_vip,
      restaurant_category_ids,
      activity_types,
      average_cost_ids,
      support_ids,
      shopList,
    } = getState().restaurant
    let nextPayload = {}
    try {
      const { data } = await getShopList({
        ...omit(locationInfo, 'address'),
        rank_id,
        order_by,
        super_vip,
        restaurant_category_ids,
        activity_types,
        average_cost_ids,
        support_ids,
        offset: more ? shopList.length : 0,
        limit: 8,
        terminal: 'h5',
        extras: ['activities', 'tags'],
        ...omit(params, ['siftFactors', 'selectFactorsId', 'sub_categories']),
      })
      nextPayload = {
        shopList: [...shopList, ...data.items],
        rank_id: data.rank_id,
        ...params,
      }
    } catch ({ err }) {
      Toast.info(err)
    }
    dispatch(restaurantUpdate({
      loading: false,
      ...nextPayload,
    }))
  }
}
