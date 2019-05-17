

import React from 'react'
import Scroll from 'components/scroll'
import { connect } from 'react-redux'
import Toast from 'components/toast'
import Loading from 'components/loading'
import NavBar from '../common-components/nav-bar'
import AuthError from '../common-components/auth-err'
import NoData from '../common-components/no-data'
import RedTicketRow from '../common-components/red-ticket-row'
import { getHongbaos } from '../../api'
import styles from './index.less'

@connect(({ globalState }) => ({
  isLogin: globalState.isLogin,
}))
export default class Benefit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      init: true,
      hasMore: true,
    }
    props.isLogin && this.getList(true)  // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin && nextProps.isLogin !== this.props.isLogin) {
      this.getList(true)
    }
  }

  getList = async (isRefresh = false) => {
    const { list } = this.state
    let nextPayload = {}
    try {
      const { data } = await getHongbaos({
        limit: 20,
        offset: isRefresh ? 0 : list.length,
      })
      nextPayload = {
        list: [...list, ...data],
        hasMore: data.length === 20,
      }
    } catch ({ err }) {
      Toast.info(err)
    }
    this.setState({
      ...nextPayload,
      init: false,
    })
  }

  render() {
    const { isLogin, history } = this.props
    const { list, init, hasMore } = this.state
    const scrollProps = {
      className: styles.scroll,
      dataSource: list,
      pullDownRefresh: { stop: 40 },
      pullUpLoad: hasMore,
      pullingDown: () => this.getList(true),
      pullingUp: () => this.getList(),
    }

    return !isLogin ? <AuthError /> : (
      <div className={styles.benefit}>
        <NavBar
          title="我的优惠"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        {
          init ? <Loading style={{ marginTop: 20 }} /> : list.length ? (
            <Scroll {...scrollProps}>
              {
                list.map(v => (
                  <RedTicketRow key={v.id} data={v} rowClick={() => history.push('/home')} />
                ))
              }
            </Scroll>
          ) : <NoData />
        }
      </div>
    )
  }
}
