
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchShopDestroy, getHotKeys, searchShopUpdate, getShopList } from 'stores/search-shop'
import SvgIcon from 'components/icon-svg'
import NavBar from '../common-components/nav-bar'
import ShopList from './list'
import styles from './index.less'

const mapStateToProps = ({ searchShop, home }) => ({
  keywords: searchShop.keywords,
  hotKeys: searchShop.hotKeys,
  locationInfo: home.locationInfo,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  searchShopDestroy,
  getHotKeys,
  searchShopUpdate,
  getShopList,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchShop extends React.Component {
  componentDidMount() {
    this.props.getHotKeys()
  }

  componentWillUnmount() {
    this.props.searchShopDestroy()
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  searhChange = ({ target }) => {
    const { locationInfo } = this.props
    this.props.searchShopUpdate({
      keywords: target.value,
    })
    if (!locationInfo.latitude && !locationInfo.longitude) {
      return
    }
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(this.props.getShopList, 600)
  }

  badgeClick = (val) => {
    const { locationInfo } = this.props
    this.props.searchShopUpdate({
      keywords: val,
    })
    if (!locationInfo.latitude && !locationInfo.longitude) {
      return
    }
    this.props.getShopList()
  }

  searchClick = () => {
    const { locationInfo } = this.props
    if (!locationInfo.latitude && !locationInfo.longitude) {
      return
    }
    this.props.getShopList()
  }

  render() {
    const { keywords, hotKeys } = this.props

    return (
      <div className={styles.search}>
        <NavBar
          title="搜索"
          iconLeft="#back"
          leftClick={() => this.props.history.goBack()} />

        <div className={styles['search-bar']}>
          <div className={styles.input}>
            <SvgIcon name="#search" className={styles.icon} />
            <input placeholder="请输入" onChange={this.searhChange} value={keywords} />
          </div>
          <button className={styles.btn} onClick={this.searchClick}>搜索</button>
        </div>

        {
          !keywords ? (
            <div className={styles.hot}>
              <h1 className={styles.title}>热门搜索</h1>
              {
                hotKeys.map((v, i) => (
                  <div
                    className={styles.badge}
                    key={i}
                    onClick={() => this.badgeClick(v.word)}>
                    {v.word}
                  </div>
                ))
              }
            </div>
          ) : <ShopList />
        }

      </div>
    )
  }
}
