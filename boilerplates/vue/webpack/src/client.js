import Vue from 'vue';
import App from './application/App';

// 使用 OfflinePluginRuntime，如果不需要，则移除
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

new Vue({
  el: '#root',
  render: h => h(App),
});
