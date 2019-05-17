
import React from 'react'
import ReactDom from 'react-dom'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Slide from 'components/slide'
import Scroll from 'components/scroll'
import Toast from 'components/toast'
import { homeUpdate, homeInit, homeList } from '../../stores/home'
import withTabBar from '../common-components/tab-bar'
import TitleBar from '../common-components/title-bar'
import ShopListRow from '../common-components/shop-list-row'
import Skeleton from './skeleton-screen'
import TopBar from './top-bar'
import styles from './index.less'

const mapStateToProps = ({ home }) => ({
  init: home.init,
  banner: home.banner,
  entry: home.entry,
  locationInfo: home.locationInfo,
  shoplist: home.shoplist,
})
const mapActionsToProps = dispatch => bindActionCreators({
  homeUpdate,
  homeInit,
  homeList,
}, dispatch)

@connect(
  mapStateToProps,
  mapActionsToProps,
)
@withTabBar
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topBarHeight: 0,
    }
  }

  componentDidMount() {
    this.props.homeInit()
  }

  componentWillUnmount() {
    this.props.homeUpdate({ topBarShrink: false })
  }

  getTopBarHeight = (topBar) => {
    if (topBar) {
      this.setState({
        topBarHeight: ReactDom.findDOMNode(topBar).clientHeight,
      })
    }
  }

  imgLoaded = () => {
    if (this.scroll && !this.loadImg) {
      this.loadImg = true
      this.scroll.refresh()
    }
  }

  scrolling = ({ y }) => {
    const { topBarHeight } = this.state
    let topBarShrink = false
    if (y < -topBarHeight) {
      topBarShrink = true
    }
    this.props.homeUpdate({ topBarShrink })
  }

  refreshScroll = () => {
    this.scroll && this.scroll.refresh()    // eslint-disable-line
  }

  handlePullUp = () => {
    this.props.homeList(() => this.scroll && this.scroll.forceUpdate())
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

  iconClick = (val) => {
    try {
      const urlParams = queryString.parse(decodeURIComponent(val.link).split('?')[1])
      const params = JSON.parse(urlParams.target)
      this.props.history.push({
        pathname: '/restaurant',
        state: {
          ...params,
          entry_id: urlParams.entry_id,
          target_name: urlParams.target_name,
        },
      })
    } catch (err) {
      Toast.info('Sorry,请点别的菜单😂', 2)
    }
  }

  render() {
    const { topBarHeight } = this.state
    const {
      banner,
      entry,
      shoplist,
      init,
    } = this.props
    const scrollProps = {
      className: styles.scroll,
      dataSource: shoplist,
      probeType: 3,
      listenScroll: true,
      scroll: pos => this.scrolling(pos),
      style: { top: topBarHeight },
      pullUpLoad: true,
      pullingUp: this.handlePullUp,
    }

    return (
      <div className={styles.root}>
        <TopBar ref={this.getTopBarHeight} />
        {
          init ? (
            <Scroll {...scrollProps} ref={c => this.scroll = c}>
              <Slide>
                {
                  banner.map(v => (
                    <img key={v.id} src={v.image_url} alt="" />
                  ))
                }
              </Slide>
              <div className={styles['entry-wrapper']}>
                {
                  entry.slice(0, 10).map(v => (
                    <div className={styles.item} key={v.id} onClick={() => this.iconClick(v)}>
                      <div className={styles.img}>
                        <img alt="" src={v.image_url} />
                      </div>
                      <p className={styles.name}>{v.name}</p>
                    </div>
                  ))
                }
              </div>
              <TitleBar title="推荐商家" />
              {
                shoplist.map((shop, i) => (
                  <ShopListRow
                    handleClick={() => this.handleRowClick(shop)}
                    key={`${shop.id}--${i}--${new Date().getTime()}`}
                    data={shop}
                    refresh={this.refreshScroll} />
                ))
              }
            </Scroll>
          ) : <Skeleton style={{ paddingTop: topBarHeight }} />
        }
      </div>
    )
  }
}
