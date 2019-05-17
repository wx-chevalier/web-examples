

import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'components/modal'
import Slide from 'components/slide'
import styles from './index.less'

export default class Gallery extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    photos: PropTypes.array,
  }

  render() {
    const { visible, photos, handleCancel = () => {} } = this.props
    return (
      <Modal visible={visible}>
        <div className={styles.gallery} onClick={handleCancel} key="a">
          <div className={styles.slide}>
            {
              photos.length ? (
                <Slide
                  loop={photos.length > 1}
                  showDot={false}
                  autoPlay={false}>
                  {
                    photos.map((v, i) => (
                      <img key={i} src={v} alt="" />
                    ))
                  }
                </Slide>
              ) : null
            }
          </div>
          <div className={styles.mask} />
        </div>
      </Modal>
    )
  }
}
