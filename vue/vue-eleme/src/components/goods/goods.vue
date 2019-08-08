<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods" :class="{active:currentIndex===index}" @click="scrollTo(index)">
            <span class="text border-1px">
              <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" @click="selectFood(food)" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span class="">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    ￥
                    <span class="now">{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import iscroll from "../../../node_modules/iscroll/build/iscroll-probe"
import bscroll from "better-scroll"
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      foodListHeights: [],
      currentY: 0,
      selectedFood: {},
    };
  },
  created() {
    let _this = this;
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then(function (response) {
      if (response.data.errno === ERR_OK) {
        _this.goods = response.data.data;
      }
      _this.$nextTick(() => {
        _this.initScroll();
        _this.calcHeight();
      })
    }, response => {
      console.log('error,no data');
    });
  },
  watch: {
    selectFoods: function () { }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.foodListHeights.length - 1; i++) {
        let heightBottom = this.foodListHeights[i];
        let heightTop = this.foodListHeights[i + 1];
        //对滑动后currentY值不足的情况进行修正
        let diff = Math.abs(this.currentY - heightTop);
        if (diff < 5) {
          this.currentY = heightTop;
        }
        //判断currentY当前所在的区间
        if (this.currentY < heightTop && this.currentY >= heightBottom) {
          return i;
        }
      }
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        })
      });
      this.$store.commit({
        type: 'changeFoods',
        foodList: foods
      });
    }
  },
  methods: {
    //滚动插件初始化
    initScroll() {
      this.menuScroll = new iscroll(this.$refs.menu, {
        click: true
      });
      this.foodsScroll = new iscroll(this.$refs.foods, {
        probeType: 3,
        click: true
      });
      let _this = this;
      this.foodsScroll.on('scroll', function () {
        _this.currentY = Math.abs(Math.round(this.y));
      });
    },
    //计算每一个foodlist元素的高度，累加并输出为一个数组
    calcHeight() {
      let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
      let height = 0;
      this.foodListHeights.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.foodListHeights.push(height);
      }
    },
    scrollTo(index) {
      let target = this.foodListHeights[index];
      this.foodsScroll.scrollTo(0, -target, 300);
    },
    selectFood(food) {
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 175px
    bottom: 48px
    width: 100%
    overflow: hidden
    .menu-wrapper
      touch-action: none
      position: relative
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        padding: 0 12px
        font-size: 0
        color: rgb(20,20,20)
        &:last-child > .text
          border-none()
        &.active
          position: relative
          margin-top: -1px
          background: #fff
          z-index: 10
          .text
            border-none()
            font-weight: 700
        .text
          display: table-cell
          vertical-align: middle
          line-height: 14px
          width: 56px
          font-size: 12px
          border-1px(rgba(7,17,27,0.2))
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-top: 1px
            margin-right: 2px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.discount
              bg-image("discount_3")
            &.decrease
              bg-image("decrease_3")
            &.guarantee
              bg-image("guarantee_3")
            &.invoice
              bg-image("invoice_3")
            &.special
              bg-image("special_3")
        .title
          font-size: 10px
    .foods-wrapper
      touch-action: none
      position: relative
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        border-left: 2px solid #d0dde1
        line-height: 26px
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        padding-bottom: 16px
        margin: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .description, .extra
            line-height: 12px
            font-size: 10px
            color: rgb(147,153,159)
          .description
            margin-bottom: 8px
          .extra
            .count
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
            right: 0
            bottom: 12px
</style>
