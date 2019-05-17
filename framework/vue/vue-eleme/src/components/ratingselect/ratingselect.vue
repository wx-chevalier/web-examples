<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click.stop.prevent="select(2)" class="block positive" :class="{active:selectType===2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span @click.stop.prevent="select(0)" class="block positive" :class="{active:selectType===0}">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span @click.stop.prevent="select(1)" class="block negative" :class="{active:selectType===1}">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{on:onlyContent}" @click.stop.prevent="toggleSwitch">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    select(type) {
      this.$emit('typeChange',type);
    },
    toggleSwitch() {
      this.$emit('onlyContentChange');
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      font-size: 0
      border-1px(rgba(7,17,27,0.1))
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        line-height: 16px
        font-size: 12px
        color: rgb(77,85,93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 10px
        &.positive
          background: rgba(0,160,220,0.2)
          &.active
            background: rgb(0,160,220)
        &.negative
          background: rgba(77,85,93,0.2)
          &.active
            background: rgba(77,85,93,0.5)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      color: rgb(147,153,159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        margin-right: 4px
        vertical-align: top
        font-size: 24px
      .text
        font-size: 10px
</style>
