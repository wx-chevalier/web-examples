<!-- index -->
<style lang="scss" scoped>
  /* banner */

  @import '~assets/common/css/mixin.scss';
  .banner {
    height: 4.88rem;
    img {
      min-width: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }

  /* banner */

  .appTabscenter {
    border-radius: .2rem .2rem 0 0;
    overflow: hidden;
    position: relative;
    top: -.2rem;
    left: 0;
    background: #f8f8f8;
    z-index: 200;
    width: 100%;
    padding-bottom: .25rem;
    .mint-swipe {
      padding: .266667rem 0;
      overflow: initial !important;
      height: 3.39rem;
    }
    .tableTabs {
      @include flexbox(center, center, row, wrap);
      width: 100%;
      height: 100%;
      .table-tabs-item {
        width: 20%;
        margin: .133333rem 0;
        @include flexbox(center, center, column, wrap);
        flex: initial;
        cursor: pointer;
        p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          display: box;
          color: #666666;
          box-orient: vertical;
        }
        img {
          width: 29px;
          height: 29px;
        }
      }
    }
  }

  .floor {
    position: relative;
    background: #fff;
    top: -.1rem;
    overflow: hidden;
    clear: both;
    .container-bg {
      width: 100%;
      overflow: hidden;
      clear: both;
      img {
        width: 100%;
        height: auto;
      }
    }
    .activity_list {
      position: absolute;
      bottom: .2rem;
      padding: 0 8px;
      @include flexbox(space-between, center, row, wrap);
      >div {
        width: 50%;
      }
      img {
        width: 100%;
        height: auto;
      }
      .right_item {
        @include flexbox(space-between, center, column, wrap);
        flex: initial;
        .r_i_cell {
          height: 50%;
          width: 100%;
        }
      }
    }
  }

  .jd-express-news {
    position: relative;
    overflow: hidden;
    top: -.1rem;
    background: #fff;
    clear: both;
    .jd-kuaibao {
      .jd-news-icon {
        width: 1.95rem;
        height: .45rem;
      }
      >div {
        padding-left: .1rem;
        li {
          @include textoverflow(1);
        }
      }
      >span {
        font-size: 12PX;
        width: 1.5rem;
        text-align: right;
        color: #181818;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          background: #ececec;
          height: 100%;
          width: 1px;
        }
      }
      @include flexbox(space-between, center, row, nowrap);
      padding: 0.2rem .5rem;
    }
  }

  /* 京东秒杀 */

  .seckill-t {
    padding: .1rem 0;
    font-size: .3rem;
    strong {
      font-weight: normal !important;
      font-size: .4rem;
    }
    .seckill-summary {
      color: #999;
      font-size: 13px;
      padding: .1rem 0;
      -webkit-text-fill-color: initial;
    }
    .seckill-time {
      color: #666;
      -webkit-text-fill-color: initial;
      >span {
        color: #fff;
        background: #000;
        border-radius: .1rem;
        padding: 0 .03rem;
      }
    }
    .seckill-now {
      color: #333;
      font-size: 15px;
      -webkit-text-fill-color: initial;
      font-weight: normal !important;
    }
  }

  .seckill-floor {
    position: relative;
    overflow: hidden;
    clear: both;
    top: .05rem;
    img {
      max-width: 100%;
      max-height: 80px;
    }
    .jd-f-b-r-item,
    .jd-f-b-item,
    .jd-f-b-pd-item {
      min-height: 134px;
      overflow: hidden;
    }
    .jd-flex-box {
      background: #fff;
      padding: 10px 0;
      @include flexbox(space-between, flex-start, row, nowrap);
      >div {
        width: 50%;
      }
      .jd-f-b-l {
        @include flexbox(center, space-between, column, wrap);
        flex: initial;
        position: relative;
        >div {
          padding: 0 .2rem;
        }
        &:after {
          content: '';
          position: absolute;
          right: 1px;
          height: 100%;
          width: 1px;
          background: #f5f5f5;
        }
        .jd-f-b-pd-item {
          @include flexbox(space-between, center, row, nowrap);
          .seckill-p-item {
            width: 50%;
            .seckill-t {
              @include flexbox(center, center, column, wrap);
            }
          }
        }
        .jd-f-b-item {
          @include flexbox(center, center, column, wrap);
          border-bottom: 1px solid #F5F5F5;
          .seckill-t {
            @include flexbox(space-between, center, row, nowrap);
          }
          .seckill-prd {
            @include flexbox(space-between, center, row, nowrap);
            .prd-item {
              @include flexbox(center, center, column, wrap);
              >strong {
                color: #f23030;
                font-size: 14px;
                line-height: 1;
              }
              >del {
                color: #999;
                font-size: 12px;
                padding: .03rem 0 .08rem;
              }
            }
          }
        }
      }
      .jd-f-b-r {
        @include flexbox(center, center, column, wrap);
        flex: initial;
        .jd-f-b-r-item {
          @include flexbox(center, flex-start, column, wrap);
          padding: 0 .2rem;
          border-bottom: 1px solid #F5F5F5;
          .seckill-pd-r {
            img {
              width: 50%;
            }
          }
          .seckill-t {
            .seckill-summary {
              color: #999;
              font-size: 13px;
              -webkit-text-fill-color: initial;
            }
            @include flexbox(center, flex-start, column, wrap);
          }
          .seckill-pd-r {
            @include flexbox(space-between, center, row, nowrap);
          }
        }
      }
    }
  }

  /* 京东秒杀 */

  /* 爱生活 */

  .floor {
    .floor-title {
      background: #f5f5f5;
      text-align: center;
      img {
        height: 35px;
      }
    }
    .floor-container-bom {
      @include flexbox(center, center, row, nowrap);
      .f-c-b-prd-item {
        width: 25%;
        position: relative;
        padding: .2rem;
        img {
          max-width: 60px;
        }
        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 1px;
          height: 100%;
          width: 1px;
          background: #f5f5f5;
        }
      }
    }
    .floor-container {
      @include flexbox(space-between, center, row, nowrap);
      position: relative;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        width: 100%;
        background: #f5f5f5;
      }
      >div {
        width: 50%;
      }
      .seckill-t {
        padding: 0 .2rem;
      }
      .f-c-l {
        position: relative;
        padding: .2rem 0;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 1px;
          height: 100%;
          width: 1px;
          background: #f5f5f5;
        }
      }
      .f-c-l-prd {
        img {
          max-width: 60px;
          max-height: 60px;
          margin: 0 .2rem;
        }
        @include flexbox(center, center, row, nowrap);
      }
    }
  }

  /* 爱生活 */

  /* 推荐 */

  .recommend {
    background: #f0f2f5;
    .gray-text {
      margin: .3rem 0;
      @include flexbox(center, center, row, nowrap);
      .gray-layout {
        font-size: 14px;
        color: #999;
        .gray-text-img {
          img {
            width: 18px;
            height: 18px;
          }
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
    .find-recommend-product {
      @include flexbox(space-between, center, row, wrap);
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
          height: 1rem;
          font-size: 14px;
          line-height: 1.3;
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

  /* 推荐 */

</style>
<style lang="scss">
  #jd {
    min-height: 100vh;
    padding-bottom: 1.35rem;
    .appTabscenter {
      .mint-swipe-indicators {
        transform: translate(-50%, 150%);
        .mint-swipe-indicator {
          width: .15rem;
          height: .15rem;
          background: rgba(0, 0, 0, .3) !important;
          opacity: 1 !important;
          &.is-active {
            background: #fff !important;
          }
        }
      }
    }
    .banner {
      .mint-swipe-indicators {
        transform: translate(-50%, -50%);
        .mint-swipe-indicator {
          width: .2rem;
          background: #fff;
          height: .048667rem;
          opacity: 0.6;
          &.is-active {
            background: transparent;
            border: .036rem solid #fff;
            width: .16rem !important;
            opacity: 1 !important;
            height: .16rem !important;
            border-radius: 50%;
            vertical-align: bottom;
          }
        }
      }
    }
  }

</style>
<template>
  <div id="jd">
    <!-- 搜索栏 -->
    <search-bar :Status="Status"  v-if="searchBarVisilbe && cmsData" />
    <!-- 搜索栏 -->
    <load-more @translate-change="translateChange" style="width:100%;" @loadMore="infiniteCallback" :commad="commad" :param="recommendParam" :topMethod="onRefreshCallback"
      :loadMoreIconVisible="false" ref="recommendLoadmore" v-if="cmsData">
      <!-- <scroller class="cmsScroll" refreshLayerColor="#999" refreshText="下拉刷新..." :snapping="true" :onRefresh="onRefreshCallback" ref="cmsScroll" width="100%" height="100%"> -->
      <span style="-webkit-transform: scale(.9)!important;transform: scale(.9)!important;position:  absolute;top: 45%;left: 45%;font-size:  12px;font-weight: normal;text-shadow:  none;box-shadow:  none;"
        slot="refresh-spinner">更新中...</span>
      <!-- banner -->
      <mt-swipe :stopPropagation="true" :prevent="true" :auto="5000" class="banner">
        <mt-swipe-item v-for="(item,index) in cmsData.cmsBanner.image_url" :key="index">
          <img :src="item.url" :alt="item.name">
        </mt-swipe-item>
      </mt-swipe>
      <!-- banner -->
      <!-- tabBanner -->
      <div class="appTabscenter">
        <mt-swipe :speed="200" :continuous="false" :stopPropagation="false" :prevent="true" :auto="0">
          <mt-swipe-item>
            <ul class="tableTabs">
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (1).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (2).png" alt="">
                </i>
                <p>京东服饰</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (3).png" alt="">
                </i>
                <p>京东到家</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (4).png" alt="">
                </i>
                <p>京东生鲜</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (5).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (6).png" alt="">
                </i>
                <p>充值缴费</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (7).png" alt="">
                </i>
                <p>全球购</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (8).png" alt="">
                </i>
                <p>领券</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (9).png" alt="">
                </i>
                <p>领京豆</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (10).png" alt="">
                </i>
                <p>赚钱</p>
              </li>
            </ul>
          </mt-swipe-item>
          <mt-swipe-item>
            <ul class="tableTabs">
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (1).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (2).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (3).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (4).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (5).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (6).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (7).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (8).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (9).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
              <li class="table-tabs-item">
                <i>
                  <img src="~jd/images/applist (10).png" alt="">
                </i>
                <p>京东超市</p>
              </li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- tabBanner -->
      <!-- 底部资讯 -->
      <div class="floor">
        <div class="container-bg">
          <img src="~jd/images/floor1.jpg" alt="">
        </div>
        <div class="activity_list">
          <div class="left_item">
            <img src="~jd/images/floor (1).jpg" alt="">
          </div>
          <div class="right_item">
            <div class="r_i_cell">
              <img src="~jd/images/floor (2).jpg" alt="">
            </div>
            <div class="r_i_cell">
              <img src="~jd/images/floor (3).jpg" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 底部资讯 -->

      <!-- 京东快报 -->
      <div class="jd-express-news">
        <div class="jd-kuaibao">
          <router-link to="/new">
            <img class="jd-news-icon" src="~jd/images/jd-news-tit.png" alt="">
          </router-link>
          <marquee>
            <marquee-item v-for="(item,index) in cmsData.life" :key="index" @click.native="$router.push(`/articleDetail/${item.id}`)">{{item.article_title}}</marquee-item>
          </marquee>
          <span>更多</span>
        </div>
      </div>
      <!-- 京东快报 -->

      <!-- 京东秒杀 -->
      <div class="seckill-floor">
        <div class="jd-flex-box">
          <div class="jd-f-b-l">
            <div class="jd-f-b-item">
              <div class="seckill-t">
                <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_kill.content}}</strong>
                <strong class="seckill-now">{{cmsData.jd_kill.summary}}</strong>
                <div class="seckill-time">
                  <span class="sec-hou">01:</span>
                  <span class="sec-min">38:</span>
                  <span class="sec-sen">29</span>
                </div>
              </div>
              <div class="seckill-prd">
                <div class="prd-item" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in cmsData.jd_kill.product_list"
                  :key="index" v-if="index<3">
                  <img v-lazy.jd="item.image_url[0].url" :alt="item.image_url[0].name">
                  <strong>&yen;{{item.price}}</strong>
                  <del>&yen;{{item.price}}</del>
                </div>
              </div>
            </div>
            <div class="jd-f-b-pd-item">
              <div class="seckill-p-item" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in cmsData.shop_kill.product_list"
                :key="index" v-if="index<2">
                <div class="seckill-t">
                  <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.shop_kill.summary}}</strong>
                  <p class="seckill-summary">{{cmsData.shop_kill.content}}</p>
                  <img v-lazy.jd="item.image_url[0].url" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="jd-f-b-r">
            <div class="jd-f-b-r-item">
              <div class="seckill-t">
                <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(0, 194, 171), rgb(62, 148, 255));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_goods_watch.content}}</strong>
                <p class="seckill-summary">{{cmsData.jd_goods_watch.summary}}</p>
              </div>
              <div class="seckill-pd-r">
                <img v-lazy.jd="item.image_url[index].url" alt="" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in cmsData.jd_goods_watch.product_list"
                  :key="index" v-if="index<2">
              </div>
            </div>
            <div class="jd-f-b-r-item">
              <div class="seckill-t">
                <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(254, 133, 55), rgb(240, 43, 43));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_hmzj.content}}</strong>
                <p class="seckill-summary">{{cmsData.jd_hmzj.summary}}</p>
              </div>
              <div class="seckill-pd-r">
                <img @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in cmsData.jd_hmzj.product_list" :key="index"
                  v-if="index<2" v-lazy.jd="item.image_url[0].url" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 京东秒杀 -->


      <!-- 爱生活 -->
      <div class="floor">
        <div class="floor-title">
          <img src="~jd/images/appmenu (1).jpg" alt="">
        </div>
        <div class="floor-container">
          <div class="f-c-l">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_loveLife[0].content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_loveLife[0].summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img v-lazy.jd="item.image_url[0].url" alt="" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in cmsData.jd_loveLife[0].product_list"
                :key="index" v-if="index<2">
            </div>
          </div>
          <div class="f-c-r">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_loveLife[1].content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_loveLife[1].summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img v-lazy.jd="item.image_url[0].url" alt="" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in cmsData.jd_loveLife[1].product_list"
                :key="index" v-if="index<2">
            </div>
          </div>
        </div>
        <div class="floor-container">
          <div class="f-c-l">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_loveLife[2].summary}}</strong>
              <p class="seckill-summary">{{cmsData.jd_loveLife[2].summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img v-lazy.jd="item.image_url[0].url" alt="" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in cmsData.jd_loveLife[2].product_list"
                :key="index" v-if="index<2">
            </div>
          </div>
          <div class="f-c-r">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_jiaju.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_jiaju.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img v-lazy.jd="item.image_url[0].url" alt="" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in cmsData.jd_jiaju.product_list"
                :key="index" v-if="index<2">
            </div>
          </div>
        </div>
        <div class="floor-container-bom">
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_baobao.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_baobao.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_baobao.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_baobao.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_beautiful.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_beautiful.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_beautiful.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_beautiful.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_food.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_food.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_food.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_food.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_clothes.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_clothes.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_clothes.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_clothes.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 爱生活 -->

      <!-- 逛商场 -->
      <div class="floor">
        <div class="floor-title">
          <img src="~jd/images/appmenu (3).jpg" alt="">
        </div>
        <div class="floor-container">
          <div class="f-c-l">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_liqueur.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_liqueur.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img @click="$router.push(`/product/${cmsData.jd_liqueur.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_liqueur.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-r">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_shuma.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_shuma.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img @click="$router.push(`/product/${item.productNo}`)" v-lazy.jd="item.image_url[0].url" alt="" v-for="(item,index) in cmsData.jd_shuma.product_list"
                :key="index">
            </div>
          </div>
        </div>
        <div class="floor-container">
          <div class="f-c-l">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_Mens.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_Mens.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img @click="$router.push(`/product/${cmsData.jd_Mens.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_Mens.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-r">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_djd.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_djd.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img @click="$router.push(`/product/${cmsData.jd_djd.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_djd.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
        </div>
        <div class="floor-container-bom">
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_meishicheng.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_meishicheng.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_meishicheng.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_meishicheng.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_bangong.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_bangong.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_bangong.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_bangong.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_xiangbao.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_xiangbao.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_xiangbao.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_xiangbao.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_smxjd.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_smxjd.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_smxjd.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_smxjd.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 逛商场 -->

      <!-- 特色推荐 -->
      <div class="floor">
        <div class="floor-title">
          <img src="~jd/images/appmenu (2).jpg" alt="">
        </div>
        <div class="floor-container">
          <div class="f-c-l">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_shengxian.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_shengxian.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img @click="$router.push(`/product/${cmsData.jd_shengxian.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_shengxian.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-r">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_books.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_books.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img @click="$router.push(`/product/${cmsData.jd_books.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_books.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
        </div>
        <div class="floor-container">
          <div class="f-c-l">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_meizhuang.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_meizhuang.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img @click="$router.push(`/product/${cmsData.jd_meizhuang.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_meizhuang.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-r">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_liqueur.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_liqueur.summary}}</p>
            </div>
            <div class="f-c-l-prd">
              <img @click="$router.push(`/product/${cmsData.jd_liqueur.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_liqueur.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
        </div>
        <div class="floor-container-bom">
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_liqueur.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_liqueur.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_liqueur.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_liqueur.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_liqueur.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_liqueur.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_liqueur.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_liqueur.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_liqueur.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_liqueur.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_liqueur.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_liqueur.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
          <div class="f-c-b-prd-item">
            <div class="seckill-t">
              <strong class="seckill-title" style="background-image: -webkit-linear-gradient(left, rgb(255, 42, 42), rgb(241, 57, 210));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">{{cmsData.jd_liqueur.content}}</strong>
              <p class="seckill-summary">{{cmsData.jd_liqueur.summary}}</p>
            </div>
            <div class="product-img">
              <img @click="$router.push(`/product/${cmsData.jd_liqueur.product_list[0].productNo}`)" v-lazy.jd="cmsData.jd_liqueur.product_list[0].image_url[0].url"
                alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 特色推荐 -->

      <!-- 为您推荐 -->
      <div class="floor recommend" style="top:0rem;">
        <div class="gray-text">
          <span class="gray-layout">
            <span class="gray-text-img">
              <img src="~jd/images/recommend.png" alt="">
            </span>为您推荐
          </span>
        </div>
        <ul class="find-recommend-product">
          <li class="recommend-item" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in recommendData" :key="index">
            <div class="item-posre">
              <img v-lazy.jd="item.image_url[0].url" alt="">
            </div>
            <p class="item-product-text">{{item.productName}}</p>
            <p class="item-product-info">
              <span>&yen;</span>{{item.price}}</p>
            <p class="item-product-praise">好评率100%</p>
          </li>
        </ul>
      </div>
    </load-more>
    <!-- 为您推荐 -->
    <FooterView/>
    <BackHead/>
  </div>
