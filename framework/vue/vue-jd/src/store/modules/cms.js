import {
  getRecommend,
  getArticle,
  getArticleList,
  getGoodsCategoryList,
  getIndexCmsData
} from '@/service/getData';
const cms = {
  state: {
    indexCmsData: null, //首页全部资讯数据
  },
  mutations: {
    SET_INDEXCMS_DATA(state, indexCmsData) {
      state.indexCmsData = indexCmsData
    }
  },
  actions: {
    GetIndexCmsData({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getIndexCmsData(parameterData).then(response => {
          commit('SET_INDEXCMS_DATA', response);
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetArticle({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getArticle(parameterData).then(response => {
          resolve(response);
        }, err => {
          reject(err)
        })
      })
    },
    GetArticleList({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getArticleList(parameterData).then(response => {
          //   commit('SET_ARTICLE_DATA', response.Data);
          resolve(response);
        }, err => {
          reject(err)
        })
      })
    },
    GetGoodsCategoryList({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getGoodsCategoryList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetRecommend({
      commit,
      state
    }, parameterData) {
      return new Promise((resolve, reject) => {
        getRecommend(parameterData).then(response => {
          //   commit('SET_RECOMMEND_DATA', response.Data);
          resolve(response);
        }, err => {
          reject(err)
        })
      })
    }
  }
}
export default cms
