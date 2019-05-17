import Vue from 'vue'

Vue.directive('focus', {
    inserted: function (el) {
        // 获取焦点
        el.focus();
        console.info('inserted'+el)
    }
})
