<!-- searchRusult -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .scrollbtm {
    background: #ffffff !important;
    .scanCode {
      .searchQrcodeIcon {
        background-position: -1.933rem 0 !important;
      }
      color: #333 !important;
    }
    .searchInput {
      .search-box {
        background: #e2e2e2 !important;
        span {
          color: #ffffff !important;
        }
      }
      .searchContentIcon {
        background-position: -2.24rem 0 !important;
      }
    }
    .searchMsg {
      .searchMsgIcon {
        background-position: -2.6rem 0 !important;
      }
      color: #333 !important;
    }
  }

  .searchRusult {
    position: fixed;
    top: 0;
    width: 10rem;
    max-width: 10rem;
    margin: 0 auto;
    z-index: 10000;
    transition: .6s;
    @include flexbox(space-between, center, row, nowrap);
    min-height: 40px;
    padding: .1rem .1rem;
    background: transparent;
    .searchIcon {
      display: block;
      background: url('~jd/images/searchIcon.png') no-repeat;
      background-size: 600% 100%;
    }
    .searchInput {
      width: 100%;
      .search-box {
        background: #fff;
        height: .8rem;
        border-radius: .8rem;
        @include flexbox(flex-start,
        center,
        row,
        nowrap);
        padding: 0 .3rem;
        .searchContentIcon {
          height: .45rem;
          width: .45rem;
          margin-right: .3rem;
          background-position: -0.46rem 0;
        }
        span {
          color: #999;
          font-size: 14px;
        }
      }
    }
    .scanCode {
      min-width: 1rem;
      @include flexbox(center,
      center,
      column,
      wrap);
      color: #fff;
      font-size: 12px;
      span {
        padding-top: 2px;
      }
      .searchQrcodeIcon {
        width: .65rem;
        height: .65rem;
        background-position: 0 0;
      }
    }
    .searchMsg {
      min-width: 1rem;
      @include flexbox(center,
      center,
      column,
      wrap);
      color: #fff;
      font-size: 12px;
      span {
        padding-top: 2px;
      }
      .searchMsgIcon {
        height: .65rem;
        min-width: .65rem;
        background-position: -1.3rem 0;
      }
    }
  }

  .searchContainer {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    background: #f8f8f8;
    .search-top {
      @include flexbox(space-between,
      center,
      row,
      nowrap);
      padding: 10px 0 10px 20px;
      background: #fff;
      border-bottom: 1px solid $border;
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
          .clear {
            width: .42rem;
            height: .42rem;
            margin: 0;
            position: absolute;
            right: 10px;
            padding: 5px;
            @include flexbox(center,
            center,
            row,
            nowrap);
            color: #fff;
            font-size: 15px;
            border-radius: 50%;
            background: rgba(0, 0, 0, .15);
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
    .search-hot {
      padding: $padding;
      background: #fff;
      >p {
        font-size: $title;
        font-weight: bold;
        color: #333;
        text-align: left;
      }
      .search-hot-list {
        @include flexbox(flex-start,
        center,
        row,
        nowrap);
        padding: $padding 0 0;
        .search-hot-item {
          width: 2.5rem;
          background: #f5f5f5;
          border-radius: 10px;
          color: #333;
          padding: 5px 0;
          font-size: $subtitle;
          text-align: center;
        }
      }
    }
    .search-history {
      margin-top: $margin;
      background: #fff;
      >p {
        font-size: $title;
        padding: $padding;
        font-weight: bold;
        color: #333;
        text-align: left;
        border-bottom: 1px solid $border;
      }
      .clear-history {
        width: 5rem;
        padding: $padding 0;
        margin: $margin auto;
        border: 1px solid $border;
        border-radius: 2px;
        font-size: $subtitle;
        color: $gray;
        @include flexbox(center,
        center,
        row,
        nowrap);
      }
      .search-history-list {
        @include flexbox(flex-start,
        center,
        column,
        wrap);
        .search-history-item {
          width: 100%;
          text-align: left;
          padding: $padding;
          color: $gray;
          font-size: $subtitle;
          border-bottom: 1px solid $border;
        }
      }
    }
    .search-rusult-content {
      .search-rusult-goods {
        @include flexbox(flex-start,
        center,
        row,
        nowrap);
        padding: $padding;
        span {
          font-size: $subtitle;
          margin-left: 5px;
          color: $gray;
        }
        i {
          display: block;
          width: 17px;
          height: 16px;
          background: url('~jd/images/store.png') no-repeat;
          background-size: 100%;
        }
      }
      .search-rusult-list {
        @include flexbox(flex-start,
        center,
        column,
        wrap);
        .search-rusult-item {
          width: 100%;
          text-align: left;
          padding: $padding;
          color: $gray;
          font-size: $subtitle;
          border-bottom: 1px solid $border;
          p {
            @include textoverflow(1)
          }
        }
      }
    }
  }

</style>
<template>
  <div style="position:relative;">
    <div class="searchRusult" :class="Status?'scrollbtm':''" v-if="!searchVisiblie">
      <slot name="left-icon">
        <div class="scanCode">
          <i class="searchIcon searchQrcodeIcon"></i>
          <span>扫一扫</span>
        </div>
      </slot>
      <div class="searchInput" @click="()=>searchVisiblie=true">
        <slot name="title-icon">
          <div class="search-box">
            <i class="searchIcon searchContentIcon"></i>
            <span>MacBook Pro 15.4寸</span>
          </div>
        </slot>
      </div>
      <slot name="right-icon">
        <div class="searchMsg">
          <i class="searchIcon searchMsgIcon"></i>
          <span>消息</span>
        </div>
      </slot>
    </div>
    <mt-popup v-model="searchVisiblie" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
      <div class="searchContainer">
        <div class="search-top">
          <div class="searchInput" @click="$refs.searchInput.focus()">
            <div class="search-box">
              <i class="searchIcon searchContentIcon"></i>
              <input v-model="Keyword" placeholder="MacBook Pro 15.4寸" ref="searchInput" v-searchFocus></input>
              <span class="clear" @click="Keyword=''" v-show="Keyword.length>0">&times;</span>
            </div>
          </div>
          <span @click="()=>{Keyword='';searchVisiblie=false}">取消</span>
        </div>
        <load-more v-show="Keyword.length<=0" style="width:100%;height:100%;background:#fff;" >
          <div class="search-hot">
            <p>热搜</p>
            <ul class="search-hot-list">
              <li class="search-hot-item">智能手表</li>
            </ul>
          </div>
          <div class="search-history">
            <p>历史搜索</p>
            <ul class="search-history-list">
              <li class="search-history-item" @click="()=>Keyword = item.keywords" v-for="(item,index) in searchHistoryData" :key="index">{{item.keywords}}</li>
            </ul>
            <div class="clear-history">
              <i></i>
              <span>清空历史搜索</span>
            </div>
          </div>
        </load-more>
        <div class="search-rusult-content" v-show="Keyword.length>0">
          <load-more style="background:#fff;width: 100%;height: 100%;">
            <div class="search-rusult-goods">
              <i></i>
              <span>搜素 {{Keyword}}...</span>
            </div>
            <ul class="search-rusult-list" v-if="searchRusultData!=''">
              <li class="search-rusult-item" v-for="(item,index) in searchRusultData" :key="index" @click="selectedProd(item)">
                <p>{{item.productName}}</p>
              </li>
            </ul>
            <p style="text-align:center;text-align: left;padding: 10px;color: #81838e;font-size: 13px;border-bottom: 1px solid #e1e1e1;"
              v-else>暂无数据...</p>
          </load-more>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {
    searchGoods
  } from '@/service/getData'
  import {
    getLocalStorage,
    setLocalStorage
  } from '@/utils/mixin'
  import LoadMore from 'common/loadMore';
  export default {
    data() {
      return {
        searchVisiblie: false,
        Keyword: '',
        searchHistoryData: [],
        searchRusultData: []
      };
    },
    props: {
      Status: {
        type: Boolean,
        required: true
      }
    },
    watch: {
      Keyword(val) {
        this.searchRusult(val)
      }
    },
    directives: {
      searchFocus: {
        inserted: function (el) {
          // 聚焦元素
          el.focus();
        },
        update: function (el) {
          // 聚焦元素
          el.focus();
        }
      }
    },
    components: {
      LoadMore
    },

    computed: {},

    methods: {
      async searchRusult(keyWords) {
        this.searchRusultData = [];
        let {
          Data
        } = await searchGoods({
          Keyword: keyWords,
          pageSize: 100,
          pageIndex: 1
        });
        this.searchRusultData = Data;
      },
      async selectedProd(prod) {
        this.$router.push({path: '/searchRusult',query: {Keyword:this.Keyword}})
        let HistoryData = getLocalStorage('searchHistoryData');
        if(!HistoryData)return setLocalStorage('searchHistoryData',[{keywords:this.Keyword,Date:new Date()}]);
        try{
          let Data = JSON.parse(HistoryData);
          Data.push({keywords:this.Keyword,Date:new Date()});
          setLocalStorage('searchHistoryData',Data);
        }catch(err){}
      }
    },

    mounted: function () {
      try{
        this.searchHistoryData = JSON.parse(getLocalStorage('searchHistoryData'));
      }catch(err){}
    }
  }

</script>
