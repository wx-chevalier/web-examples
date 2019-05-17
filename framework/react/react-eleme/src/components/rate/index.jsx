

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames';
import { prefixStyle } from 'utils/dom'
import styles from './index.less'

/**
 * color 颜色
 * value 数值
 * length 星星颗数
 * size 星星大小
 * animate 动画时间
 * readonly 是否只读
 */
const rateProps = {
  className: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.number,
  length: PropTypes.number,
  animate: PropTypes.number,
  size: PropTypes.string,
  // readonly: PropTypes.bool,
}

const defaultValue = {
  className: '',
  color: '#fed100',
  value: 0,
  length: 5,
  size: '1em',
  animate: 0,
  // readonly: true,
}

const transition = prefixStyle('transition')

export default class Rate extends React.Component {
  static defaultProps = defaultValue
  static propTypes = rateProps

  constructor(props) {
    super(props)
    this.state = {
      stars: new Array(props.length - 0).fill('★'),
      hollow: new Array(props.length - 0).fill('☆'),
      styleObject: {},
    }
    this.styleFont = {
      color: props.color,
      fontSize: props.size,
    }
  }

  componentDidMount() {
    if (!this.props.animate) {
      this.setStyle()
    }
    this.timer = setTimeout(() => this.setStyle(), 60)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  setStyle = () => {
    this.setState(() => {
      return {
        styleObject: {
          width: `${this.props.value}em`,
          [transition]: `width ${this.props.animate}s`,
        },
      }
    })
  }

  render() {
    const { stars, hollow, styleObject } = this.state
    const { className } = this.props
    return (
      <div className={cls(styles['rate-wrapper'], className)}>
        {
          hollow.map((v, i) => (
            <span key={i} style={this.styleFont}>{v}</span>
          ))
        }
        <div className={styles.rate} style={{ ...this.styleFont, ...styleObject }}>
          {
            stars.map((v, i) => (
              <span key={i} style={this.styleFont}>{v}</span>
            ))
          }
        </div>
      </div>
    )
  }
}
