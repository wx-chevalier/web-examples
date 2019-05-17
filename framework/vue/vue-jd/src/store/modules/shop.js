import {
  getCategoryList,
  getSelectedProductList,
  searchGoods,
  getProduct,
  getProductList,
  selectProduct,
  removeSelectedProduct,
  confirmSelectProduct,
  finishOrder,
  cancelOrder,
  getConfirmSelectedProductList,
  createOrder,
  getOrderList,
  getOrder,
  getCommentList,
  commitMessage,
  getShopInfo,
} from '@/service/getData';
const shop = {
  state: {
    categoryData: null, //商品分类数据
    cartProductData: null, //加入的购物车数据
  },
  mutations: {
    SET_CATEGORY_DATA(state, categoryData) {
      state.categoryData = categoryData
    },
    SET_CARTPRODUCT_DATA(state, cartProductData) {
      state.cartProductData = cartProductData
    }
  },
  actions: {
    GetCategoryList({ //获取商品分类
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getCategoryList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    ConfirmSelectProduct({ //确认订单的商品
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        confirmSelectProduct(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetConfirmSelectedProductList({ //获取确认订单的商品
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getConfirmSelectedProductList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetCommentList({ //获取商品留言
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getCommentList(parameterData).then(response => {
          commit('SET_CARTPRODUCT_DATA', response);
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    CommitMessage({ //评价
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        commitMessage(parameterData).then(response => {
          commit('SET_CARTPRODUCT_DATA', response);
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetSelectedProductList({ //获取购物车信息
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getSelectedProductList(parameterData).then(response => {
          commit('SET_CARTPRODUCT_DATA', response);
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    SearchGoods({ // 搜索商品
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        searchGoods(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetProduct({ // 获取商品详情
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getProduct(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetProductList({ // 获取商品列表
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getProductList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    SelectProduct({ // 加入购物车
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        selectProduct(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    RemoveSelectedProduct({ // 从购物车中移除
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        removeSelectedProduct(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    ConfirmSelectProduct({ // 确认下单商品
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        confirmSelectProduct(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetConfirmSelectedProductList({ // 获取确认下单商品
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getConfirmSelectedProductList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    CreateOrder({ // 创建订单
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        createOrder(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    FinishOrder({ // 确认收货
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        finishOrder(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    CancelOrder({ // 取消订单
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        cancelOrder(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetOrderList({ // 获取订单列表信息
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getOrderList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetOrder({ // 获取订单详情
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getOrder(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetShopInfo({ // 获取店铺信息
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getShopInfo(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
  }
}

export default shop
