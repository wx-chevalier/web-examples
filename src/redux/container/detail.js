/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

@connect(
  state => ({}),
  (dispatch) => {
    return {
      pushState: bindActionCreators(push, dispatch)
    }
  }
)
export class Detail extends Component {

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {
    return <section className="detail__container">
      详情页
      <div>
        <button onClick={()=> {
          this.props.pushState('/home');
        }}>
          点击跳转到主页
        </button>
      </div>
    </section>
  }
}