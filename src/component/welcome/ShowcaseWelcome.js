import React, { PureComponent } from "react";
import styled from "styled-components";

const WrappedTitle = styled.h1`
  margin:10px 0px;
`;

/**
 * Description 欢迎展示组件
 */
export default class ShowcaseWelcome extends PureComponent {
  render() {
    return (
      <div className="ShowcaseWelcome__container">
        <WrappedTitle>欢迎来到 React</WrappedTitle>
        <p>
          create-react-boilerplate 是笔者对于日常工作中的基于 React 技术栈与实践的沉淀，dev-config/ 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化。此外本项目中的演示代码还包含了性能优化、设计模式、样式指南、Redux、MobX 等常见的开发模式。
        </p>

      </div>
    );
  }
}
