
/*eslint-disable*/
import React from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { addClass } from 'utils/dom'
import styles from './index.less'

/**
 * loop           无缝轮播
 * autoPlay       自动播放
 * interval       时间间隔
 * showDot        是否显示dot
 * click          派发点击时间
 * threshold      可滚动到下一个的阈值
 * speed          滚动速度
 */
const slideProps = {
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  showDot: PropTypes.bool,
  click: PropTypes.bool,
  threshold: PropTypes.number,
  speed: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

const defaultSlideProps = {
  loop: true,
  autoPlay: true,
  interval: 2000,
  showDot: true,
  click: true,
  threshold: 0.3,
  speed: 400,
}

export default class Slide extends React.Component {
  static defaultProps = defaultSlideProps
  static propTypes = slideProps

  constructor(props) {
    super(props)
    this.state = {
      dots: [],
      currentPageIndex: 0,
    }
    this.children = []
    this.timer = null
    this.resizeTimer = null
    this.slide = null
  }

  componentDidMount() {
    this.update()
    // resize
    window.addEventListener('resize', () => {
      if (!this.slide || !this.slide.enabled) return
      this.resizeTimer && clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        // 是否处于滚动动画过程中
        if (this.slide.isInTransition) {
          this.onScrollEnd()
        } else {
          this.props.autoPlay && this.play()
        }
        this.refresh()
      }, 60)
    })
  }

  componentWillUnmount() {
    this.slide.disable()
    this.slide.destroy()
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loop !== this.props.loop
      || nextProps.autoPlay !== this.props.autoPlay
      || nextProps.speed !== this.props.speed
      || nextProps.threshold !== this.props.threshold) {
      this.update()
    }
  }

  changeState = (key, v) => {
    this.setState({
      [key]: v,
    })
  }

  update = () => {
    if (this.slide) {
      this.slide.destroy()
    }
    this.init()
  }

  refresh = () => {
    this.setSlideWidth(true)
    this.slide.refresh()
  }

  prev = () => {
    this.slide.prev()
  }

  next = () => {
    this.slide.next()
  }

  play = () => {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.slide.next()
    }, this.props.interval)
  }

  init = () => {
    this.timer && clearTimeout(this.timer)
    this.changeState('currentPageIndex', 0)
    // 设置容器宽度
    this.setSlideWidth()
    // 初始化dots
    this.props.showDot && this.initDots()
    // 初始化slide
    this.initSlide()
    this.props.autoPlay && this.play()
  }

  setSlideWidth = (isResize = false) => {
    this.children = this.slideGroup.childNodes
    // 遍历每个子元素 如果没有默认样式添加默认样式 并计算父容器总宽度
    let width = 0
    let slideWidth = this.wrapper.clientWidth
    this.children.forEach(child => {
      if (child.nodeType === 1) {
        // 添加默认样式
        addClass(child, styles['slide-item'])
        child.style.width = `${slideWidth}px`
        width += slideWidth
      }
    })
    // 无缝多添加2张宽度
    if (this.props.loop && !isResize) {
      width += 2 * slideWidth
    }
    this.slideGroup.style.width = `${width}px`
  }

  initDots = () => {
    const dots = Array.from({
      length: this.children.length
    }, (v, i) => i )
    this.changeState('dots', dots)
  }

  initSlide = () => {
    const { loop, click, threshold, speed } = this.props
    this.slide = new BScroll(this.wrapper, {
      click,
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: { loop, threshold, speed },
      bounce: false,
      stopPropagation: true,
    })
    this.slide.on('scrollEnd', this.onScrollEnd)
    this.slide.on('touchEnd', () => {
      this.props.autoPlay && this.play()
    })
    this.slide.on('beforeScrollStart', () => {
      this.props.autoPlay && this.timer && clearTimeout(this.timer)
    })
  }

  onScrollEnd = () => {
    const pageIndex = this.slide.getCurrentPage().pageX
    this.changeState('currentPageIndex', pageIndex)
    this.props.autoPlay && this.play()
  }

  render() {
    const { children, showDot } = this.props
    const { dots, currentPageIndex } = this.state

    return (
      <div className={styles.slide} ref={c => this.wrapper = c}>
        <div className={styles['slide-group']} ref={c => this.slideGroup = c}>
          {children}
        </div>
        {
          showDot ? (
            <div className={styles.dots}>
              {
                dots.map(v => (
                  <span key={v} className={cls(styles.dot, v === currentPageIndex ? styles.active : '')} />
                ))
              }
            </div>
          ) : null
        }
      </div>
    )
  }
}
