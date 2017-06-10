// @flow
import React, { PureComponent } from "react";
import styles from "./Private.css";

/**
 * Description 私有界面
 */
export default class Private extends PureComponent {
  render() {
    return (
      <div className="Private__container">
        <span className={styles.tip}>
          Private
        </span>
      </div>
    );
  }
}
