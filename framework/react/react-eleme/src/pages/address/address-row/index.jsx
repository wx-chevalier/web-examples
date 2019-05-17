

import React from 'react'
import SvgIcon from 'components/icon-svg'
import config from 'utils/config'
import styles from './index.less'

export default class AddressRow extends React.PureComponent {
  render() {
    const { data } = this.props
    const { sexMap } = config
    return (
      <div className={styles.row}>
        <div className={styles.desc}>
          <div className={styles.info}>
            <h1 className={styles.name}>{data.name}</h1>
            <span className={styles.sex}>{sexMap[data.sex]}</span>
            <span className={styles.phone}>{data.phone}</span>
          </div>
          <p className={styles.address}>{data.address + data.address_detail}</p>
        </div>
        <div className={styles.edit} onClick={this.props.handleClick}>
          <SvgIcon name="#edit" />
        </div>
      </div>
    )
  }
}
