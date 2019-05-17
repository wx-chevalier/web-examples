<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{active:totalCount>0}">
              <i class="icon-shopping_cart" :class="{active:totalCount>0}"></i>
            </div>
            <div v-show="totalCount>0" class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{active:totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="description">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div @click="pay" class="pay" :class="{active:payClass}">{{payDescription}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="emptyCart">清空</span>
          </div>
          <div class="list-content" ref="list-content">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div v-show="listShow" class="list-mask" @click="toggleList"></div>
    </transition>
  </div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import iscroll from 'iscroll'

export default {
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
      ],
      dropBalls: [],
      show: false
    };
  },
  created() {
    this.$root.$on('add_cart', this.drop);
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
  },
  computed: {
    totalPrice() {
      let price = 0;
      this.selectFoods.forEach(food => {
        price += food.count * food.price;
      });
      return price;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDescription() {
      if (this.totalPrice === 0) {
        return '￥' + this.minPrice + '元起送';
      } else if (this.totalPrice < this.minPrice) {
        let diffence = this.minPrice - this.totalPrice;
        return `还差${diffence}元起送`;
      } else {
        return `去结算`
      }
    },
    payClass() {
      if (this.totalPrice >= this.minPrice)
        return true;
      return false;
    },
    listShow() {
      if (!this.totalCount) {
        this.show = true;
        return false;
      }
      let show = !this.show;
      if (show) {
        this.$nextTick(function () {
          if (!this.scroll) {
            this.scroll = new iscroll(this.$refs['list-content'],{
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    drop() {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = this.$store.state.ballEle;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (ball.show) {
          console.log(ball);
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 22;
          let y = -(window.innerHeight - rect.top - 48)
          el.style.display = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el) {
      //触发浏览器重绘
      let rf = el.offsetHeight;

      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0,0,0)`;
        el.style.transform = `translate3d(0,0,0)`;
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = `translate3d(0,0,0)`;
        inner.style.transform = `translate3d(0,0,0)`;
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none'
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.show = !this.show;
    },
    emptyCart() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      alert('支付功能还在开发中。。。');
    }
  },
  components: {
    cartcontrol
  }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      height: 48px
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 8px
            font-weight: 700
            color: #fff
            background: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.active
              background: rgb(0,160,220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.active
                color: #fff
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          &.active
            color: #fff
        .description
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 26px
          color: rgba(255,255,255,0.4)
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          line-height: 48px
          height: 48px
          text-align: center
          font-size: 12px
          color: rgba(255,255,255,0.4)
          font-weight: 700
          background: #2b333b
          &.active
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        bottom: 22px
        left: 32px
        z-index: 150
        transition: all 0.4s cubic-bezier(.34,-0.56,.73,.62)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0,160,220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transition: all 0.5s
      transform: translate3d(0,-100%,0)
      &.fold-enter,&.fold-leave-active
        transform: translate3d(0,0,0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        background: #f3f5f7
        .title
          float: left
          font-size: 14px
          color: rgb(7,17,27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0,160,220)
      .list-content
        touch-action: none
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height: 24px
            font-size: 12px
            color: rgb(7,17,27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240,20,20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    blur: 10px
    transition: all 0.5s
    opacity: 1
    background: rgba(7,17,27,0.6)
    &.fade-enter,&.fade-leave-active
      opacity: 0
      background: rgba(7,17,27,0)
</style>
