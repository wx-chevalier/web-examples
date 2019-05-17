<template>
  <transition name="move">
    <div v-show="foodShow" class="food" ref="food">
      <div class="food-content">
        <div class="image-wrapper">
          <img class="img" :src="food.image">
          <div class="back" @click.stop.prevent="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            ￥
            <span class="now">{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <transition name="buyFade">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @onlyContentChange="onlyContentChange" @typeChange="typeChange" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | format}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div v-show="!food.ratings || food.ratings.length===0" class="no-rating">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import iscroll from 'iscroll'
import {formatDate} from '../../common/js/formatDate'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'

const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;

export default {
  data() {
    return {
      foodShow: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show() {
      this.foodShow = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(function () {
        if (!this.scroll) {
          this.scroll = new iscroll(this.$refs.food,{
            click: true
          });
        }
        this.scroll.refresh();
      });
    },
    back() {
      this.foodShow = false;
    },
    addFirst() {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$store.commit({
        type: 'initBallEle',
        el: event.target
      });
      this.$root.$emit('add_cart');
    },
    needShow(type, text) {
      if (this.foodShow === false) {
        return;
      }
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return this.selectType === type;
      }
    },
    typeChange(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    },
    onlyContentChange() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    }
  },
  filters: {
    format(time) {
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"

  .food
    touch-action: none
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transition: all 0.5s
    &.move-enter,&.move-leave-active
      transform: translate3d(100%,0,0)
    .food-content
      .image-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        .img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
      .content
        position: relative
        padding: 18px
        .title
          margin-bottom: 8px
          line-height: 14px
          font-size: 14px
          font-weight: 700
          color: rgb(7,17,27)
        .detail
          margin-bottom: 18px
          height: 10px
          line-height: 10px
          font-size: 0
          .sell-count,.rating
            font-size: 10px
            color: rgb(147,153,159)
          .sell-count
            margin-right: 12px
        .price
          line-height: 24px
          font-size: 10px
          font-weight: 700
          color: rgb(240,20,20)
          .now
            margin-right: 8px
            font-size: 14px
          .old
            text-decoration: line-through
            color: rgb(147,153,159)
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          padding: 0 12px
          z-index: 10
          height: 24px
          line-height: 24px
          border-radius: 12px
          font-size: 10px
          color: #fff
          background: rgb(0,160,220)
          transition: all 0.2s
          &.buyFade-leave-active,&.buyFade-enter
            opacity: 0
      .info
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 6px
          font-size: 14px
          color: rgb(7,17,27,)
        .text
          line-height: 24px
          padding: 0 8px
          font-size: 12px
          color: rgb(77,85,93)
      .rating
        padding-top: 18px
        .title
          margin-left: 18px
          line-height: 14px
          font-size: 14px
          color: rgb(7,17,27,)
        .rating-wrapper
          padding: 0 18px
          .rating-item
            position: relative
            padding: 16px 0
            border-1px(rgba(7,17,27,0.1))
            .user
              position: absolute
              right: 0
              top: 16px
              line-height: 12px
              font-size: 0
              .name
                display: inline-block
                margin-right: 6px
                vertical-align: top
                font-size: 10px
                color: rgb(147,157,159)
              .avatar
                border-radius: 50%
            .time
              margin-bottom: 6px
              line-height: 12px
              font-size: 10px
              color: rgb(147,157,159)
            .text
              line-height: 16px
              font-size: 12px
              color: rgb(7,17,27)
              .icon-thumb_up,.icon-thumb_down
                margin-right: 4px
                line-height: 16px
                font-size: 12px
              .icon-thumb_up
                color: rgb(0,160,220)
              .icon-thumb_down
                color: rgb(147,153,159)
          .no-rating
            padding: 16px 0
            font-size: 12px
            color: rgb(147,153,159)
</style>
