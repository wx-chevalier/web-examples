

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loading from 'components/loading'
import Scroll from 'components/scroll'
import { restaurantDestroy, restaurantInit, fetchShopList } from '../../stores/restaurant'
import ShopListRow from '../common-components/shop-list-row'
import NavBar from '../common-components/nav-bar'
import NoData from '../common-components/no-data'
import SiftFactors from './sift-factors'
import FilterBar from './filter'
import styles from './index.less'

const mapStateToProp = ({ restaurant, home }) => ({
  loading: restaurant.loading,
  shopList: restaurant.shopList,
  locationInfo: home.locationInfo,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  restaurantInit,
  restaurantDestroy,
  fetchShopList,
}, dispatch)

@connect(mapStateToProp, mapDispatchToProps)
export default class Shop extends React.Component {
  componentDidMount() {
    const { location } = this.props
    this.props.restaurantInit(location.state)
  }

  componentWillUnmount() {
    this.props.restaurantDestroy()
  }

  refreshScroll = () => {
    this.scroll && this.scroll.refresh()    // eslint-disable-line
  }

  handleRowClick = (val) => {
    const { history, locationInfo } = this.props
    const { id } = val
    const { latitude, longitude } = locationInfo
    history.push({
      pathname: '/shop-detail',
      search: `?restaurant_id=${id}&latitude=${latitude}&longitude=${longitude}`,
    })
  }

  render() {
    const { location, loading, shopList } = this.props

    const renderList = () => {
      if (loading && !shopList.length) {
        return <Loading style={{ marginTop: 20 }} />
      }
      return (
        <Scroll
          dataSource={shopList}
          pullUpLoad={true}
          pullingUp={() => this.props.fetchShopList({}, true)}
          ref={c => this.scroll = c}>
          {
            shopList.length ? shopList.map((v, i) => (
              <ShopListRow
                key={i}
                refresh={this.refreshScroll}
                data={v}
                handleClick={() => this.handleRowClick(v)} />
            )) : <NoData />
          }
        </Scroll>
      )
    }

    return (
      <div className={styles.restaurant}>
        <NavBar
          title={location.state.target_name}
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <SiftFactors />
        <FilterBar />
        <div className={styles.list}>
          {renderList()}
        </div>
      </div>
    )
  }
}
