<!-- searchRusult -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .search-rusult-container {
    height: 100%;
    .search-top {
      @include flexbox(space-between,
      center,
      row,
      nowrap);
      padding: 10px 20px;
      background: #fff;
      border-bottom: 1px solid #eee;
      .back-icon{
        width: 23px;
        height: 23px;
        background: url('~jd/images/arrow-left.png') no-repeat;
        background-size: 100%;
      }
      .searchInput {
        width: 90%;
        .search-box {
          width: 100%;
          position: relative;
          background: #f4f4f4;
          padding: 5px 10px;
          border-radius: 10px;
          @include flexbox(space-between,
          center,
          row,
          nowrap);
          input {
            width: 100%;
            color: #333;
            font-size: $subtitle;
            outline: none;
            border: none;
            box-shadow: none;
            text-shadow: none;
            font-weight: normal;
            background: transparent;
          }
          .searchIcon {
            display: block;
            height: .38rem;
            margin-right: .05rem;
            width: .4rem;
            background: url('~jd/images/searchIcon.png') no-repeat;
            background-size: 600% 100%;
            background-position: -0.34rem 0;
          }
        }
      }
      >span {
        text-align: center;
        font-size: 15px;
        min-width: 1.5rem;
        color: $gray;
      }
    }
    .search-filter{
      // border-top: 1px solid $border;
      border-bottom: 1px solid #eee;
      .search-filter-list{
        background: #fff;
        @include flexbox(space-between,center,row,nowrap);
        .search-filter-item{
          width: 25%;
          @include flexbox(center,center,row,nowrap);
          color: #333;
          font-size: 15px;
          padding: 12px 0;
          &.active{
            color: $red;
          }
          &.more-sort{
            position: relative;
            &:after{
              content:'';
              position: absolute;
              right: .5rem;
              top: 44%;
              width: 0;
              height: 0;
              border: 5px solid transparent;
              border-top-color: $red;
            }
          }
        }
      }
    }
    .content{
      width: 100%;
      .product-list{
        @include flexbox(flex-start,center,column,wrap);
        .prod-item{
          background: #fff;
          @include flexbox(space-between,flex-start,row,nowrap);
          padding: 5px 0px 0px 5px;
          flex: initial;
          img{
            width: 125px;
            height: 125px;
          }
          .prod-info{
            margin-left: 10px;
            padding-right: 5px;
            border-bottom: 1px solid #eee;
            @include flexbox(space-between,flex-start,column,wrap);
            .prod-title{
              font-size: $title;
              color: #333;
              @include textoverflow(2);
            }
            .prod-price{
              color: $red;
              margin-top: 50px;
              text-align:left;
              span{
                font-size: $smsub;
                margin-right: 5px;
              }
              strong{
                font-size: 19px;
              }
            }
            .prod-pro{
              padding: 5px 0;
              text-align: left;
              color: $gray;
              font-size: $subtitle;
            }
          }
        }
      }
    }
  }

</style>

<template>
  <div class="search-rusult-container">
    <!-- 搜索框 -->
    <div class="search-top">
      <i class="back-icon" @click="$router.go(-1)"></i>
      <div class="searchInput">
        <div class="search-box">
          <i class="searchIcon searchContentIcon"></i>
          <input :placeholder="searchParams.Keyword" v-model="searchParams.Keyword"></input>
        </div>
      </div>
    </div>
    <!-- 搜索框 -->
    
    <!-- 筛选 -->
    <div class="search-filter">
      <ul class="search-filter-list">
        <li class="search-filter-item active more-sort">综合</li>
        <li class="search-filter-item">销量</li>
        <li class="search-filter-item">价格</li>
        <li class="search-filter-item">筛选</li>
      </ul>
    </div>
    <!-- 筛选 -->

    <!-- 搜索内容 -->
    <div class="content">
      <load-more style="width:100%;" @loadMore="infiniteCallback" :commad="commad" :param="searchParams"
          ref="searchRusultloadMore">
        <ul class="product-list" >
          <li class="prod-item" v-for="(item,index) in searchRusultData" :key="index" @click="()=>$router.push('/product/'+item.productNo)">
            <img :src="item.image_url[0].url" alt="">
            <div class="prod-info">
              <p class="prod-title">{{item.productName}}</p>
              <p class="prod-price"><span>&yen;</span><strong>{{item.price}}</strong></p>
              <p class="prod-pro">999条评价</p>
            </div>
          </li>
        </ul>
      </load-more>
    </div>
    <!-- 搜索内容 -->
  <BackHead/>
  </div>
</template>

<script>
  import BackHead from 'common/backHead';
  import LoadMore  from 'common/loadMore';
  import {
    searchGoods
  } from '@/service/getData'
  export default {
    data() {
      return {
        searchRusultData: [],
        commad: searchGoods,
        searchParams: {
          Keyword: '',
          pageSize: 10,
          pageIndex: 1
        }
      };
    },

    watch: {
      'searchParams.Keyword': function(val){
        this.searchRusult()
      }
    },

    components: {
      BackHead,
      LoadMore
    },

    computed: {},

    methods: {
      async searchRusult() {
        this.searchParams.pageSize = 10;
        this.searchParams.pageIndex = 1;
        this.searchParams = JSON.parse(JSON.stringify(Object.assign(this.searchParams,this.$route.query)))
        this.$refs.searchRusultloadMore.onloadMoreScroll();
      },
      async infiniteCallback(response) { //下拉加载
        if (response.Data.length > 0) {
          response.Data.map(i => {
            this.searchRusultData.push(i)
          })
        }
      },
    },

    mounted: function () {
      this.searchParams = JSON.parse(JSON.stringify(Object.assign(this.searchParams,this.$route.query)))
      this.$refs.searchRusultloadMore.onloadMoreScroll();
    }
  }

</script>