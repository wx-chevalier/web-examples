import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foods: [],
    ballEle: {}
  },
  mutations: {
    changeFoods(state, payload){
      state.foods = payload.foodList;
    },
    initBallEle(state, payload) {
      state.ballEle = payload.el;
    }
  }
})
