// @flow

import React, { Component } from "react";

import styled from "styled-components";

const BackgroundWrapper = styled.div`
  background:url(https://i.gyazo.com/6e927acde2a674dfaabed4f4594ec18a.png);
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-size: 100% 100%;
`;

/**
 * @function 懒加载组件
 */
export default class LazyComponent extends Component {
  render() {
    return (
      <section className="LazyComponent__container">
        <BackgroundWrapper>
          <span>仿佛身体被掏空，你不点我不加载</span>
        </BackgroundWrapper>
      </section>
    );
  }
}
