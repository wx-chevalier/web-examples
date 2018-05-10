import { createStore } from 'redux';

const increment = count => ({
  type: 'COUNT_INCREMENT',
  count
});

const decrement = count => ({
  type: 'COUNT_DECREMENT',
  count
});

/**
 * @function 全局 Reducer
 * @param {*} state
 * @param {*} action
 */
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'COUNT_INCREMENT': {
      return state + action.count;
    }

    case 'COUNT_DECREMENT':
      return state - action.count;

    default:
      return state;
  }
};

const store = createStore(reducer);

// 获取统计值
const count = store.getState();

// 然后执行渲染
View(count);

/**
 * @function 界面渲染函数
 * @param {*} text
 */
function View(count) {
  console.log(`计数值："${count}"`);
}

let index = 0;
const interval = setInterval(() => {
  if (index < 20) {
    // 使用随机数模拟用户输入
    if (Math.random() > 0.5) {
      // tell the reducer to add the character
      store.dispatch(increment(1));
    } else {
      store.dispatch(decrement(1));
    }

    index++;
  } else {
    // otherwise stop
    clearInterval(interval);
  }
  // do this every 0.25 seconds (or 250ms)
}, 250);

// 将渲染逻辑抽象为简单的渲染函数，其负责从 Store 中获取数据然后调用渲染函数
function render() {
  const count = store.getState();
  View(count);
}

// 使渲染函数监听 Store 变化，当 Store 发生数据变化时会自动地调用渲染函数
store.subscribe(render);
