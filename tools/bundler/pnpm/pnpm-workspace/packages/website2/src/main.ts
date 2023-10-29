import '@monosample/core-ui';
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.config.ignoredElements = ['smp-hello-world']
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
