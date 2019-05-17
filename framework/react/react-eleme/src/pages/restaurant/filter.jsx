

import React from 'react'
import cls from 'classnames'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from 'utils/config'
import SvgIcon from 'components/icon-svg'
import Badge from '../common-components/badge'
import { restaurantUpdate, fetchShopList } from '../../stores/restaurant'
import styles from './index.less'

// 距离最近 id = 5

const { orderByMap } = config
const mapStateToProps = ({ restaurant }) => ({
  order_by: restaurant.order_by,
  super_vip: restaurant.super_vip,
  activityList: restaurant.activityList,
  costsList: restaurant.costsList,
  supportsList: restaurant.supportsList,
  activity_types: restaurant.activity_types,
  average_cost_ids: restaurant.average_cost_ids,
  support_ids: restaurant.support_ids,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  restaurantUpdate,
  fetchShopList,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class FilterBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orderbyVisible: false,
      filterVisible: false,
      activity_id: [],
      average_id: [],
      support_id: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.activity_types !== this.props.activity_types ||
      nextProps.average_cost_ids !== this.props.average_cost_ids ||
      nextProps.support_ids !== this.props.support_ids
    ) {
      this.setState({
        activity_id: nextProps.activity_types,
        average_id: nextProps.average_cost_ids,
        support_id: nextProps.support_ids,
      })
    }
  }

  toggleVisible = (orderby, filter) => {
    this.setState({
      orderbyVisible: orderby,
      filterVisible: filter,
    })
  }

  filterClick = (key, val) => {
    if (key === 'activity') {
      this.setState({ activity_id: [val] })
    }
    if (key === 'average') {
      this.setState({ average_id: [val] })
    }
    if (key === 'support') {
      const { support_id } = this.state
      const isHas = support_id.find(v => v === val)
      this.setState({
        support_id: isHas ? support_id.filter(v => v !== val) : [...support_id, val],
      })
    }
  }

  reset = () => {
    this.setState({
      activity_id: [],
      average_id: [],
      support_id: [],
    })
  }

  orderbyClick = (id, hide = false) => {
    this.props.fetchShopList({
      order_by: id,
    })
    hide && this.toggleVisible(false, false) // eslint-disable-line
  }

  superClick = () => {
    const { super_vip } = this.props
    this.props.fetchShopList({
      super_vip: super_vip ? 0 : 1,
    })
  }

  submit = () => {
    const { activity_id, average_id, support_id } = this.state
    this.props.fetchShopList({
      activity_types: activity_id,
      average_cost_ids: average_id,
      support_ids: support_id,
    })
    this.toggleVisible(false, false)
  }

  render() {
    const {
      orderbyVisible,
      filterVisible,
      activity_id,
      average_id,
      support_id,
    } = this.state
    const {
      order_by,
      super_vip,
      activityList,
      costsList,
      supportsList,
    } = this.props

    const orderByMapItem = orderByMap.find(v => v.id === order_by)
    const firtItem = orderByMapItem ? orderByMapItem.name : orderByMap[0].name
    const itemStyles = () => {
      const isHas = orderByMap.find(v => v.id === order_by)
      return cls(styles.item, isHas ? styles.active : null)
    }
    const filterStyle = cls([styles.item, {
      [styles.active]: activity_id.length || average_id.length || support_id.length,
    }])

    return (
      <div className={styles.filter}>
        <div
          className={itemStyles()}
          onClick={() => this.toggleVisible(!orderbyVisible, false)}>
          <span>{firtItem}</span>
          <SvgIcon className={styles.triangle} name="#triangle_down_fill" />
        </div>
        <div
          onClick={() => this.orderbyClick(5)}
          className={cls(styles.item, order_by === 5 ? styles.active : null)}>
          <span>距离最近</span>
        </div>
        <div
          onClick={this.superClick}
          className={cls(styles.item, super_vip === 1 ? styles.active : null)}>
          <SvgIcon className={styles.crown} name="#crown" />
          <span>会员领红包</span>
        </div>
        <div className={filterStyle} onClick={() => this.toggleVisible(false, !filterVisible)}>
          <span>筛选</span>
          <SvgIcon className={styles.icon} name="#filter" />
        </div>

        <QueueAnim type="alpha">
          {
            orderbyVisible ? (
              <div className={styles.orderby} key="a">
                {
                  orderByMap.map(v => (
                    <div
                      onClick={() => this.orderbyClick(v.id, true)}
                      key={v.id}
                      className={cls(styles.item, order_by === v.id ? styles.active : null)}>
                      <h1 className={styles.title}>{v.name}</h1>
                      {
                        order_by === v.id ? (
                          <SvgIcon className={styles.check} name="#check" />
                        ) : null
                      }
                    </div>
                  ))
                }
              </div>
            ) : null
          }
        </QueueAnim>

        <QueueAnim type="alpha">
          {
            filterVisible ? (
              <div className={styles['filter-modal']} key="a">
                <div className={styles.content}>
                  <h1 className={styles.title}>优惠活动</h1>
                  <div className={styles.items}>
                    {
                      activityList.map(v => (
                        <div
                          onClick={() => this.filterClick('activity', v.id)}
                          className={cls(
                            styles.item,
                            activity_id[0] === v.id ? styles.active : null,
                          )}
                          key={v.id}>
                          <Badge
                            className={styles.badge}
                            style={{ backgroundColor: `#${v.icon_color}` }}
                            text={v.icon_name} />
                          <span className={styles.name}>{v.name}</span>
                        </div>
                      ))
                    }
                  </div>
                  <h1 className={styles.title}>人均消费</h1>
                  <div className={styles.items}>
                    {
                      costsList.map(v => (
                        <div
                          onClick={() => this.filterClick('average', v.id)}
                          className={cls(
                            styles.item,
                            average_id[0] === v.id ? styles.active : null,
                          )}
                          key={v.id}>
                          <span className={styles.name}>{v.description}</span>
                        </div>
                      ))
                    }
                  </div>
                  <h1 className={styles.title}>商家属性</h1>
                  <div className={styles.items}>
                    {
                      supportsList.map(v => (
                        <div
                          onClick={() => this.filterClick('support', v.id)}
                          className={cls(
                            styles.item,
                            support_id.find(id => id === v.id) ? styles.active : null,
                          )}
                          key={v.id}>
                          <Badge
                            className={styles.badge}
                            style={{ backgroundColor: `#${v.icon_color}` }}
                            text={v.icon_name} />
                          <span className={styles.name}>{v.name}</span>
                        </div>
                      ))
                    }
                  </div>

                  <div className={styles.footer}>
                    <button className={styles.reset} onClick={this.reset}>清空</button>
                    <button className={styles.submit} onClick={this.submit}>确定</button>
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
