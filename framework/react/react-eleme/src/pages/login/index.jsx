

import React from 'react'
import SvgIcon from 'components/icon-svg'
import Toast from 'components/toast'
import Modal from 'components/modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { globalUpdate } from 'stores/global'
import { mobileSendCode, loginByMobile, getUserInfo, mobileCaptchas } from '../../api'
import styles from './index.less'

@connect(() => ({}), dispatch => bindActionCreators({
  globalUpdate,
}, dispatch))
export default class Login extends React.Component {
  state = {
    phone: '',
    code: '',
    time: 0,
    validate_token: '',
    captchaVisible: false,
    captcha_hash: '',
    captcha_value: '',
    captcha_img: '',
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  getCode = async (captcha = false) => {
    const {
      phone,
      time,
      captcha_hash,
      captcha_value,
    } = this.state
    if (time > 0 && !captcha) return
    if (!phone) return Toast.info('请填写手机号')
    try {
      const { data } = await mobileSendCode({
        mobile: phone,
        captcha_hash,
        captcha_value,
      })

      let count = 60
      this.setState({
        time: count,
        validate_token: data['validate_token'], // eslint-disable-line
        captchaVisible: false,
        captcha_hash: '',
        captcha_value: '',
        captcha_img: '',
      })
      this.timer = setInterval(() => {
        if (count > 0) {
          count--
          this.setState({
            time: count,
          })
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    } catch ({ err, name }) {
      if (name === 'NEED_CAPTCHA' || name === 'CAPTCHA_CODE_ERROR') {
        if (name === 'CAPTCHA_CODE_ERROR') {
          Toast.info(err)
        }
        this.getCaptchas()
      } else {
        Toast.info(err)
      }
    }
  }

  getCaptchas = async () => {
    try {
      const { data } = await mobileCaptchas({ captcha_str: this.state.phone });
      this.setState({
        captchaVisible: true,
        captcha_img: data.captcha_image,
        captcha_hash: data.captcha_hash,
      })
    } catch ({ err }) {
      Toast.info(err)
    }
  }

  handleLogin = async () => {
    const { phone, code, validate_token } = this.state
    if (!phone || !code) {
      return Toast.info('请填写手机号验证码')
    }
    try {
      Toast.loading('登录中...', 0)
      /* eslint-disable */
      const login = await loginByMobile({
        'mobile': phone,
        'validate_code': code,
        'validate_token': validate_token,
      })
      const { data } = await getUserInfo()
      Toast.hide()
      /* eslint-enable */
      if (data) {
        this.props.globalUpdate({
          isLogin: true,
          userInfo: data,
        })
        this.props.history.goBack()
      }
    } catch ({ err }) {
      this.props.globalUpdate({
        isLogin: false,
        userInfo: {},
      })
      Toast.info(err)
    }
  }

  changeState = (v, key) => {
    this.setState({
      [key]: v.target.value,
    })
  }

  closeModal = () => {
    this.setState({
      captchaVisible: false,
      captcha_img: '',
      captcha_hash: '',
      captcha_value: '',
    })
  }

  render() {
    const {
      phone,
      code,
      time,
      captchaVisible,
      captcha_value,
      captcha_img,
    } = this.state

    return (
      <div className={styles.login}>
        <div className={styles.logo}>
          <SvgIcon name="#logo" />
        </div>
        <div className={styles.form}>
          <div className={styles.item}>
            <input type="tel" maxLength={11} placeholder="手机号" value={phone} onChange={v => this.changeState(v, 'phone')} />
            <button className={styles['code-btn']} onClick={this.getCode}>
              {time > 0 ? `${time}秒后获取` : '获取验证码'}
            </button>
          </div>
          <div className={styles.item}>
            <input type="tel" maxLength={8} placeholder="验证码" value={code} onChange={v => this.changeState(v, 'code')} />
          </div>
        </div>
        <p className={styles.desc}>
          温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意<span>《用户服务协议》</span>
        </p>
        <button className={styles['login-btn']} onClick={this.handleLogin}>登录</button>

        <Modal visible={captchaVisible}>
          <div className={styles['captcha-modal']} key="a">
            <div className={styles.body}>
              <h1 className={styles.title}>请填写图形验证码</h1>
              <div className={styles.item}>
                <input maxLength={11} value={captcha_value} onChange={v => this.changeState(v, 'captcha_value')} />
                <img className={styles.img} src={captcha_img} onClick={this.getCaptchas} />
              </div>
              <div className={styles.footer}>
                <div className={styles.reset} onClick={this.closeModal}>取消</div>
                <div className={styles.submit} onClick={() => this.getCode(true)}>确认</div>
              </div>
            </div>
            <div className={styles.mask} />
          </div>
        </Modal>
      </div>
    )
  }
}
