

import React from 'react'
import { connect } from 'react-redux'
import Toast from 'components/toast'
import SvgIcon from 'components/icon-svg'
import Scroll from 'components/scroll'
import Loading from 'components/loading'
import NavBar from '../common-components/nav-bar'
import NoData from '../common-components/no-data'
import AuthError from '../common-components/auth-err'
import AddressRow from './address-row'
import { getAddress } from '../../api'
import styles from './index.less'

@connect(({ globalState }) => ({
  isLogin: globalState.isLogin,
}))
export default class Address extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
    }
  }

  componentDidMount() {
    this.props.isLogin && this.getAddress()    // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin && !this.state.loading) {
      this.getAddress()
    }
  }

  getAddress = async () => {
    try {
      this.setState({ loading: true })
      const { data } = await getAddress()
      this.setState({
        list: data,
        loading: false,
      })
    } catch ({ err }) {
      this.setState({ loading: false })
      Toast.info(err)
    }
  }

  goEdit = (val = false) => {
    this.props.history.push({
      pathname: '/address-edit',
      state: val,
    })
  }

  render() {
    const { isLogin } = this.props
    const { list, loading } = this.state

    return !isLogin ? <AuthError /> : (
      <div className={styles.address}>
        <NavBar
          title="我的地址"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        {
          loading ? <Loading style={{ marginTop: 20 }} /> : list.length ? (
            <div className={styles.list}>
              <Scroll dataSource={list} className={styles.scroll}>
                {
                  list.map(v => (
                    <AddressRow key={v.id} data={v} handleClick={() => this.goEdit(v)} />
                  ))
                }
              </Scroll>
            </div>
          ) : <NoData />
        }
        <button className={styles.add} onClick={() => this.goEdit()}>
          <div className={styles.icon}>
            <SvgIcon name="#round_add" />
          </div>
          <span>新增收获地址</span>
        </button>
      </div>
    )
  }
}
