
/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import BScroll from 'better-scroll'
import Loading from '../loading'
import Bubble from './bubble'
import styles from './index.less'

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default class Scroll extends React.Component {
  /**
   *  dataSource 数据源  用于判断 刷新以及加载更多的动作
   *  probeType
   *  click
   *  listenScroll 是否监听滚动事件
   *  listenBeforeScroll 是否监听开始滚动滚动前事件
   *  direction 滚动方向 horizontal or vertical
   *  scrollbar BScroll 滚动条参数Boolean | Object
   *  pullDownRefresh 是否开启下拉刷新 Boolean | Object { txt: '', stop： 暂停位置的距离, stopTime: 数据获取完成后停留多少时间 }
   *  pullUpLoad 是否开启上拉加载更多 Boolean | Object { txt: {more: , nomore: } }
   *  startY 初始化Y轴位置
   *  refreshDelay 数据变动后延迟多少时间后调用forceUpdate
   *  freeScroll 是否开启横向纵向滚动
   *  horizontalWidth 开启横向滚动时的maxwidth
   *  pullingDown function -> 下拉回调
   *  pullingUp   function -> 上拉回调
   *  scroll      function -> 滚动回调
   *  beforeScrollStart function -> 滚动开始回调
   */
  static proptypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    dataSource: PropTypes.array,
    probeType: PropTypes.oneOf([1, 2, 3]),
    click: PropTypes.bool,
    listenScroll: PropTypes.bool,
    listenBeforeScroll: PropTypes.bool,
    direction: PropTypes.string,
    scrollbar: PropTypes.bool,
    pullDownRefresh: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    pullUpLoad: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    bounce: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    stopPropagation: PropTypes.bool,
    momentum: PropTypes.bool,
    startY: PropTypes.number,
    refreshDelay: PropTypes.number,
    freeScroll: PropTypes.bool,
    horizontalWidth: PropTypes.number,
    pullingDown: PropTypes.func,
    pullingUp: PropTypes.func,
    scroll: PropTypes.func,
    beforeScrollStart: PropTypes.func,
  }

  static defaultProps = {
    dataSource: [],
    probeType: 1,
    click: true,
    listenScroll: false,
    listenBeforeScroll: false,
    direction: DIRECTION_V,
    scrollbar: false,
    pullDownRefresh: false,
    pullUpLoad: false,
    momentum: true,
    bounce: true,
    startY: 0,
    refreshDelay: 20,
    freeScroll: false,
    horizontalWidth: 0,
    stopPropagation: false,
    pullingDown: () => {},
    pullingUp: () => {},
    scroll: () => {},
    beforeScrollStart: () => {},
  }

  constructor(props) {
    super(props)
    this.pullDownInitTop = -50
    this.state = {
      beforePullDown: true,    // 显示bubble
      isRebounding: false,     // 数据获取完毕 是否开始向上回弹
      isPullingDown: false,    // 下拉标识
      pulling: false,          // 显示loading
      isPullUpLoad: false,     // 是否正在加载
      pullUpDirty: true,       // 显示footer中pullUpTxt true 显示加载更多 false 没有更多数据
      bubbleY: 0,              // bubble y值
      pullDownStyle: { top: `${this.pullDownInitTop}px` },
    }
  }

  componentDidMount() {
    this.initScroll()
  }

  componentWillUnmount() {
    this.bs && this.bs.destroy()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      setTimeout(() => {
        this.forceUpdate(true)
      }, nextProps.refreshDelay)
    }
    if (nextProps.horizontalWidth !== this.props.horizontalWidth
      && (nextProps.direction === DIRECTION_H || nextProps.freeScroll)) {
        this.scrollContent.style.width = nextProps.horizontalWidth + 'px'
        setTimeout(() => {
          this.forceUpdate(true)
        }, nextProps.refreshDelay)
    }
  }

  initScroll = () => {
    if (!this.wrapper) { return ; }
    const { probeType, click, freeScroll,
      direction, scrollbar, pullDownRefresh,
      pullUpLoad, startY, horizontalWidth,
      listenScroll, scroll, listenBeforeScroll,
      beforeScrollStart, momentum, bounce,
      stopPropagation } = this.props;
    // 如果开启freeScroll设置宽度
    if (freeScroll || direction === DIRECTION_H) {
      this.scrollContent.style.width = horizontalWidth + 'px'
    }
    // 创建betterScroll
    this.bs = new BScroll(this.wrapper, {
      click,
      startY,
      probeType,
      scrollbar,
      pullUpLoad,
      freeScroll,
      pullDownRefresh,
      momentum,
      bounce,
      stopPropagation,
      scrollX: freeScroll || direction === DIRECTION_H,
      scrollY: freeScroll || direction === DIRECTION_V,
    });
    // 开启滚动监听到话调用父组件callback
    if (listenScroll) {
      this.bs.on('scroll', (pos) => {
        scroll(pos)
      })
    }
    // 向父组件派发滚动开始事件
    if (listenBeforeScroll) {
      this.bs.on('beforeScrollStart', (pos) => {
        beforeScrollStart(pos)
      })
    }
    // 初始化下拉刷新
    if (pullDownRefresh) {
      this.initPullDownRefresh()
    }
    // 初始化加载更多
    if (pullUpLoad) {
      this.initPullUpLoad()
    }
  }

  initPullDownRefresh = () => {
    const { pullingDown } = this.props
    this.bs.on('pullingDown', () => {
      this.setState({
        beforePullDown: false,
        isPullingDown: true,
        pulling: true,
      })
      pullingDown()
    })
    // 监听滚动修改bubble动画
    this.bs.on('scroll', (pos) => {
      const { pullDownRefresh } = this.props
      const { beforePullDown, isRebounding } = this.state
      if (beforePullDown) {
        this.setState({
          bubbleY: Math.max(0, pos.y + this.pullDownInitTop),
          pullDownStyle: { top: `${Math.min(pos.y + this.pullDownInitTop, 10)}px` },
        })
      } else {
        this.setState({ bubbleY: 0 })
      }
      if (isRebounding) {
        // 数据获取完毕 开始向上回弹
        this.setState({
          pullDownStyle: { top: `${(10 - (pullDownRefresh.stop - pos.y))}px` },
        })
      }
    })
  }

  initPullUpLoad = () => {
    this.bs.on('pullingUp', () => {
      this.setState({ isPullUpLoad: true })
      this.props.pullingUp()
    })
  }

  // 观察下拉刷新或者上拉是否完成 然后调用 reboundPullDown afterPullDown 或者数据变动了或是删除了 强制刷一下BScroll
  forceUpdate = (dirty) => {
    const { pullDownRefresh, pullUpLoad } = this.props
    const { isPullingDown, isPullUpLoad } = this.state
    // 如果打开了下拉刷新功能 且 再下拉状态下
    if (pullDownRefresh && isPullingDown) {
      this.setState({ pulling: false })
      this.reboundPullDown().then(() => {
        this.afterPullDown()
      });
    } else if (pullUpLoad && isPullUpLoad) {
      this.setState({
        isPullUpLoad: false,
        pullUpDirty: dirty,
      })
      this.bs.finishPullUp() // 数据加载完毕后 告诉 better-scroll 数据已加载
      this.refresh()
    } else {
      this.refresh()
    }
  }
  // 延迟 stopTime 毫秒后 再调用 afterPullDown 方法还原数据
  reboundPullDown = () => {
    const { stopTime = 600 } = this.props.pullDownRefresh
    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState({
          isRebounding: true,          // 回弹状态 标识为可以回弹
          isPullingDown: false,        // 下拉状态更改为false
        })
        this.bs.finishPullDown()       // 数据加载完毕后 调用此方法告诉 better-scroll 数据已加载
        resolve()
      }, stopTime)
    });
  }

  // 刷新完成后延迟700毫秒恢复
  afterPullDown() {
    setTimeout(() => {
      this.setState({
        pullDownStyle: { top: `${this.pullDownInitTop}px` }, // 还原top为初始值
        beforePullDown: true,                                       // 显示出bubble
        isRebounding: false,                                        // 回弹标识改为false
      })
      this.refresh()                                                // 数据获取结束后重新刷新下BS
    }, this.bs.options.bounceTime)                                  // bounceTime BScroll 默认值 700 毫秒
  }

  // 禁用
  disable = () => {
    this.bs && this.bs.disable()
  }

  // 启用
  enable = () => {
    this.bs && this.bs.enable()
  }

  // 刷新
  refresh = () => {
    this.bs && this.bs.refresh()
  }

  // 滚动到某位置
  scrollTo() {
    this.bs && this.bs.scrollTo.apply(this.bs, arguments)
  }

  // 滚动到某个dom
  scrollToElement() {
    this.bs && this.bs.scrollToElement.apply(this.bs, arguments)
  }

  // 销毁 解绑事件
  destroy = () => {
    this.bs && this.bs.destroy()
  }

  render() {
    const { dataSource, children, pullUpLoad, pullDownRefresh } = this.props
    const { pullUpDirty, isPullUpLoad, pullDownStyle, beforePullDown, bubbleY, pulling } = this.state
    // 加载更多txt
    const pullUpTxt = () => {
      const moreTxt = (pullUpLoad && pullUpLoad.txt && pullUpLoad.txt.more) || '~加载更多~'
      const noMoreTxt = (pullUpLoad && pullUpLoad.txt && pullUpLoad.txt.nomore) || '~没有更多数据~'
      return pullUpDirty ? moreTxt : noMoreTxt
    }
    // 刷新txt
    const refreshTxt = () => {
      const txt = (pullDownRefresh && pullDownRefresh.txt) || '刷新成功'
      return txt;
    }

    return (
      <div
        className={cls(styles['list-wrapper'], this.props.className)}
        style={this.props.style}
        ref={c => this.wrapper = c}>
        {/* 滚动部分 */}
        <div className={cls(styles['scroll-content'], this.props.contentClassName)} ref={c => this.scrollContent = c}>
          {/* 列表部分 */}
          {children}
          {/* 加载更多 */}
          {
            pullUpLoad ? (
              <div className={styles['pullup-wrapper']}>
                {
                  !isPullUpLoad ? (
                    <div className={styles['before-trigger']}>
                      <span>{pullUpTxt()}</span>
                    </div>
                  ) : (
                    <div className={styles['after-trigger']}>
                      <Loading />
                    </div>
                  )
                }
              </div>
            ) : null
          }
        </div>
        {/* 下拉刷新 */}
        {
          pullDownRefresh ? (
            <div className={styles['pulldown-wrapper']} style={pullDownStyle} ref={c => this.pulldown = c}>
              {
                beforePullDown ? (
                  <div className={styles['before-trigger']}>
                    <Bubble y={bubbleY} />
                  </div>
                ) : (
                  <div className={styles['after-trigger']}>
                    {
                      pulling ? (
                        <Loading />
                      ) : (
                        <div className={styles['refresh-txt']}>
                          <span>{refreshTxt()}</span>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          ) : null
        }
      </div>
    )
  }
}
