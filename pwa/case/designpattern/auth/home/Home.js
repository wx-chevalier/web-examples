// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Home extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  render() {
    const { history } = this.props;

    return (
      <div>
        Home

        <button
          onClick={() => {
            history.push("/auth/login");
          }}
        >
          登录
        </button>
        <button
          onClick={() => {
            history.push("/auth/private");
          }}
        >
          展示
        </button>

      </div>
    );
  }
}
