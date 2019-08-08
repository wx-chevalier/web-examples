<template>
  <div class="cartcontrol">
    <transition name="move">
      <div v-show="food.count>0" class="decrease" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
      <div v-show="food.count>0" class="count">{{food.count}}</div>
    <div class="add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>
<script>

export default {
  props: {
    food: {
      type: Object,
    }
  },
  data() {
    return {
    };
  },
  methods: {
    addCart(event) {
      // if (!event._constructed) {
      //   return;
      // }
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$store.commit({
        type: 'initBallEle',
        el: event.target
      })
      this.$root.$emit('add_cart');
    },
    decreaseCart(event) {
      // if (!event._constructed) {
      //   return;
      // }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .cartcontrol
    font-size: 0
    .decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0,160,220)
        transition: all 0.5s linear
      //只需写进入时的状态和离开完成后的状态
      &.move-enter,&.move-leave-active
        opacity: 0
        transform: translate3d(24px,0,0)
        .inner
          transform: rotate(180deg)
    .count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
    .add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0,160,220)
</style>
