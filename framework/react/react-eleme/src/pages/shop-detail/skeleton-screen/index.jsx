

import React from 'react'
import Row from '../../common-components/skeleton/row'
import styles from './index.less'

export default class Skeleton extends React.PureComponent {
  render() {
    return (
      <div className={styles.skeleton}>
        <div className={styles.header}>
          <div className={styles.avatar} />
          <div className={styles.desc} />
          <div className={styles.desc} />
          <div className={styles.desc} />
        </div>
        <div className={styles.body}>
          <div className={styles.left}>
            {
              Array.from({ length: 9 }, (v, i) => i + 1).map(v => (
                <div className={styles.item} key={v}>
                  <span className={styles.text} />
                </div>
              ))
            }
          </div>
          <div className={styles.right}>
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
          </div>
        </div>
        <div className={styles.footer} />
      </div>
    )
  }
}
