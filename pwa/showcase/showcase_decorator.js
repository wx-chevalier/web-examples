// @flow

import React, { PureComponent } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const ShowcaseHeaderContainer = styled.section`
  padding:1% 2%;
  margin-bottom:1%;
  background:white;
  color:rgba(0, 0, 0, 0.65);
  
  border-bottom:1px solid #e9e9e9;
  
`;

const ShowcaseHeaderTitle = styled.h1`
  color:rgba(0, 0, 0, 0.65);
`;

const ShowcaseHeaderDescription = styled.h2`
  color:rgba(0, 0, 0, 0.65);
`;

export class ShowcaseHeader extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
  };

  render() {
    const { title, description } = this.props;

    return (
      <ShowcaseHeaderContainer>
        <ShowcaseHeaderTitle>{title}</ShowcaseHeaderTitle>
        <ShowcaseHeaderDescription>{description}</ShowcaseHeaderDescription>
      </ShowcaseHeaderContainer>
    );
  }
}

/**
 * @function 404 未发现页面
 * @param url
 * @param location
 */
export const NoMatch = ({ url, location }) => (
  <div>
    <h3>
      No match for <code>{url && url}{location && location.pathname}</code>
    </h3>
  </div>
);

export class ShowcaseWelcome extends PureComponent {
  render() {
    return (
      <div className="ShowcaseWelcome__container">
        欢迎来到 React
      </div>
    );
  }
}