</template>
<script>
  import FooterView from 'component/footer/footerView';
  import BackHead from 'common/backHead';
  import {
    showBack
  } from '@/utils/mixin';
  import {
    getRecommend,
    getArticle,
    getArticleList,
    getGoodsCategoryList
  } from '@/service/getData';
  import marquee from 'common/marquee/marquee';
  import marqueeItem from 'common/marquee/marquee-item';
  import SearchBar from 'page/shop/searchBar';
  import LoadMore from 'common/loadMore';
  import {
    Swipe,
    SwipeItem,
    Lazyload
  } from 'mint-ui';
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        Status: false,
        commad: getRecommend,
        recommendParam: {
          Type: 'recommend',
          pageSize: 10,
          pageIndex: 1
        },
        recommendData: [],
        cmsData: null,
        searchBarVisilbe: true
      };
    },
    watch: {},
    components: {
      FooterView,
      BackHead,
      Swipe,
      SwipeItem,
      marquee,
      marqueeItem,
      SearchBar,
      LoadMore
    },
    computed: {
      ...mapGetters([
        'indexCmsData'
      ])
    },
    methods: {
      translateChange(y){ //监听下拉的阈值
        this.searchBarVisilbe = y>8 ? false : true;
      },
      async onRefreshCallback() { //下拉刷新
        this.recommendParam.pageSize = 10;
        this.recommendParam.pageIndex = 1;
        this.updatedData();
        setTimeout(() => {
          this.$refs.recommendLoadmore.onTopLoaded(this.$refs.recommendLoadmore.uuid);
        }, 1000); 
      },
      async infiniteCallback(response) { //加载更多
        if (response.Data.length > 0) {
          response.Data.map(i => {
            this.recommendData.push(i)
          })
        }
      },
      async updatedData() { //更新数据
        let {
          Data
        } = await this.$store.dispatch('GetIndexCmsData', {
          pageIndex: 1,
          pageSize: 100
        });
        this.cmsData = Data;
      },
      async initData() { //初始化数据
        if (!this.indexCmsData) {
          this.updatedData();
        } else {
          this.cmsData = this.indexCmsData.Data;
        }
      }
    },
    beforeDestroy() {},
    mounted: function () {
      this.initData();
      showBack(status => {
        this.Status = status;
      })
    }
  }

</script>
