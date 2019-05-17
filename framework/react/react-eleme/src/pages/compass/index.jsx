

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Scroll from 'components/scroll'
import NavBar from '../common-components/nav-bar'
import withTabBar from '../common-components/tab-bar'
import AuthErr from '../common-components/auth-err'
import RecommedFoodRow from '../common-components/recommend-food-row'
import NoData from '../common-components/no-data'
import RecommedSk from '../common-components/skeleton/recommend'
import { fetchFoodList } from '../../stores/compass'
import styles from './index.less'

const mapStateToProps = ({ globalState, compass, home }) => ({
  isLogin: globalState.isLogin,
  init: compass.init,
  foodList: compass.foodList,
  locationInfo: home.locationInfo,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchFoodList,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
@withTabBar
export default class Compass extends React.Component {
  componentDidMount() {
    const { isLogin, init } = this.props
    if (isLogin && !init) {
      this.props.fetchFoodList()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin && !nextProps.init) {
      this.props.fetchFoodList()
    }
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
    const {
      isLogin,
      foodList,
      init,
      history,
    } = this.props

    const scrollProps = {
      className: styles.scroll,
      dataSource: foodList,
      pullUpLoad: true,
      pullingUp: this.props.fetchFoodList,
    }

    return (
      <div className={styles.compass}>
        <NavBar
          title="发现"
          iconLeft="#back"
          leftClick={() => history.goBack()} />
        {
          isLogin && init ? (
            <Scroll {...scrollProps}>
              {
                foodList.length ? foodList.map((v, i) => (
                  <RecommedFoodRow
                    key={i}
                    data={v}
                    rowClick={() => this.handleRowClick(v.restaurant)} />
                )) : <NoData />
              }
            </Scroll>
          ) : isLogin && !init ? (
            <div style={{ textAlign: 'center' }}>
              {
                Array.from({ length: 20 }, (v, i) => i).map(v => (
                  <RecommedSk key={v} />
                ))
              }
            </div>
          ) : <AuthErr />
        }
      </div>
    )
  }
}
