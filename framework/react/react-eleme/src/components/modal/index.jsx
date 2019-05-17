

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'

export default class Modal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }
  render() {
    const { visible, children } = this.props
    return ReactDOM.createPortal(
      <QueueAnim type="alpha">
        {
          visible ? children : null
        }
      </QueueAnim>,
      this.el,
    )
  }
}
