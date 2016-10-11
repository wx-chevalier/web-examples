/**
 * Created by apple on 16/9/13.
 */
import React, { Component, PropTypes } from 'react';

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
          this.props.router.goBack()
        }}>
          点击回退
        </button>
      </div>
    </section>
  }
}