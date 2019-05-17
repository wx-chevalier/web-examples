<!-- tabContainer -->
<template>
  <div>
    <div class="topnav">
      <span @click.stop.prevent="()=>{active='tab-container1'}" :class="{'active':active==='tab-container1'}">测试1</span>
      <span @click.stop.prevent="()=>{active='tab-container2'}" :class="{'active':active==='tab-container2'}">测试2</span>
      <span @click.stop.prevent="()=>{active='tab-container3'}" :class="{'active':active==='tab-container3'}">测试3</span>
      <div id="loadingbar" :style="active==='tab-container1' ? 'left:0%' : active==='tab-container2' ?  'left:33.33%' : 'left:66.66%'"></div>
    </div>
    <TabContainer v-model="active" :swipeable="true">
      <mt-tab-container-item id="tab-container1">
        <mt-cell :key="index" v-for="(n,index) in 30" title="tab-container 1"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <mt-cell :key="index" v-for="(n,index) in 35" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <mt-cell :key="index" v-for="(n,index) in 37" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
    </TabContainer>
  </div>
</template>

<script>
  import TabContainer from '@/example/swiperTabs';
  import {
    TabContainerItem
  } from 'mint-ui';
  export default {
    data() {
      return {
        active: 'tab-container1',
      };
    },

    watch: {},

    components: {
      TabContainer
    },

    computed: {},

    methods: {},

    mounted: function () {}
  }

</script>
<style lang='scss' scoped>
  .topnav {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    border-bottom: 1px solid #eee;
    position: relative;
    #loadingbar {
      position: absolute;
      transition: .4s;
      width: calc((100%/3));
      background: red;
      bottom: 0;
      height: 2px;
    }
    >span {
      width: 33.33%;
      padding: 15px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      background: #fff;
    }
    .active {
      color: red;
    }
  }

</style>
