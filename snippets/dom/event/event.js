/*
 * @file DOM 中常见事件处理相关示范
 * @description 详细说明
 * 
 * @author 王下邀月熊 <384924552@qq.com>
 * 
 * Created Date: Sun, 2018-07-08 12:36:10
 * 
 * Last Modified: Sun, 2018-07-08 12:38:07
 * Last Modified By: 王下邀月熊 <384924552@qq.com>
 * 
 * This code is licensed under the MIT License.
 */

/**
 * 事件代理 
 * document.addEventListener("click", delegate(buttonsFilter, buttonHandler));
 * @param {*} criteria，过滤函数，(e): bool => {}
 * @param {*} listener，监听函数，(e): void => {}
 */
function delegate(criteria, listener) {
    return function (e) {
        var el = e.target;
        do {
            if (!criteria(el)) {
                continue;
            }
            e.delegateTarget = el;
            listener.call(this, e);
            return;
        } while ((el = el.parentNode));
    };
}