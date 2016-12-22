/**
 * Created by apple on 16/9/13.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {increment, incrementAsync, decrement} from '../ducks/count';

/**
 * @function 根页面组件
 */
@connect(state => ({count: state.count}), {
  pushState: push,
  increment,
  incrementAsync,
  decrement
})
export class Home extends Component {
  render() {                                                                
    // 在非SSR状态下导入SCSS文件
    __SSR__ || require('./home.scss');

    const {count, pushState, increment, incrementAsync, decrement} = this.props;

    return <section className="home__container">

      <div>
        王下邀月熊 Webpack2-React-Redux-Boilerplate
      </div>

      <div>导航栏目:</div>

      <li>
        <button
        onClick={() => {
          pushState('/detail');
        }}>详情页(需要先进行登陆操作)</button>
      </li>
      <li>
        <Link to="/login">登陆页</Link>
      </li>

      <div>基于Redux的Count实例</div>
      <div>{count}</div>
      <div>
        <button onClick={increment}>加1</button>
        <button onClick={incrementAsync}>异步加1</button>
        <button onClick={decrement}>减1</button>
      </div>

    </section>;
  }
}
