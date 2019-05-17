

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import numeral from 'numeral'
import cls from 'classnames'
import { getImageUrl } from 'utils/utils'
import avatar from 'assets/img/avatar.svg'
import Rate from 'components/rate'
import Scroll from 'components/scroll'
import Gallery from '../../common-components/gallery'
import { changeRatingTag } from '../../../stores/shop'
import styles from './index.less'


@connect(({ shop }) => ({
  info: shop.info,
  tags: shop.tags,
  scores: shop.scores,
  ratings: shop.ratings,
  tagIndex: shop.tagIndex,
}), dispatch => bindActionCreators({
  changeRatingTag,
}, dispatch))
export default class Ratings extends React.PureComponent {
  state = {
    photo: [],
    photoVisible: false,
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.ratings !== this.props.ratings) {
      this.scroll && this.scroll.refresh() // eslint-disable-line
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  tagClick = ({ name }) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.props.changeRatingTag(name)
    }, 60)
  }

  galleryCancel = () => {
    this.setState({
      photoVisible: false,
    })
  }

  imgClick = (val) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.setState({
        photo: [val],
        photoVisible: true,
      })
    }, 60)
  }

  render() {
    const {
      show,
      ratings,
      info,
      tags,
      scores,
      tagIndex,
    } = this.props

    const { photo, photoVisible } = this.state

    const compare_rating = numeral(scores.compare_rating * 100 || 0).format('0.00')
    const service_score = numeral(scores.service_score || 0).format('0.0')
    const food_score = numeral(scores.food_score || 0).format('0.0')

    const tagCls = name => cls([
      styles.tag,
      {
        [styles.active]: tagIndex === name,
        [styles.bad]: name === '不满意',
      },
    ])

    return !show ? null : (
      <div className={styles.ratings}>
        <Scroll ref={c => this.scroll = c} className={styles.scroll}>
          <div className={styles['rating-info']}>
            <div className={styles.left}>
              <h1 className={styles.num}>{info.rating}</h1>
              <p className={styles.text}>综合评价</p>
              <p className={styles.desc}>高于周边商家{compare_rating}%</p>
            </div>
            <div className={`${styles.split} hairline-v`} />
            <div className={styles.right}>
              <div className={styles.item}>
                <span className={styles.label}>服务态度</span>
                <span className={styles.star}>
                  <Rate value={Number(service_score)} size="1em" />
                </span>
                <span className={styles.num}>{service_score}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>菜品评价</span>
                <span className={styles.star}>
                  <Rate value={Number(food_score)} size="1em" />
                </span>
                <span className={styles.num}>{food_score}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>送达时间</span>
                <span className={styles.time}>{scores.deliver_time || '--'}分钟</span>
              </div>
            </div>
          </div>

          {
            tags.length ? (
              <div className={styles.tags}>
                {
                  tags.map((v, i) => (
                    <span onClick={() => this.tagClick(v)} className={tagCls(v.name)} key={i}>{`${v.name}(${v.count})`}</span>
                  ))
                }
              </div>
            ) : null
          }

          {
            ratings.map(v => (
              <div className={styles['rating-item']} key={v.order_id}>
                <div className={`${styles.line} hairline-h`} />
                <div className={styles.left}>
                  <div className={styles.avatar}>
                    <img src={v.avatar ? getImageUrl(v.avatar) : avatar} />
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.user}>
                    <span className={styles.name}>{v.username}</span>
                    <span className={styles.time}>{v.rated_at}</span>
                  </div>
                  <div className={styles.rating}>
                    <span className={styles.star}>
                      <Rate className={styles['rate-style']} value={Number(service_score)} size="1em" />
                    </span>
                    <span className={styles.desc}>{v.time_spent_desc}</span>
                  </div>
                  <div className={styles.text}>{v.rating_text}</div>
                  {
                    v.order_images && v.order_images.length ? (
                      <div className={styles['order-img']}>
                        {
                          v.order_images.map((img, i) => (
                            <div
                              key={i}
                              className={styles.img}
                              onClick={() => this.imgClick(getImageUrl(img.image_hash))}>
                              <img src={getImageUrl(img.image_hash)} />
                            </div>
                          ))
                        }
                      </div>
                    ) : null
                  }
                </div>
              </div>
            ))
          }
        </Scroll>

        <Gallery
          visible={photoVisible}
          photos={photo}
          handleCancel={this.galleryCancel} />
      </div>
    )
  }
}
