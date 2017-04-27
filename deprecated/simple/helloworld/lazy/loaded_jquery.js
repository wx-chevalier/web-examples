// @flow
import React, { Component, PropTypes } from 'react';
import { LazilyLoadFactory } from '../../../common/utils/load/lazily_load';

/**
 * 组件LoadedJquery
 */
export default class LoadedJQuery extends Component {

  /**
   * @function 默认渲染函数
   */
  render() {

    return (
      <div
        ref={(ref) => this.props.$(ref).css('background-color', 'red')}>
        jQuery加载完毕
      </div>
    );

  }

}

export default LazilyLoadFactory(
  LoadedJQuery,
  {
    $: () => System.import('jquery'),
  }
);

