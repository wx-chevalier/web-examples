

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loading from 'components/loading'
import Scroll from 'components/scroll'
import NoData from '../common-components/no-data'
import ShopListRow from '../common-components/shop-list-row'
import styles from './index.less'

@connect(({ searchShop, home }) => ({
  shopLists: searchShop.shopLists,
  loading: searchShop.loading,
  locationInfo: home.locationInfo,
}))
@withRouter
export default class ShopList extends React.PureComponent {
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
    const { shopLists, loading } = this.props
    return (
      <div className={styles.shops}>
        {
          loading ? <Loading style={{ marginTop: 20 }} /> : shopLists.length ? (
            <Scroll dataSource={shopLists} ref={c => this.scroll = c}>
              {
                shopLists.map((shop, i) => (
                  <ShopListRow
                    handleClick={() => this.handleRowClick(shop)}
                    key={`${shop.id}--${i}--${new Date().getTime()}`}
                    data={shop}
                    refresh={this.refreshScroll} />
                ))
              }
            </Scroll>
          ) : <NoData />
        }
      </div>
    )
  }
}
