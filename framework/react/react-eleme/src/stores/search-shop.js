

import Toast from 'components/toast'
import { getHotKeywords, getGeolocation, getShopListByKw } from '../api'
import { homeUpdate } from './home'

const UPDATE = 'SEARCHSHOP_UPDATE'

const initState = {
  loading: false,
  keywords: '',
  shopLists: [],
  hotKeys: [],
  rank_id: undefined,
}

export const searchShop = (state = initState, action) => {
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

export const searchShopUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const searchShopDestroy = () => {
  return {
    payload: initState,
    type: UPDATE,
  }
}

export const getHotKeys = () => {
  return async (dispatch, getState) => {
    let { locationInfo } = getState().home
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
    try {
      const { data } = await getHotKeywords({
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
      })
      dispatch(searchShopUpdate({
        hotKeys: data,
      }))
    } catch ({ err }) {
      Toast.info(err)
    }
  }
}

export const getShopList = () => {
  return async (dispatch, getState) => {
    const { locationInfo } = getState().home
    const { keywords } = getState().searchShop
    dispatch(searchShopUpdate({
      loading: true,
      shopLists: [],
    }))
    let nextPayload = {}
    try {
      const { data } = await getShopListByKw({
        keyword: keywords,
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
        offset: 0,
        limit: 15,
        search_item_type: 0,
        is_rewrite: 1,
        extras: ['activities'],
        terminal: 'h5',
      })
      nextPayload = {
        shopLists: data,
      }
    } catch ({ err }) {
      Toast.info(err)
    }
    dispatch(searchShopUpdate({
      ...nextPayload,
      loading: false,
    }))
  }
}
