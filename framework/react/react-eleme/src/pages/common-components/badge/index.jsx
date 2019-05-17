
import React from 'react'
import cls from 'classnames'
import styles from './index.less'

export default ({ text, className, style }) => (
  <div className={cls(styles.badge, className)} style={style} content={text} />
)
