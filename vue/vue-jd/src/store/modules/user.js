import {
  login,
  getUserInfo,
  sendPhoneMessage,
  registered,
  editUserInfo,
  setPassword,
  saveAddress,
  getAddressList,
  getDefaultAddress,
  removeAddress,
  getAddress,
  payByWallet,
  shopFavorite,
  getMyShopFavorite,
} from '@/service/getData';
import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
} from '@/utils/mixin';
import {
  Toast
} from 'mint-ui';
const user = {
  state: {
    userInfo: null, //用户信息数据
    addressList: null, //用户地址数据
  },
  mutations: {
    SET_USERINFO_DATA(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_ADDRESSLIST_DATA(state, addressList) {
      state.addressList = addressList
    }
  },
  actions: {
    LogOut({ //退出登录
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        removeSessionStorage('MemberToken');
        commit('SET_USERINFO_DATA',null)        
        resolve();
      })
    },
    Login({ //登录
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        login(parameterData).then(response => {
          setSessionStorage('MemberToken', response.Data);
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    ShopFavorite({ //收藏店铺
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        shopFavorite(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    PayByWallet({ //余额支付
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        payByWallet(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetDefaultAddress({ //获取默认地址信息
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getDefaultAddress(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetAddress({ //获取地址详情
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getAddress(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    SaveAddress({ //新增地址
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        saveAddress(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    RemoveAddress({ //删除地址
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        removeAddress(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetAddressList({ //获取用户地址信息
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getAddressList(parameterData).then(response => {
          commit('SET_ADDRESSLIST_DATA', response)
          resolve(response);
        }, err => {
          reject(err)
        })
      })
    },
    GetUserInfo({ //获取用户信息
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getUserInfo(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    Registered({ //注册账号
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        registered(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    SetPassword({ //设置密码
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        setPassword(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    SendPhoneMessage({ //获取验证码
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        sendPhoneMessage(parameterData).then(response => {
          if (response.Code !== 0) return Toast({
            message: response.Message,
            position: 'bottom'
          })
          return resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
  }
}

export default user
