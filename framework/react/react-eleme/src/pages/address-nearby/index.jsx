

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Toast from 'components/toast'
import Scroll from 'components/scroll'
import Loading from 'components/loading'
import SvgIcon from 'components/icon-svg'
import { debounce } from 'utils/utils'
import { homeUpdate } from '../../stores/home'
import NavBar from '../common-components/nav-bar'
import NoData from '../common-components/no-data'
import AddressRow from '../common-components/address-row'
import { getNearby, getGeolocation } from '../../api'
import styles from './index.less'

// addressClick

@connect(({ home }) => ({
  locationInfo: home.locationInfo,
}), dispatch => bindActionCreators({
  homeUpdate,
}, dispatch))
export default class AddressNearby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
    }
    this.searchFn = debounce(this.search)
  }

  componentDidMount() {
    this.search()
  }

  search = async (keyword = '') => {
    const { locationInfo } = this.props
    let { latitude, longitude } = locationInfo
    if (!locationInfo.latitude && !locationInfo.longitude) {
      try {
        const { data } = await getGeolocation();
        latitude = data.latitude   // eslint-disable-line
        longitude = data.longitude // eslint-disable-line
        this.props.homeUpdate({
          locationInfo: data,
        })
      } catch ({ err }) {
        return Toast.info(err)
      }
    }
    try {
      const { data } = await getNearby({
        latitude,
        longitude,
        keyword,
        offset: 0,
        limit: 20,
      })
      this.setState({
        list: data,
        loading: false,
      })
    } catch ({ err }) {
      this.setState({
        loading: false,
      })
      Toast.info(err)
    }
  }

  searhChange = ({ target }) => {
    this.searchFn(target.value)
  }

  searchClick = () => {
    if (this.input) {
      this.search(this.input.value)
    }
  }

  handleRowClick = (val) => {
    // addressClick 外部传入的handler
    const { addressClick, history } = this.props
    if (!addressClick) {
      this.props.homeUpdate({
        init: false,
        locationInfo: {
          address: val.address,
          latitude: val.latitude,
          longitude: val.longitude,
        },
      })
    } else {
      addressClick(val)
    }
    history.goBack()
  }

  render() {
    const { list, loading } = this.state

    return (
      <div className={styles.address}>
        <NavBar
          title="搜索地址"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />
        <div className={styles.list}>
          {
            loading ? <Loading style={{ marginTop: 20 }} /> : (
              <Scroll dataSource={list}>
                <div className={styles.search}>
                  <div className={styles.input}>
                    <SvgIcon name="#search" className={styles.icon} />
                    <input placeholder="请输入小区/写字楼/学校等" onChange={this.searhChange} ref={c => this.input = c} />
                  </div>
                  <button className={styles.btn} onClick={this.searchClick}>搜索</button>
                </div>
                {
                  list.length ? (
                    <div className={styles.container}>
                      {
                        list.map(v => (
                          <AddressRow
                            data={v}
                            key={v.id}
                            handleClick={() => this.handleRowClick({
                              poi_type: 0,
                              st_geohash: v.geohash,
                              address: v.name,
                              address_detail: v.address,
                              latitude: v.latitude,
                              longitude: v.longitude,
                            })} />
                        ))
                      }
                    </div>
                  ) : <NoData />
                }
              </Scroll>
            )
          }
        </div>
      </div>
    )
  }
}
