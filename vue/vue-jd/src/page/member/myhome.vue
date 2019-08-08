<!-- myhome -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .content {
    padding-bottom: 1.35rem;
    min-height: 100vh;
  }

  .my-header {
    height: 3rem;
    padding: 10px 15px;
    background: -webkit-linear-gradient(left, #eb3c3c, #ff7459);
    background: linear-gradient(90deg, #eb3c3c, #ff7459);
    box-shadow: 0 2px 5px rgba(255, 98, 98, .4);
    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: 0px;
      width: 100%;
      background: -webkit-linear-gradient(left, #eb3c3c, #ff7459);
      background: linear-gradient(90deg, #eb3c3c, #ff7459);
      height: 1rem;
      border-radius: 50%;
    }
    @include flexbox(flex-start, space-between, column, wrap);
    .my-settings {
      width: 100%;
      text-align: right;
      >div {
        @include flexbox(flex-end, center, row, nowrap);
        i {
          width: .65rem;
          height: .65rem;
        }
        .settings {
          display: block;
          background: url('~jd/images/settings.png') no-repeat;
          background-size: 100%; // background-position: -2.6rem 0!important;
        }
        .msg-icon {
          display: block;
          margin-left: 20px;
          background: url('~jd/images/searchIcon.png') no-repeat;
          background-size: 600% 100%;
          background-position: -1.3rem 0 !important;
        }
      }
    }
    .userinfo {
      @include flexbox(flex-start,
      flex-start,
      row,
      nowrap);
      .avatar {
        img {
          border: 1px solid hsla(0, 0%, 100%, .4);
          border-radius: 60px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
          width: 60px;
          height: 60px;
        }
      }
      .info-box {
        @include flexbox(center,
        flex-start,
        column,
        wrap);
        flex: initial;
        padding: 0 15px;
        color: #fff;
        font-size: 16px;
        .my-validWalletAmount {
          margin: 5px 0;
        }
        .username {
          margin-top: 10px;
        }
      }
    }
  }

  .my-order {
    clear: both;
    background: #fff;
    padding: 40px 0 20px;
    @include flexbox(center,
    center,
    row,
    nowrap);
    .order-item {
      width: 20%;
      @include flexbox(space-between,
      center,
      column,
      wrap);
      img {
        height: 35px;
      }
      span {
        margin: 10px 0 0;
        font-size: 13px;
        color: #333;
      }
      &.myorder {
        position: relative;
        border-left: 1px solid #eee;
        &:before {
          content: '';
          position: absolute;
          left: -2px;
          z-index: 999;
          top: calc(100%/2 - 10px);
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-left-color: #fff;
        }
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: calc(100%/2 - 10px);
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-left-color: #eee;
        }
      }
    }
  }

  .my-attention {
    clear: both;
    background: #fff;
    margin-top: 10px;
    padding: 10px 0;
    @include flexbox(center,
    center,
    row,
    nowrap);
    .attention-item {
      width: 25%;
      @include flexbox(space-between,
      center,
      column,
      wrap);
      strong {
        text-align: center;
        font-size: 16px;
        font-weight: normal;
        background-image: -webkit-linear-gradient(left, rgb(255, 42, 0), rgb(255, 0, 175));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      span {
        margin: 10px 0;
        font-size: 14px;
        color: #333;
        text-align: center;
      }
    }
  }

  /* 为您推荐 */

  .my-recommend {
    clear: both;
    margin-top: 10px;
    .recommend-tip {
      text-align: center;
      margin: 0 0 10px;
      img {
        height: 35px;
      }
    }
    .recommend-list {
      background: #fff;
      @include flexbox(flex-start,
      center,
      row,
      wrap);
      overflow: hidden;
      clear: both;
      .recommend-item {
        background: #fff;
        width: 4.935rem;
        margin-bottom: .15rem;
        .item-posre {
          img {
            max-height: 185px;
            width: 100%;
          }
        }
        .item-product-text {
          padding: .1rem 0 0 .1rem;
          font-size: 14px;
          @include textoverflow(2);
        }
        .item-product-info {
          color: #f23030;
          padding: .2rem .1rem;
          font-size: 16px;
          span {
            font-size: 12px;
            margin-right: .1rem;
          }
        }
        .item-product-praise {
          padding: 0 0 .2rem .1rem;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  /* 为您推荐 */
</style>

<template>
  <div>
    <div class="content">
      <load-more @translate-change="translateChange" style="width:100%;" @loadMore="infiniteCallback" :commad="commad" :param="recommendParam" :topMethod="onRefreshCallback"
        :loadMoreIconVisible="false" ref="recommendLoadmore">
        <span style="-webkit-transform: scale(.9)!important;transform: scale(.9)!important;position:  absolute;top: 45%;left: 45%;font-size:  12px;font-weight: normal;text-shadow:  none;box-shadow:  none;"
          slot="refresh-spinner">更新中...</span>
        <div class="my-header">
          <div class="my-settings">
            <div>
              <i class="settings" @click="$router.push('/sttings')"></i>
              <i class="msg-icon"></i>
            </div>
          </div>
          <div class="userinfo" @click.stop.prevent="$router.push(!userInfo ? `/login` : `/sttings`)">
            <div class="avatar">
              <img :src="!userInfo || !userData.userInfo? 'https://static.hdslb.com/images/akari.jpg' : userData.userInfo.photoUrl" alt="">
            </div>
            <div class="info-box">
              <span class="username" >{{!userInfo || !userData.userInfo? '登录/注册 >' : userData.userInfo.nickName}}</span>
              <div class="my-validWalletAmount" v-if="userInfo && userData.userInfo">我的余额：{{userData.userInfo.validWalletAmount}}元</div>
            </div>
          </div>
        </div>
        <div class="my-order">
          <div class="order-item" @click.stop.prevent="!handlerEvent ? $router.push('/orderList/1'):false">
            <img src="~jd/images/paymenticon.png" alt="">
            <span>待付款</span>
          </div>
          <div class="order-item" @click.stop.prevent="!handlerEvent ? $router.push('/orderList/2'):false">
            <img src="~jd/images/received.png" alt="">
            <span>待收货</span>
          </div>
          <div class="order-item" @click.stop.prevent="!handlerEvent ? $router.push('/orderList/0'):false">
            <img src="~jd/images/evaluated.png" alt="">
            <span>待评价</span>
          </div>
          <div class="order-item">
            <img src="~jd/images/Aftermarket.png" alt="">
            <span>退换/售后</span>
          </div>
          <div class="order-item myorder" @click.stop.prevent="!handlerEvent ? $router.push('/orderList/0'):false">
            <img src="~jd/images/myordericon.png" alt="">
            <span>我的订单</span>
          </div>
        </div>
        <div class="my-attention">
          <div class="attention-item">
            <strong>0</strong>
            <span>商品关注</span>
          </div>
          <div class="attention-item">
            <strong>0</strong>
            <span>商品关注</span>
          </div>
          <div class="attention-item">
            <strong>0</strong>
            <span>商品关注</span>
          </div>
          <div class="attention-item">
            <strong>0</strong>
            <span>商品关注</span>
          </div>
        </div>
        <div class="my-recommend">
          <div class="recommend-tip">
            <img src="~jd/images/tuijian.png" alt="">
          </div>
          <ul class="recommend-list">
            <li class="recommend-item" v-for="(item,index) in cmsData.recommendData" :key="index">
              <div class="item-posre">
                <img :src="item.image_url[0].url" alt="">
              </div>
              <p class="item-product-text">{{item.productName}}位</p>
              <p class="item-product-info">
                <span>&yen;</span>{{item.price}}</p>
              <p class="item-product-praise">好评率100%</p>
            </li>
          </ul>
        </div>
      </load-more>
    </div>
    <FooterView/>
    <BackHead/>
  </div>
</template>

<script>
  import FooterView from 'component/footer/footerView';
  import LoadMore from 'common/loadMore';
  import BackHead from 'common/backHead';
  import {
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage
  } from '@/utils/mixin';
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  import {
    getRecommend,
  } from '@/service/getData';
  export default {
    data() {
      return {
        userData: {
          userInfo: null
        },
        handlerEvent: false,
        commad: getRecommend,
        recommendParam: {
          Type: 'recommend',
          pageSize: 10,
          pageIndex: 1
        },
        cmsData: {
          recommendData: []
        }
      };
    },

    watch: {},

    components: {
      FooterView,
      LoadMore,
      BackHead
    },

    computed: {
      ...mapGetters([
        'userInfo',
      ])
    },

    methods: {
      ...mapMutations([
        'SET_USERINFO_DATA'
      ]),
      async onRefreshCallback() {
        let token = getSessionStorage('MemberToken')
        if (!token) return this.$refs.recommendLoadmore.onTopLoaded(this.$refs.recommendLoadmore.uuid);
        this.recommendParam.pageSize = 10;
        this.recommendParam.pageIndex = 1;
        this.cmsData.recommendData = [];
        let res = await this.$store.dispatch('GetUserInfo');
        this.userData.userInfo = res.Data;
        this.$refs.recommendLoadmore.onTopLoaded(this.$refs.recommendLoadmore.uuid);
      },
      async infiniteCallback(response) { //下拉加载推荐商品
        if (response.Data.length > 0) {
          response.Data.map(i => {
            this.cmsData.recommendData.push(i)
          })
        }
      },
      translateChange(y){ //监听下拉的阈值
        this.handlerEvent = y>8 ? true : false;
      },
      async initData() {
        if (!this.userInfo) {
          let token = getSessionStorage('MemberToken')
          if (!token) return;
          let res = await this.$store.dispatch('GetUserInfo');
          await this.SET_USERINFO_DATA(res.Data);
          this.userData.userInfo = res.Data;
        } else {
          this.userData.userInfo = this.userInfo;
        }
      }
    },
    mounted: function () {
      // this.$refs.scrollView.triggerPullToRefresh();
      this.initData();
    }
  }
</script>
<style lang='scss' scoped>
</style>