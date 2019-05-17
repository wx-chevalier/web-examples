

import React from 'react'
import styles from './index.less'

export default class EntrySk extends React.PureComponent {
  render() {
    return (
      <div className={styles.entry}>
        {
          Array.from({ length: 10 }, (v, i) => i).map(v => (
            <div key={v} className={styles.item}>
              <div className={styles.circle} />
              <div className={styles.desc} />
            </div>
          ))
        }
      </div>
    )
  }
}
