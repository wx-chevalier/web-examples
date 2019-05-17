import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'

import shop from './modules/shop'
import cms from './modules/cms'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    shop,
    cms,
    user
  },
  getters
})

export default store
