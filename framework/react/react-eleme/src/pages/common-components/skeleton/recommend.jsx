

import React from 'react'
import styles from './index.less'

export default class RecommendSk extends React.PureComponent {
  render() {
    return (
      <div className={styles.recommend}>
        <div className={styles.pic} />
        <div className={styles.desc}>
          <div className={styles.placeholder} />
          <div className={styles.placeholder} />
          <div className={styles.placeholder} />
        </div>
      </div>
    )
  }
}
