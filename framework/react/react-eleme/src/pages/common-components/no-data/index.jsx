

import React from 'react'
import styles from './index.less'

export default ({ text = '没有更多数据' }) => (
  <p className={styles.desc}>{text}</p>
)
