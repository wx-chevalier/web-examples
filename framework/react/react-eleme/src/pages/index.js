

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import asyncLoad from 'components/async-loade'
import Loading from './common-components/lazy-loading'
import { getUserInfo } from '../api'
import { globalUpdate } from '../stores/global'

@connect(() => ({}), dispatch => bindActionCreators({
  globalUpdate,
}, dispatch))
class AuthComponent extends React.Component {
  async componentDidMount() {
    try {
      const { data } = await getUserInfo()
      this.props.globalUpdate({
        isLogin: true,
        userInfo: data,
      })
    } catch (err) {
      this.props.globalUpdate({
        globalUpdate: false,
        userInfo: {},
      })
    }
  }

  render() {
    return null
  }
}

const home = asyncLoad(() => import('./home'), <Loading />)
const order = asyncLoad(() => import('./order'), <Loading />)
const orderDetail = asyncLoad(() => import('./order-detail'), <Loading />)
const compass = asyncLoad(() => import('./compass'), <Loading />)
const profile = asyncLoad(() => import('./profile'), <Loading />)
const login = asyncLoad(() => import('./login'), <Loading />)
const restaurant = asyncLoad(() => import('./restaurant'), <Loading />)
const shopDetail = asyncLoad(() => import('./shop-detail'), <Loading />)
const address = asyncLoad(() => import('./address'), <Loading />)
const addressEdit = asyncLoad(() => import('./address-edit'), <Loading />)
const searchAddress = asyncLoad(() => import('./address-nearby'), <Loading />)
const searchShop = asyncLoad(() => import('./search-shop'), <Loading />)
const benefit = asyncLoad(() => import('./benefit'), <Loading />)

export default () => (
  <React.Fragment>
    <AuthComponent />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={home} />
      <Route path="/search-address" component={searchAddress} />
      <Route path="/search-shop" component={searchShop} />
      <Route path="/order" component={order} />
      <Route path="/order-detail" component={orderDetail} />
      <Route path="/compass" component={compass} />
      <Route path="/profile" component={profile} />
      <Route path="/login" component={login} />
      <Route path="/restaurant" component={restaurant} />
      <Route path="/shop-detail" component={shopDetail} />
      <Route path="/address" component={address} />
      <Route path="/address-edit" component={addressEdit} />
      <Route path="/benefit" component={benefit} />
    </Switch>
  </React.Fragment>
)

