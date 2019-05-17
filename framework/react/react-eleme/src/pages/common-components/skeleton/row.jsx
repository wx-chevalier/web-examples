
import React from 'react'
import styles from './index.less'

export default class RowSK extends React.PureComponent {
  render() {
    return (
      <div className={styles.row} style={this.props.style || {}}>
        <div className={styles.left} />
        <div className={styles.right}>
          <div className={styles.desc} />
          <div className={styles.desc} />
          <div className={styles.desc} />
          <div className={styles.desc} />
        </div>
      </div>
    )
  }
}
