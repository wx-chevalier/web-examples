

import HttpUtils from './http'

const position = new AMap.Geolocation({
  enableHighAccuracy: true,
  maximumAge: 0,
  convert: true,
})

export const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    position.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        resolve({
          data: {
            latitude: result.position.lat,
            longitude: result.position.lng,
            address: result.formattedAddress,
          },
        })
      } else {
        reject({
          err: result.message,
        })
      }
    })
  })
}
export const getEntry = (params) => { return HttpUtils.get('/elm/entry', params) }
export const getBanner = (params) => { return HttpUtils.get('/elm/banner', params) }
export const getShopList = (params) => { return HttpUtils.get('/elm/restaurants', params) }
// 通过关键字搜索商家
export const getShopListByKw = (params) => { return HttpUtils.get('/elm/restaurants_search', params) }

export const getOrderList = (params) => { return HttpUtils.get('/elm/orders', params) }
export const getOrderSnapshot = (params) => { return HttpUtils.get('/elm/order-snapshot', params) }
export const getOrderDesc = (params) => { return HttpUtils.get('/elm/order-desc', params) }

// 商店
export const getShopInfo = (params) => { return HttpUtils.get('/elm/restaurant_byid', params) }
export const getShopRatings = (params) => { return HttpUtils.get('/elm/restaurant_ratings', params) }
export const getShopFood = (params) => { return HttpUtils.get('/elm/restaurant_menu', params) }
export const getRatingTags = (params) => { return HttpUtils.get('/elm/rating_tags', params) }
export const getRatingScores = (params) => { return HttpUtils.get('/elm/rating_scores', params) }

export const getTotalCategory = (params) => { return HttpUtils.get('/elm/total_category', params) }
export const getFoodSiftFactors = (params) => { return HttpUtils.get('/elm/food_sift_factors', params) }
export const getFilterAttr = (params) => { return HttpUtils.get('/elm/filter_attributes', params) }

// 热门关键词
export const getHotKeywords = (params) => { return HttpUtils.get('/elm/hot_keywords', params) }
// 推荐食物
export const getRecommendation = (params) => { return HttpUtils.get('/elm/recommendation', params) }

// 登陆 用户信息
export const mobileSendCode = (params) => { return HttpUtils.post('/elm/mobile_send_code', params) }
export const mobileCaptchas = (params) => { return HttpUtils.post('/elm/captchas', params) }
export const loginByMobile = (params) => { return HttpUtils.post('/elm/login_by_mobile', params) }
export const getUserInfo = (params) => { return HttpUtils.get('/elm/users', params) }

export const getAddress = (params) => { return HttpUtils.get('/elm/address', params) }
export const delAddress = (params) => { return HttpUtils.get('/elm/del_address', params) }
export const upAddress = (params) => { return HttpUtils.post('/elm/update_address', params) }
export const addAddress = (params) => { return HttpUtils.post('/elm/add_address', params) }

export const getHongbaos = (params) => { return HttpUtils.get('/elm/hongbaos', params) }

// 根据经纬度 关键词 获取地址
export const getNearby = (params) => { return HttpUtils.get('/elm/search_nearby', params) }
