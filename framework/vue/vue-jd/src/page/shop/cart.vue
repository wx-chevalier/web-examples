<!-- cart -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .cart-title {
    @include flexbox(center, center, row, nowrap);
    font-size: 16px;
  }

  .edit {
    @include flexbox(space-between, center, row, nowrap);
    min-width: 2rem;
    padding: 0 5px;
    i {
      height: .65rem;
      min-width: .65rem;
      background-position: -2.6rem 0 !important;
    }
    .edit-title {
      font-size: 16px;
      color: #999;
    }
  }

  /* 购物车列表 */

  .Section {
    .login-info {
      margin-top: 40px;
      position: relative;
      z-index: 1;
      background: #fff;
      padding: $padding 25px;
      border-top: 1px solid #eee;
      @include flexbox(flex-start, center, row, nowrap);
      .login {
        border: 1px solid #999;
        color: #999;
        background: transparent;
        width: 60px;
        height: 20px;
        @include flexbox(center, center, row, nowrap);
        flex: initial;
        margin-right: 10px;
        border-radius: 2px;
      }
      span {
        color: #999;
      }
    }
    .goods {
      @include flexbox(flex-start, space-between, column, wrap);
      background: linear-gradient(180deg, #fff, #efefef);
      .store {
        @include flexbox(flex-start, center, row, nowrap);
        flex: initial;
        font-size: 14px;
        padding: 10px;
        span {
          margin-left: 10px;
        }
      }
      .store-pd {
        @include flexbox(flex-start, space-between, column, wrap);
        background: #fff;
        flex: initial;
        .store-pd-item {
          @include flexbox(flex-start, center, row, nowrap);
          padding: 10px;
          border-bottom: 1px solid #eee;
          &:last-child {
            border-bottom: none;
          }
          .pd-images {
            border: 1px solid #eee;
            margin: 0 15px 0 20px;
            img {
              width: 75px;
              height: 75px;
            }
          }
          .pd-info {
            @include flexbox(flex-start, space-between, column, wrap);
            width: 100%;
            flex: initial;
            .pd-title {
              @include textoverflow(2); // width: 90%;
              font-size: 13px;
              color: #333;
            }
            .pd-sku {
              @include textoverflow(1);
              padding: 5px 0;
              line-height: 1.5;
              font-size: 12px;
              color: #999;
            }
            .pd-price {
              margin-top: 10px;
              @include flexbox(space-between, center, row, nowrap);
              flex: initial;
              .left {
                color: #e93b3d;
                span {
                  font-size: 12px;
                }
                strong {
                  font-size: 16px;
                  font-weight: normal;
                }
              }
              .right {
                @include flexbox(space-between, center, row, nowrap);
                flex: initial;
                border-radius: 2px;
                border: 1px solid #eee;
                width: 2rem;
                .cut {
                  padding: 2px 0;
                  font-size: 14px;
                  text-align: center;
                  width: 30%;
                  height: .6rem;
                  position: relative;
                  cursor: pointer;
                  &:before {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 0;
                    background: #eee;
                    width: 1px;
                    height: 100%;
                  }
                  &:after {
                    content: '';
                    position: absolute;
                    left: calc(100%/2 - 5px);
                    top: 50%;
                    background: #999;
                    width: 40%;
                    height: 1px;
                  }
                }
                .add {
                  padding: 2px 0;
                  width: 30%;
                  height: .6rem;
                  font-size: 14px;
                  text-align: center;
                  position: relative;
                  cursor: pointer;
                  &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: #eee;
                    width: 1px;
                    height: 100%;
                  }
                  &:after {
                    content: '+';
                    position: absolute;
                    left: calc(100%/2 - 5px);
                    top: calc(100%/2 - 8px);
                    font-size: 14px;
                    color: #999; // width: 50%;
                    // height: 1px;
                  }
                }
                .num-inp {
                  border: none;
                  outline: none;
                  text-align: center;
                  padding: 0 5px;
                  width: 40%;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }

  /* 购物车列表 */

  /* 底部计算栏 */

  .section-bar {
    position: fixed;
    border-top: 1px solid #eee;
    bottom: 1.35rem;
    width: 100%;
    height: 1.25rem;
    @include flexbox(space-between, center, row, nowrap);
    .left {
      background: #fff;
      font-size: 12px;
      height: 100%;
      padding: 10px;
      width: 70%;
      @include flexbox(flex-start, center, row, nowrap);
      flex: initial;
      font-size: 13px;
      i {
        vertical-align: text-top;
        margin-right: 5px;
      }
      strong {
        margin-left: 10px;
        font-weight: normal;
        font-size: 17px;
        @include textoverflow(1);
      }
    }
    .right {
      width: 30%;
      height: 100%;
      background: #e4393c;
      color: #fff;
      @include flexbox(center, center, row, nowrap);
      strong {
        font-size: 17px;
        font-weight: normal;
        span {
          font-size: 14px;
        }
      }
    }
  }

  /* 底部计算栏 */
</style>

<template>
  <div>
    <search-bar :Status="true">
      <div class="scanCode" style="min-width: 2rem;" slot="left-icon"></div>
      <div slot="title-icon" class="cart-title">购物车</div>
      <div class="edit" slot="right-icon">
        <span class="edit-title">编辑</span>
        <i class="searchIcon searchMsgIcon"></i>
      </div>
    </search-bar>

    <!-- 购物车列表 -->
    <div class="Section">
      <div class="login-info" v-if="!isLogin">
        <button class="login" @click="$router.push('/login')">登录</button>
        <span>登录后同步电脑与手机购物车中的商品</span>
      </div>
      <load-more :style="{width:'100%',height: '85%',paddingTop: isLogin ? '1.2rem' : '0'}" :topMethod="onRefreshCallback" :loadMoreIconVisible="false"
        ref="cartLoadmore">
        <div class="goods">

          <!-- 暂时还没做分店铺订单 -->
          <div class="store" v-if="false">
            <i class="select-default-icon"></i>
            <span>Apple旗舰店</span>
          </div>
          <!-- 暂时还没做分店铺订单 -->

          <div class="store-pd" v-if="cartList">
            <div class="store-pd-item" v-for="(item,index) in cartList" :key="index">
              <i :class="['select-default-icon',item.checked ? 'select-icon' : '']" @click="checked(item)"></i>
              <div class="pd-images">
                <img :src="item.product.image_url[0].url" alt="">
              </div>
              <div class="pd-info">
                <div class="pd-title">
                  <p>{{item.product.productName}}</p>
                </div>
                <div class="pd-sku">
                  <p class="sku-info">{{item.product.summary}}</p>
                </div>
                <div class="pd-price">
                  <div class="left">
                    <span>&yen;</span>
                    <strong>{{item.product.price}}</strong>
                  </div>
                  <div class="right">
                    <div class="cut" @click="editProductNum({item:item,increment:-1})"></div>
                    <input type="text" v-model="item.counter" class="num-inp" @change="editProductNum({item:item,counter:item.counter})"></input>
                    <div class="add" @click="editProductNum({item:item,increment:1})"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="!cartList || cartList == ''" style="margin-top:50px;padding: 15px 0;text-align:center;font-size:16px;color:#999;">购物车是空的</p>
      </load-more>
    </div>
    <!-- 购物车列表 -->
    <!-- 底部价格计算 -->
    <div class="section-bar">
      <div class="left">
        <i :class="['select-default-icon',selectedAll ? 'select-icon' : '']" @click="selectedAllGoods"></i>全选
        <strong>合计：&yen;{{totalFee}}</strong>
      </div>
      <div class="right" @click="confirmOrder">
        <strong>去结算
          <span>({{selectedCounter}})</span>
        </strong>
      </div>
    </div>
    <!-- 底部价格计算 -->
    <FooterView/>
  </div>
</template>

<script>
  import FooterView from 'component/footer/footerView';
  import SearchBar from 'page/shop/searchBar';
  import {
    Toast
  } from 'mint-ui'
  import {
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage
  } from '@/utils/mixin';
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  import LoadMore from 'common/loadMore';

  export default {
    data() {
      return {
        cartList: null,
        totalFee: 0,
        selectedCounter: 0,
        selectedAll: false,
        isLogin: false
      };
    },

    watch: {},

    components: {
      FooterView,
      SearchBar,
      LoadMore
    },

    computed: {
      ...mapGetters([
        'cartProductData',
        'userInfo'
      ])
    },

    methods: {
      selectedAllGoods() {
        this.cartList.map(item => {
          if (item.status === 1) {
            item.checked = !this.selectedAll
          }
        })
        this.selectedAll = !this.selectedAll;
        this.computedTotalFee();
      },
      confirmOrder() {
        let SelectedList = [];
        this.cartList.map(item => {
          if (item.status === 1 && item.checked) {
            SelectedList.push(item.product.productNo)
          }
        })
        if (SelectedList == '') return Toast({
          message: '请选择商品',
          position: 'bottom'
        });
        this.$store.dispatch('ConfirmSelectProduct', {
          SelectedList: JSON.stringify(SelectedList)
        }).then(response => {
          this.$router.push('/createOrder');
        })
      },
      computedTotalFee() {
        let computedFee = 0,
          selectedCounter = 0;
        this.cartList.map(item => {
          if (item.checked && item.status === 1) {
            computedFee += parseFloat(item.counter * item.product.price)
            selectedCounter++
          }
        })
        this.selectedCounter = selectedCounter;
        this.selectedAll = selectedCounter === this.cartList.length ? true : false;
        this.totalFee = computedFee.toFixed(2);
      },
      async editProductNum({
        item,
        increment,
        counter
      }) {
        let params = {
          SelectedList: JSON.stringify([{
            ProductNo: item.product.productNo
          }])
        }
        if (counter) {
          params.Counter = counter
        } else {
          params.Increment = increment
        }
        await this.$store.dispatch('SelectProduct', params)
        this.onRefreshCallback();
      },
      async checked(item) {
        item.checked = !item.checked;
        let count = 0;
        this.cartList.map(item => {
          if (item.status === 1 && item.checked) return count++;
        })
        if (count === this.cartList.length) return this.selectedAllGoods();
        this.computedTotalFee();
      },
      async initData() {
        let token = getSessionStorage('MemberToken')
        this.isLogin = token ? true : false;
        if (!token) return;
        let {
          Data
        } = await this.$store.dispatch('GetSelectedProductList');
        this.cartList = Data || null;
      },
      async onRefreshCallback() {
        this.$store.dispatch('GetSelectedProductList').then(response => {
          setTimeout(() => {
            this.cartList = response.Data;
            this.computedTotalFee();
            this.selectedAll = false;
            this.$refs.cartLoadmore.onTopLoaded(this.$refs.cartLoadmore.uuid);
          }, 500);
        }, error => {
          this.$refs.cartLoadmore.translate = 0;
          this.$refs.cartLoadmore.topStatus = 'pull';
          this.$refs.cartLoadmore.AllLoaded = false;
          return this.$refs.cartLoadmore.LoadMoreLoading = false;
        });
      },
    },
    mounted: function () {
      this.initData();
    }
  }
</script>
<style lang='scss' scoped>
</style>