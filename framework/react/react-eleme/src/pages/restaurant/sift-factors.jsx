
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cls from 'classnames'
import QueueAnim from 'rc-queue-anim'
import Scroll from 'components/scroll'
import SvgIcon from 'components/icon-svg'
import { getImageUrl } from 'utils/utils'
import { restaurantUpdate, fetchShopList } from '../../stores/restaurant'
import styles from './index.less'

@connect(({ restaurant }) => ({
  category: restaurant.category,
  siftFactors: restaurant.siftFactors,
  selectFactorsId: restaurant.selectFactorsId,
  restaurant_category_ids: restaurant.restaurant_category_ids,
  sub_categories: restaurant.sub_categories,
}), dispatch => bindActionCreators({
  restaurantUpdate,
  fetchShopList,
}, dispatch))
export default class SiftFactors extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      horizontalWidth: 0,
      showCategories: false,

      subCategories: [],
      selectMenuId: undefined,
      restaurant_category_ids: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectFactorsId !== this.props.selectFactorsId) {
      this.setState({
        subCategories: nextProps.sub_categories,
        restaurant_category_ids: nextProps.restaurant_category_ids,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.siftFactors !== this.props.siftFactors) {
      this.computedMenuWidth()
    }
  }

  computedMenuWidth = () => {
    if (!this.menuWrapper) return
    const menus = this.menuWrapper.childNodes
    const width = Array.from(menus).reduce((acc, dom) => {
      return dom.clientWidth + 1 + acc
    }, 0)
    this.setState({ horizontalWidth: width })
  }

  toggleTotal = () => {
    this.setState({ showCategories: !this.state.showCategories })
  }

  menuClick = (val) => {
    this.setState({
      subCategories: val.sub_categories,
      selectMenuId: val.id,
      restaurant_category_ids: [],
    })
  }

  subItemClick = (id) => {
    this.props.fetchShopList({
      sub_categories: this.state.subCategories,
      siftFactors: this.state.subCategories,
      selectFactorsId: id,
      restaurant_category_ids: [id],
    })
    this.setState({
      showCategories: false,
    })
  }

  siftFactorClick = (val) => {
    this.props.fetchShopList({
      selectFactorsId: val.id,
      restaurant_category_ids: val.restaurant_category_ids || [val.id],
    })
  }

  render() {
    const {
      horizontalWidth,
      showCategories,
      subCategories,
      selectMenuId,
      restaurant_category_ids,
    } = this.state
    const {
      siftFactors,
      category,
      selectFactorsId,
    } = this.props
    const menuStyle = id => cls([styles.menu, id === selectFactorsId ? styles.active : null])

    const menuModalItemStyle = (id, compareArr, compareId) => {
      if (restaurant_category_ids.length > 1) {
        const cid = compareArr[0].id
        return cls(styles.item, cid === id ? styles.active : null)
      }
      return cls(styles.item, id === compareId ? styles.active : null)
    }

    return (
      <div className={styles.factors}>
        <div className={styles.categories}>
          <Scroll
            direction="horizontal"
            horizontalWidth={horizontalWidth}
            className={styles.scroll}>
            <div className={styles['menu-wrapper']} ref={c => this.menuWrapper = c}>
              {
                siftFactors.map(v => (
                  <div
                    key={v.id}
                    onClick={() => this.siftFactorClick(v)}
                    className={menuStyle(v.id)}>
                    {v.name}
                  </div>
                ))
              }
            </div>
          </Scroll>
        </div>
        <div className={styles.icon} onClick={this.toggleTotal}>
          <SvgIcon className={styles.more} name="#unfold" />
        </div>
        <QueueAnim type="top">
          {
            showCategories ? (
              <div className={styles['total-categories']} key="a">
                <div className={styles.header}>
                  <h1 className={styles.title}>请选择分类</h1>
                  <div onClick={this.toggleTotal}>
                    <SvgIcon className={styles.close} name="#close" />
                  </div>
                </div>
                <div className={styles.body}>
                  <div className={styles.menu}>
                    <Scroll
                      className={styles['menu-scroll']}
                      dataSource={category}>
                      {
                        category.map(v => (
                          <div
                            key={v.id}
                            className={menuModalItemStyle(v.id, category, selectMenuId)}
                            onClick={() => this.menuClick(v)}>
                            <span>{v.name}</span>
                            <span className={styles.count}>{v.count}</span>
                          </div>
                        ))
                      }
                    </Scroll>
                  </div>
                  <div className={styles.detail}>
                    <Scroll
                      dataSource={subCategories}>
                      {
                        subCategories.map(v => (
                          <div
                            key={v.id}
                            onClick={() => this.subItemClick(v.id)}
                            className={menuModalItemStyle(
                              v.id,
                              subCategories,
                              restaurant_category_ids[0],
                            )}>
                            <div className={styles.img}>
                              <img src={getImageUrl(v.image_url)} />
                            </div>
                            <h1 className={styles.title}>{v.name}</h1>
                            <span className={styles.count}>{v.count}</span>
                          </div>
                        ))
                      }
                    </Scroll>
                  </div>
                </div>
              </div>
            ) : null
          }
        </QueueAnim>
      </div>
    )
  }
}
