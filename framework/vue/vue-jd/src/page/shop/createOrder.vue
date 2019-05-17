<!-- createdOrder -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .pagePay {
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
    .payContainer {
      .addressContainer {
        background: #fff;
        .addressDefault {
          padding: $padding;
          background: url('~jd/images/addressbg.png') repeat-x bottom;
          background-size: 64px 5px;
          position: relative;
        }
        .arrow-right {
          display: block;
          position: absolute;
          right: 10px;
          margin-top: -1.1rem;
          width: .45rem;
          height: .45rem;
          background: url('~jd/images/arrow-right.png') no-repeat;
          background-size: 100%;
        }
        .cell {
          strong {
            font-size: 16px;
          }
          font-size: 14px;
          padding: 5px 0;
        }
        .defaultIcon {
          color: $red;
          border: 1px solid $red;
          border-radius: 5px;
          padding: 0px 3px;
        }
        .positionIcon {
          display: inline-block;
          background: url('~jd/images/product-detail-sprites-mjs.png') no-repeat;
          width: 25px;
          height: 25px;
          background-position: -17px 2px;
          background-size: 150px;
          vertical-align: -8px;
        }
      }
      .venderOrderList {
        margin-top: $margin;
        .venderItem {
          padding: $padding;
          border-bottom: 1px solid #eee;
          background: #fff;
          @include flexbox(flex-start,
          center,
          row,
          nowrap);
          img {
            max-width: 1.6rem;
            max-height: 1.6rem;
            margin: 10px;
            padding-right: 10px;
          }
          .orderInfo {
            @include flexbox(space-between,
            flex-start,
            column,
            wrap);
            font-size: 16px;
            .title {
              @include textoverflow(1);
              margin-bottom: 25px;
            }
            .price {
              @include flexbox(space-between,
              center,
              row,
              nowrap);
              width: 100%;
              .fee {
                color: $red;
              }
              .count {
                font-size: 14px;
                color: #999;
              }
            }
          }
        }
      }
    }
    .payOnline {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      background: #fff;
      font-size: 17px;
      @include flexbox(flex-end,
      center,
      row,
      nowrap);
      span {
        color: $red;
        text-align: right;
        padding: 0 $padding;
      }
      .payBtn {
        width: 40%;
        height: 100%;
        color: #fff;
        padding: 15px;
        background: $red;
        text-align: center;
      }
    }
  }

  .paymentLoading {
    position: fixed;
    @include flexbox(center,
    center,
    row,
    nowrap);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img {
      background: rgba(0, 0, 0, .6);
      width: 3rem;
    }
  }

  .paymentContainer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .4);
    @include flexbox(center,
    center,
    row,
    nowrap);
    .content {
      width: 85%;
      background: #fff;
      border-radius: 10px;
      >button {
        width: 60%;
        margin: 20px auto;
        background: $red;
      }
      >a {
        margin: 5px 0;
        padding: 0 15px;
      }
      .title {
        @include flexbox(center,
        center,
        row,
        nowrap);
        position: relative;
        padding: 15px;
        border-bottom: 1px solid #eee;
        strong {
          font-size: 20px;
        }
        .closeIcon {
          display: block;
          background: url('~jd/images/product-detail-sprites-mjs.png') no-repeat;
          width: 25px;
          height: 25px;
          background-position: -38px -19px;
          background-size: 150px;
          vertical-align: -8px;
          position: absolute;
          left: 10px;
        }
      }
      .paymentInfo {
        padding: 15px;
        border-bottom: 1px solid #eee;
        @include flexbox(flex-start,
        center,
        column,
        wrap);
        font-size: 20px;
        span {}
        strong {
          font-size: 40px;
          font-weight: 400;
          margin: 10px 0 0;
        }
      }
    }
  }

  .addressList {
    .my-header {
      padding: $padding;
      background: #fff;
      @include flexbox(space-between,
      center,
      row,
      nowrap);
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
        padding-left: 60px;
        position: relative;
        .selectedIcon{
          display: inline-block;
          position: absolute;
          left: 15px;
          top: calc(100%/2 - 12.5px);
          background: url('~jd/images/product-detail-sprites-mjs.png') no-repeat;
          width: 25px;
          height: 25px;
          background-position: -93px -24px;
          background-size: 140px;
          vertical-align: -8px;
        }
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
          padding: 0 0 15px;
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
<style lang="scss">
  .paymentContainer .mint-cell-wrapper{
    background-image: none;
  }
</style>
<template>
  <div class="pagePay">
    <div class="my-header">
      <i class="back" @click="$router.go(-1)"></i>
      <strong>确认订单</strong>
      <i class="myMsg"></i>
    </div>
    <div class="payContainer">
      <div class="addressContainer" v-if="defaultAddress" @click="()=>visiblePopup.selectedAdressVisible=true">
        <div class="addressDefault">
          <div class="cell">
            <strong>{{defaultAddress.nickName}} {{defaultAddress.Phone}}</strong>
            <span class="defaultIcon" v-if="defaultAddress.Selected===1">默认</span>
          </div>
          <div class="cell">
            <i class="positionIcon"></i>{{defaultAddress.Province + defaultAddress.City + defaultAddress.Area}}&nbsp;&nbsp;{{ defaultAddress.Address}}</div>
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="venderOrderList" v-if="confirmSelectedProduct">
        <div class="venderItem" v-for="(item,index) in confirmSelectedProduct" :key="index">
          <img :src="item.product.image_url[0].url" alt="">
          <div class="orderInfo">
            <p class="title">{{item.product.productName}}</p>
            <div class="price">
              <span class="fee">&yen;
                <strong>{{item.product.price}}</strong>
              </span>
              <span class="count">x {{item.counter}}</span>
            </div>
          </div>
        </div>
      </div>
      <p v-else style="text-align:center;padding:15px 0; color:#999;font-size:17px;">
        暂无数据
      </p>
    </div>
    <div class="payOnline">
      <span>实付款：&yen;{{totalFee}}</span>
      <div class="payBtn" @click="submitOrder">提交订单</div>
    </div>
    <div class="paymentLoading" v-if="visiblePopup.paymentLoadingVisible">
      <img src="~jd/images/paymentloading.gif" />
    </div>
    <div class="paymentContainer" v-if="visiblePopup.paymentContainerVisible">
      <div class="content">
        <div class="title">
          <i class="closeIcon" @click="()=>visiblePopup.paymentContainerVisible=false"></i>
          <strong>请输入支付密码</strong>
        </div>
        <div class="paymentInfo">
          <span>订单付款</span>
          <strong>&yen;{{totalFee}}</strong>
        </div>
        <mt-field placeholder="请输入支付密码" type="password" v-model="paymentPassword"></mt-field>
        <mt-button size="large" type="primary" @click="payByWallet">确认支付</mt-button>
      </div>
    </div>
    <mt-popup v-model="visiblePopup.selectedAdressVisible" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
      <div class="my-header">
        <i class="back" @click="()=>visiblePopup.selectedAdressVisible=false"></i>
        <strong>选择地址</strong>
        <i class="myMsg"></i>
      </div>
      <div class="addressList">
        <div class="my-header">
          <i class="back" @click="$router.go(-1)"></i>
          <strong>地址管理</strong>
          <i class="myMsg"></i>
        </div>
        <scroller width="100%" height="100%" style="margin-top:1.2rem;background:#fff;">
          <div class="address-container" v-if="addressData">
            <div class="address-item" v-for="(item,index) in addressData" :key="index" @click="selectedAddress(item)">
              <p class="name">{{item.nickName}} {{item.Phone}}</p>
              <p class="address">{{item.Province + item.City + item.Area}}&nbsp;;&nbsp;{{item.Address}}</p>
              <i class="selectedIcon" v-if="item.Selected===1"></i>
            </div>
          </div>
        </scroller>
        <div class="addNewAddressbtn">+&nbsp;新建地址</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {
    Field,
    Button,
    Toast,
    Popup
  } from 'mint-ui';
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        defaultAddress: null,
        totalFee: 0.00,
        paymentPassword: null,
        PaymentNo: null,
        confirmSelectedProduct: null,
        addressData: null,
        visiblePopup: {
          paymentContainerVisible: false,
          paymentLoadingVisible: false,
          selectedAdressVisible: false
        }
      };
    },

    watch: {},

    components: {},

    computed: {
      ...mapGetters([
        'addressList'
      ])
    },

    methods: {
      selectedAddress(item){
        this.visiblePopup.selectedAdressVisible = false;
        this.addressData.map(item=>item.Selected=9);
        item.Selected = 1;
        this.defaultAddress = item;
      },
      async initData() {
        let defaultAddress = await this.$store.dispatch('GetDefaultAddress', {})
        let confirmSelectedData = await this.$store.dispatch('GetConfirmSelectedProductList', {})
        if(!this.addressList){
          let addressData = await this.$store.dispatch('GetAddressList',{pageSize:100,pageIndex:1});
          this.addressData = addressData.Data;
        }else{
          this.addressData = this.addressList.Data;
        }
        this.defaultAddress = defaultAddress.Data;
        if(confirmSelectedData.Data==''){
          Toast({
            message: '暂无订单信息'
          })
          return this.$router.go(-1);
        }
        confirmSelectedData.Data.map(item => {
          if (item.status === 9) {
            this.totalFee += item.counter * item.product.price;
          }
        })
        this.totalFee = this.totalFee.toFixed(2);
        this.confirmSelectedProduct = confirmSelectedData.Data;
      },
      async submitOrder() {
        this.$store.dispatch('CreateOrder', {
          AddressId: this.defaultAddress._id
        }).then(response => {
          this.visiblePopup.paymentLoadingVisible = true;
          setTimeout(() => {
            this.PaymentNo = response.Data.PaymentNo;
            this.visiblePopup.paymentLoadingVisible = false;
            this.visiblePopup.paymentContainerVisible = true;
          }, 2000)
        })
      },
      payByWallet() {
        this.$store.dispatch('PayByWallet', {
          PaymentNo: this.PaymentNo,
          PaymentPassword: this.paymentPassword
        }).then(response => {
          if (response.Code === 0) {
            Toast({
              message: response.Message
            });
            this.visiblePopup.paymentContainerVisible = false;
            this.visiblePopup.paymentLoadingVisible = false;
            setTimeout(() => {
              this.$router.push('/orderList/2')
            }, 1000)
          }
        })
      }
    },

    mounted: function () {
      this.initData();
    }
  }

</script>
<style lang="scss" scoped>


</style>
