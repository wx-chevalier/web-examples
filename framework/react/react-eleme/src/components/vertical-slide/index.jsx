
/*eslint-disable*/
import React from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import { addClass } from 'utils/dom'
import styles from './index.less'

const slideProps = {
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  click: PropTypes.bool,
}

const defaultSlideProps = {
  loop: true,
  autoPlay: true,
  interval: 900,
  click: true,
}

export default class VerticalSlide extends React.Component {
  static defaultProps = defaultSlideProps
  static propTypes = slideProps

  constructor(props) {
    super(props)
    this.state = {
      currentPageIndex: 0
    }
    this.children = []
    this.timer = null
    this.resizeTimer = null
  }

  componentDidMount() {
    this.update()
    window.addEventListener('resize', () => {
      if (!this.slide || !this.slide.enabled) return
      this.resizeTimer && clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slide.isInTransition) {
          this.onScrollEnd()
        } else {
          this.props.autoPlay && this.play()
        }
        this.refresh()
      }, 60)
    }, false)
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

  update = () => {
    if (this.slide) {
      this.slide.destroy()
    }
    this.init()
  }

  refresh = () => {
    this.setSlideHeight(true)
    this.slide.refresh()
  }

  next = () => {
    this.slide.next()
  }

  init = () => {
    if (!this.wrapper) return
    this.timer && clearTimeout(this.timer)
    this.setState({ currentPageIndex: 0 })
    // 设置容器高度
    this.setSlideHeight()
    // 初始化slide
    this.initSldie()
  }

  setSlideHeight = (isResize = false) => {
    this.children = this.slideGroup.childNodes
    let height = 0
    let slideHeight = this.wrapper.clientHeight
    this.children.forEach(child => {
      if (child.nodeType === 1) {
        // 添加默认样式
        addClass(child, styles['slide-item'])
        child.style.height = `${slideHeight}px`
        height += slideHeight
      }
    })
    if (this.props.loop && !isResize) {
      height += 2 * slideHeight
    }
    this.slideGroup.style.height = `${height}px`
  }

  initSldie = () => {
    const { loop, autoPlay, click } = this.props
    this.slide = new BScroll(this.wrapper, {
      click,
      scrollX: false,
      scrollY: true,
      momentum: false,
      snap: {
        loop,
        threshold: 0.3,
        speed: 400,
      },
      bounce: false,
    })

    this.slide.on('scrollEnd', this.onScrollEnd)

    this.slide.on('touchEnd', () => {
      this.props.autoPlay && this.play()
    })

    this.slide.on('beforeScrollStart', () => {
      this.props.autoPlay && this.timer && clearTimeout(this.timer)
    })

    if (this.props.autoPlay) {
      this.play()
    }
  }

  onScrollEnd = () => {
    let pageIndex = this.slide.getCurrentPage().pageY
    this.setState({ currentPageIndex: pageIndex })
    this.props.autoPlay && this.play()
  }

  play = () => {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.slide.next()
    }, this.props.interval)
  }

  render() {
    const { children } = this.props
    return (
      <div className={styles.slide} ref={c => this.wrapper =c}>
        <div className={styles['slide-group']} ref={c => this.slideGroup = c}>
          {children}
        </div>
      </div>
    )
  }
}
