

import React from 'react'
import styles from './index.less'

export default ({ title }) => (
  <div className={styles.title}>
    <div className={styles.split} />
    <h1 className={styles.text}>{title}</h1>
    <div className={styles.split} />
  </div>
)
