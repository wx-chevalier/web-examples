

import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import cls from 'classnames'
import Toast from 'components/toast'
import SvgIcon from 'components/icon-svg'
import asyncLoad from 'components/async-loade'
import config from 'utils/config'
import NavBar from '../common-components/nav-bar'
import AuthError from '../common-components/auth-err'
import Loading from '../common-components/lazy-loading'
import { delAddress, upAddress, addAddress } from '../../api'
import styles from './index.less'

const AddressNearby = asyncLoad(() => import('../address-nearby'), <Loading />)

const Badge = ({ text, select, handleClick }) => (
  <div
    className={cls(styles.badge, select ? styles.active : null)}
    onClick={handleClick}>
    {text}
  </div>
)


@connect(({ globalState }) => ({
  isLogin: globalState.isLogin,
}))
export default class AddressEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: props.location.state,
    }
  }

  handleDelete = async () => {
    const { info } = this.state
    if (info && info.id) {
      try {
        Toast.loading('请稍后...', 0)
        const { data } = await delAddress({ id: info.id })
        Toast.hide()
        data && this.props.history.goBack() // eslint-disable-line
      } catch ({ err }) {
        Toast.info(err)
      }
    }
  }

  handleChange = (key, value) => {
    this.setState({
      info: {
        ...this.state.info,
        [key]: value,
      },
    })
  }

  submit = async () => {
    const { info } = this.state
    if (!info.name) {
      return Toast.info('请输入姓名', 2)
    }
    if (!info.phone) {
      return Toast.info('请输入手机号', 2)
    }
    if (!info.address || !info.address_detail) {
      return Toast.info('请输入位置,详细地址', 2)
    }
    const ajaxFun = info.id ? upAddress : addAddress;
    try {
      Toast.loading('处理中...', 0)
      const { data } = await ajaxFun(info)
      Toast.hide()
      if (data) {
        this.props.history.goBack()
      }
    } catch ({ err }) {
      Toast.info(err)
    }
  }

  handleAddressClick = (obj) => {
    this.setState({
      info: {
        ...this.state.info,
        ...obj,
      },
    })
  }

  render() {
    const { isLogin, match, history } = this.props
    const { info = {} } = this.state
    const navText = info ? '编辑地址' : '更新地址'
    const navProps = info.id ? {
      iconRight: '#delete',
      rightClick: this.handleDelete,
    } : {}

    return !isLogin ? <AuthError /> : (
      <div className={styles.address}>
        <NavBar
          title={navText}
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()}
          {...navProps} />
        <div className={styles.form}>
          <div className={styles.item}>
            <div className={styles.label}>联系人</div>
            <div className={styles.control}>
              <input
                className={styles.input}
                placeholder="你的姓名"
                maxLength={20}
                value={info.name}
                onChange={e => this.handleChange('name', e.target.value)} />
              <div className={`${styles.line} hairline-h`} />
              <div className={styles['tag-wrapper']}>
                {
                  config.sexMap.map((v, i) => (
                    <Badge text={v} select={i === info.sex} key={i} handleClick={() => this.handleChange('sex', i)} />
                  ))
                }
              </div>
            </div>
            <div className={`${styles.line} hairline-h`} />
          </div>

          <div className={styles.item}>
            <div className={styles.label}>电话</div>
            <div className={styles.control}>
              <input
                className={styles.input}
                placeholder="你的手机号"
                maxLength={11}
                value={info.phone}
                onChange={e => this.handleChange('phone', e.target.value)} />
            </div>
            <div className={`${styles.line} hairline-h`} />
          </div>

          <div className={styles.item} onClick={() => history.push(`${match.url}/address`)}>
            <div className={styles.label}>位置</div>
            <div className={styles.control}>
              <input className={styles.input} placeholder="小区/写字楼/学校" maxLength={11} value={info.address} onChange={() => {}} />
            </div>
            <div className={styles.icon}>
              <SvgIcon name="#right" />
            </div>
            <div className={`${styles.line} hairline-h`} />
          </div>

          <div className={styles.item}>
            <div className={styles.label}>详细地址</div>
            <div className={styles.control}>
              <textarea
                className={styles.textarea}
                placeholder="详细地址(门牌号)"
                maxLength={200}
                row={2}
                value={info.address_detail}
                onChange={e => this.handleChange('address_detail', e.target.value)} />
            </div>
            <div className={styles.icon}>
              <SvgIcon name="#edit" />
            </div>
            <div className={`${styles.line} hairline-h`} />
          </div>

          <div className={styles.item}>
            <div className={styles.label}>标签</div>
            <div className={styles.control}>
              <div className={styles['tag-wrapper']}>
                {
                  config.addressTag.map((v, i) => (
                    v && <Badge text={v} select={i === info.tag_type} key={i} handleClick={() => this.handleChange('tag_type', i)} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <button className={styles.btn} onClick={this.submit}>确定</button>

        <Route
          path={`${match.path}/address`}
          component={
            props => <AddressNearby {...props} addressClick={this.handleAddressClick} />
          } />
      </div>
    )
  }
}
