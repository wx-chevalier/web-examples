<!-- sttings -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .sttings {
    .my-header {
      padding: $padding;
      background: #fff;
      @include flexbox(space-between, center, row, nowrap);
      border-bottom: 1px solid #eee;
      .back {
        display: block;
        width: .65rem;
        height: .65rem;
        background: url('~jd/images/arrow-left.png') no-repeat;
        background-size: 100%;
      }
      strong {
        font-size: 18px;
        font-weight: normal;
        color: #333;
      }
      .myMsg {
        display: block;
        background: url('~jd/images/searchIcon.png') no-repeat;
        background-size: 600% 100%;
        height: .65rem;
        width: .65rem;
        opacity: 0;
        background-position: -2.6rem 0;
      }
    }
    .userinfo {
      background: #fff;
      border-bottom: 1px solid #eee;
      padding: $padding;
      @include flexbox(space-between, center, row, nowrap);
      .left {
        @include flexbox(flex-start, center, row, nowrap);
        flex: initial;
        .avatar {
          border: 1px solid #eee;
          border-radius: 50%;
          margin-right: $margin;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .info {
          @include flexbox(space-between, flex-start, column, wrap);
          flex: initial;
          .membername {
            font-size: $title;
            color: #333;
            font-weight: normal;
            padding-bottom: 5px;
          }
          .nikename {
            font-size: $smsub;
            color: $gray;
          }
        }
      }
      .right {
        .arrow-right {
          display: block;
          width: 16px;
          height: 20px;
          background: url('~jd/images/arrow-right.png') no-repeat;
          background-size: 100%;
        }
      }
    }
    .cell-container {
      background: #fff;
      margin-top: $margin;
      padding-left: $padding;
      .cell-list {
        .cell-item {
          @include flexbox(space-between,
          center,
          row,
          nowrap);
          border-bottom: 1px solid #eee;
          padding: $padding $padding $padding 0;
          .left {
            span {
              font-size: $title;
              color: #333;
            }
          }
          .right {
            .arrow-right {
              display: block;
              width: 16px;
              height: 20px;
              background: url('~jd/images/arrow-right.png') no-repeat;
              background-size: 100%;
            }
          }
        }
      }
    }
    .loginOutbtn {
      padding: $padding;
      margin-top: $margin;
      background: #fff;
      text-align: center;
      font-size: $title;
    }
  }

</style>

<template>
  <div class="sttings">
    <div class="my-header">
      <i class="back" @click="$router.go(-1)"></i>
      <strong>账户设置</strong>
      <i class="myMsg"></i>
    </div>
    <scroller width="100%" height="100%" style="margin-top:1.2rem">
      <div class="userinfo" v-if="userInfo!=null">
        <div class="left">
          <div class="avatar">
            <img :src="userInfo.photoUrl" alt="">
          </div>
          <div class="info">
            <strong class="membername">{{userInfo.nickName}}</strong>
            <span class="nikename">用户名：{{userInfo.nickName}}</span>
          </div>
        </div>
        <div class="right">
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="cell-container">
        <div class="cell-list">
          <div class="cell-item" @click="$router.push(`/addressList`)">
            <div class="left">
              <span>地址管理</span>
            </div>
            <div class="right">
              <i class="arrow-right"></i>
            </div>
          </div>
          <div class="cell-item">
            <div class="left">
              <span>账号安全</span>
            </div>
            <div class="right">
              <i class="arrow-right"></i>
            </div>
          </div>
          <div class="cell-item">
            <div class="left">
              <span>实名认证</span>
            </div>
            <div class="right">
              <i class="arrow-right"></i>
            </div>
          </div>
          <div class="cell-item">
            <div class="left">
              <span>清除缓存</span>
            </div>
            <div class="right">
              <i class="arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="loginOutbtn" @click="loginOut">退出登录</div>
    </scroller>
  </div>
</template>

<script>
  import {
    getUserInfo
  } from '@/service/getData';
  export default {
    data() {
      return {
        userInfo: null
      };
    },

    watch: {},

    components: {},

    computed: {},

    methods: {
      async loginOut(){
        await this.$store.dispatch('LogOut');
        this.$router.push('/login')
      },
      async getUserInfo() {
        let {
          Data
        } = await getUserInfo();
        this.userInfo = Data;
      }
    },

    mounted: function () {
      this.getUserInfo()
    }
  }

</script>
<style lang='scss' scoped>


</style>
