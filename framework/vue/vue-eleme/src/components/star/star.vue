<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data() {
    return {
    };
  },
  computed: {
    starType() {
      return 'star_' + this.size
    },
    itemClasses() {
      let itemClasses = [];
      let score = Math.floor(this.score*2)/2;
      for (let i = 1; i <= score; i++) {
        itemClasses.push('on');
        // for(let i = 0; i < 5-this.score; i++){
        //   itemClasses.push('off')
        // }
      }
      if (score % 1 != 0) {
        itemClasses.push('half');
      }
      while (itemClasses.length < 5) {
        itemClasses.push('off');
      }
      return itemClasses;
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star_48
      .star-item
        margin-right: 22px
        width: 20px
        height: 20px
        background-size: 20px 20px
        &.on
          bg-image('star48_on')
        &.off
          bg-image('star48_off')
        &.half
          bg-image('star48_half')
        &:last-child
          margin: 0
    &.star_36
      .star-item
        margin-right: 6px
        width: 15px
        height: 15px
        background-size: 15px 15px
        &.on
          bg-image('star36_on')
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
        &:last-child
          margin: 0
    &.star_24
      .star-item
        margin-right: 3px
        width: 10px
        height: 10px
        background-size: 10px 10px
        &.on
          bg-image('star24_on')
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')
        &:last-child
          margin: 0
</style>
