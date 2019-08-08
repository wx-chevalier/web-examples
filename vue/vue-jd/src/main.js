// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill()       
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
// import 'promise-polyfill/src/polyfill'
import '@/plugins/flexible'
import MintUI from 'mint-ui'
import store from '@/store'
import FastClick from 'fastclick'
import '@/utils/directives'
import '@/utils/filters'
import VeeValidate from 'vee-validate';
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(MintUI)
Vue.use(VeeValidate);
router.beforeEach((to,from,next)=>{
    next();
})
Vue.config.productionTip = false



/* fundebug */
function formatComponentName(vm)
{
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

Vue.config.errorHandler = function(err, vm, info)
{
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;

  fundebug.notifyError(err,
  {
      metaData:
      {
          componentName: componentName,
          propsData: propsData,
          info: info
      }
   });
};


/* eslint-disable no-new */
Vue.prototype.errorEvent = e => { e.target.src = './assets/images/logo.png' }
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
