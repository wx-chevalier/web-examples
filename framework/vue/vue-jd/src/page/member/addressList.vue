<!-- addressList -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .addressList {
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
    .addNewAddressbtn {
      position: fixed;
      bottom: .2rem;
      width: 90%;
      text-align: center;
      padding: $padding 0;
      background: $red;
      font-size: $title;
      color: #fff;
      margin: 0 .5rem;
      border-radius: 2px;
    }
    .address-container {
      .address-item {
        @include flexbox(space-between,
        flex-start,
        column,
        wrap);
        background: #fff;
        padding-left: $padding;
        >p {
          width: 100%;
        }
        .name {
          font-size: $title;
          color: #333;
          padding: $padding 0;
          @include textoverflow(1);
        }
        .address {
          font-size: $smsub;
          color: $gray;
          padding: 0 0 30px;
          @include textoverflow(2);
          border-bottom: 1px solid #eee;
        }
        .address-status {
          width: 100%;
          @include flexbox(space-between,
          center,
          row,
          nowrap);
          padding: $padding 0;
          .left {
            @include flexbox(flex-start,
            center,
            row,
            nowrap);
            flex: initial;
            font-size: $subtitle;
            letter-spacing: 1px;
            color: $gray;
            i {
              vertical-align: middle;
              margin-right: $margin;
            }
          }
          .right {
            @include flexbox(space-between,
            center,
            row,
            nowrap); // width: 4rem;
            flex: initial;
            font-size: $subtitle;
            color: $gray;
            letter-spacing: 1px;
            >div {
              margin-right: 10px;
              @include flexbox(space-between,
              center,
              row,
              nowrap);
              i {
                margin-right: 5px;
              }
            }
            .edit {
              .edit-address-icon {
                display: block;
                @include wh(16px,
                16px);
                @include bg('~jd/images/edit.png');
              }
            }
            .delect {
              .delect-address-icon {
                display: block;
                @include wh(16px,
                16px);
                @include bg('~jd/images/edit.png');
              }
            }
          }
        }
      }
    }
  }

</style>
<template>
  <div class="addressList">
    <div class="my-header">
      <i class="back" @click="$router.go(-1)"></i>
      <strong>地址管理</strong>
      <i class="myMsg"></i>
    </div>
    <load-more style="width:100%;" @loadMore="infiniteCallback" :commad="commad" :param="params" :topMethod="onRefreshCallback"
      :loadMoreIconVisible="false" ref="recommendLoadmore">
      <div class="address-container" v-if="addressList!=''">
        <div class="address-item" v-for="(item,index) in addressList" :key="index">
          <p class="name">{{item.nickName}} {{item.Phone}}</p>
          <p class="address">{{item.Province + item.City + item.Area}} &nbsp;&nbsp;{{item.Address}}</p>
          <div class="address-status">
            <div class="left">
              <i :class="['select-default-icon', item.Selected === 1 ? 'select-icon' :'']"></i>
              <span>默认地址</span>
            </div>
            <div class="right">
              <div class="edit" @click="$router.push(`/address/${item._id}`)">
                <i class="edit-address-icon"></i>
                <span>编辑</span>
              </div>
              <div class="delect" @click="deleteAddress(item)">
                <i class="delect-address-icon"></i>
                <span>删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </load-more>
    <div class="addNewAddressbtn" @click="$router.push('/address')">+&nbsp;新建地址</div>
  </div>
</template>

<script>
  import {
    getAddressList
  } from '@/service/getData';
  import LoadMore from 'common/loadMore';
  export default {
    data() {
      return {
        addressList: [],
        params: {
          pageSize: 10,
          pageIndex: 1
        },
        commad: getAddressList
      };
    },

    watch: {},

    components: {
      LoadMore
    },

    computed: {},

    methods: {
      async deleteAddress(item) {
        this.$store.dispatch('RemoveAddress', {
          Id: item._id
        }).then(response => {
          this.onRefreshCallback();
          Toast({
            message: response.message
          })
        })
      },
      async onRefreshCallback() {
        this.params.pageSize = 10;
        this.params.pageIndex = 1;
        this.addressList = [];
        this.$refs.recommendLoadmore.onTopLoaded(this.$refs.recommendLoadmore.uuid);
      },
      async infiniteCallback(response) { //下拉加载
        if (response.Data.length > 0) {
          response.Data.map(i => {
            this.addressList.push(i)
          })
        }
      }
    },

    mounted: function () {}
  }

</script>
<style lang="scss" scoped>


</style>
