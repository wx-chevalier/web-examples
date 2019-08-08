<!-- product -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  /* 顶部导航栏 */

  .product-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    height: 1.25rem;
    background: #fff;
    border-bottom: 1px solid $border;
    .product-header-container {
      height: 100%;
      padding: 0px $padding;
      @include flexbox(space-between, center, row, nowrap);
      .goback {
        i {
          display: block;
          width: .65rem;
          height: .65rem;
          background: url('~jd/images/arrow-left.png') no-repeat;
          background-size: 100%;
        }
      }
      .product-tabs {
        max-width: 4.5rem;
        margin-left: 30px;
        height: 100%;
        @include flexbox(space-between,
        center,
        row,
        nowrap);
        position: relative;
        #loadingbar {
          position: absolute;
          transition: .4s;
          width: calc((100%/4));
          background: #000;
          bottom: -1px;
          height: 2px;
        }
        .product-tabs-item {
          width: 33.33%;
          @include flexbox(center,
          center,
          row,
          nowrap);
          flex: initial;
          text-align: center;
          color: #333;
          font-size: $subtitle;
          height: 100%;
          &.active {
            font-size: $title;
          }
        }
      }
      .other {
        max-width: 1.5rem;
        @include flexbox(space-between,
        center,
        row,
        nowrap);
        .share {
          display: block;
          width: .65rem;
          height: .65rem;
          background: url('~jd/images/shares.png') no-repeat;
          background-size: 100%;
        }
        .menu {
          display: block;
          width: .65rem;
          margin-left: .2rem;
          height: .65rem;
          background: url('~jd/images/menu.png') no-repeat;
          background-size: 100%;
        }
      }
    }
  }

  /* 顶部导航栏 */

  /* 商品 */

  #mainLayout {
    .prouct-swiper {
      box-shadow: 0px 0px 6px 1px #eee;
      position: relative;
      .swiper-indicators {
        font-size: $title;
        z-index: 666;
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        background: rgba(0, 0, 0, .15);
        right: 15px;
        bottom: 11px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        overflow: hidden;
      }
      .scroll-images {
        height: 10rem;
        img {
          width: 100%;
          vertical-align: middle;
          max-height: 10rem;
          min-height: 10rem;
        }
      }
    }
    .product-title-text {
      @include flexbox(space-between,
      flex-start,
      column,
      wrap);
      padding: $padding;
      background: #fff;
      .product-name-text {
        font-size: $title;
        color: #232326;
        @include textoverflow(2);
      }
      .product-summary-text {
        font-size: $subtitle;
        padding: 5px 0;
        color: #f23030;
        line-height: 1.6;
        @include textoverflow(2);
      }
      .product-price {
        color: #f23030;
        text-align: left;
        width: 100%;
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        strong {
          font-size: 23px;
        }
      }
    }
    .product-sku {
      margin-top: $margin;
      background: #fff;
      padding: $padding;
      @include flexbox(space-between,
      center,
      row,
      nowrap);
      .sku-select {
        font-size: $subtitle;
        color: #999;
        margin-right: 5px;
      }
      .sku-info {
        font-size: $subtitle;
        color: #232326;
      }
      .right-menu {
        width: 19px;
        height: 4px;
        background-image: url('~jd/images/product-detail-sprites-mjs.png');
        background-repeat: no-repeat;
        background-size: 100px 100px;
        background-position: -42px -17px;
      }
    }
    .product-comment {
      margin-top: $margin;
      padding: $padding;
      background: #fff;
      @include flexbox(space-between,
      center,
      column,
      wrap);
      .comment-info {
        width: 100%;
        padding: 0 0 $padding;
        border-bottom: 1px solid $border;
        @include flexbox(space-between,
        center,
        row,
        nowrap);
        flex: initial;
        .comment-num {
          font-size: $subtitle;
          color: $gray;
        }
        .comment-percentage {
          strong {
            color: $red;
            font-size: $subtitle;
            margin-left: 5px;
            font-weight: normal;
          }
        }
      }
      .comment-list {
        padding: $padding 0;
        width: 100%;
        .comment-item {
          .comment-more {
            @include flexbox(center,
            center,
            row,
            nowrap);
            font-size: $subtitle;
            color: $gray;
            width: 100%;
            padding: $padding 0;
            border-radius: 5px;
            border: 1px solid #eeeeee;
          }
          @include flexbox(space-between,
          flex-start,
          column,
          wrap);
          flex: initial;
          width: 100%;
          border-bottom: 1px solid $gray;
          &:last-child {
            border-bottom: none;
          }
          .comment-userinfo {
            width: 100%;
            @include flexbox(space-between,
            center,
            row,
            nowrap);
            display: inline-flex;
            padding: 5px 0;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              overflow: hidden;
            }
            .avatar {
              @include flexbox(flex-satrt,
              center,
              row,
              nowrap);
              flex: initial;
              span {
                font-size: $smsub;
                color: #333;
                vertical-align: text-top;
                margin-left: 5px;
              }
            }
            .comment-star {
              @include flexbox(flex-end,
              center,
              row,
              nowrap);
              .star-item {
                display: block;
                width: 14px;
                height: 14px;
                background: url('~jd/images/star-h.png') no-repeat;
                background-size: 100%;
              }
            }
          }
          .comment-content {
            @include flexbox(space-between,
            flex-start,
            column,
            wrap);
            width: 100%;
            .content {
              font-size: $subtitle;
              color: #333;
              @include textoverflow(2);
              padding: $padding 0;
            }
            .comment-images-list {
              @include flexbox(space-between,
              center,
              row,
              nowrap);
              margin-bottom: $margin;
              img {
                width: 84px;
                margin-right: 5px;
                height: 84px;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
          .comment-sku {
            text-align: left;
            color: $gray;
            font-size: $smsub;
            margin-bottom: $margin;
          }
        }
      }
    }
    .goods-part {
      margin-top: $margin;
      background: #fff;
      padding: $padding;
      @include flexbox(space-between,
      center,
      column,
      wrap);
      >div {
        width: 100%;
      }
      .goods-part-info {
        @include flexbox(flex-start,
        center,
        row,
        nowrap);
        flex: initial;
        img {
          width: 80px;
          height: 26px;
          border: 1px solid $border;
        }
        >div {
          margin-left: 10px;
          @include flexbox(space-between,
          flex-start,
          column,
          wrap);
          flex: initial;
          .goods-part-title {
            font-size: $title;
            color: #333;
            @include textoverflow(1);
          }
          .goods-part-summary {
            color: $gray;
            margin-top: 5px;
            font-size: $smsub;
            @include textoverflow(1);
          }
        }
      }
      .good-part-quantity {
        @include flexbox(space-between,
        center,
        row,
        nowrap);
        padding: 15px 0;
        >div {
          width: 33.33%;
          border-right: 1px solid $border;
          @include flexbox(space-between,
          center,
          column,
          wrap);
          &:last-child {
            border-right: none;
          }
          strong {
            font-size: $title;
            color: #333;
            text-align: center;
            font-weight: normal;
          }
          span {
            text-align: center;
            color: $gray;
            margin-top: 5px;
            font-size: $smsub;
          }
        }
      }
      .good-part-service {
        @include flexbox(space-between,
        center,
        row,
        nowrap);
        >div {
          border: 1px solid $border;
          border-radius: 2px;
          width: 49%;
          text-align: center;
          padding: 6px 0;
          span {
            text-align: center;
            font-size: $subtitle;
            margin-left: 5px;
            vertical-align: 0.1rem;
            color: $gray;
          }
          i {
            display: inline-block;
            background-size: 100px 100px;
            background-repeat: no-repeat;
            background-image: url('~jd/images/product-detail-sprites-mjs.png');
          }
        }
        .good-part-contact {
          i {
            width: 18px;
            height: 18px;
            background-position: -30px -48px;
          }
        }
        .go-good-part {
          i {
            width: 18px;
            height: 18px;
            background-position: -83px -48px;
          }
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
  }

  /* 商品 */

  /* 底部导航栏 */

  .cart-concern-fixed {
    position: fixed;
    bottom: -1px;
    left: 0;
    right: 0;
    width: 100%;
    height: 1.25rem;
    background: #fff;
    border-top: 1px solid $border;
    @include flexbox(space-between,
    center,
    row,
    nowrap);
    .left {
      width: 60%;
      height: 100%;
      @include flexbox(space-between,
      center,
      row,
      nowrap);
      flex: initial;
      >div {
        width: 33.33%;
        @include flexbox(space-between,
        center,
        column,
        wrap);
        flex: initial;
        span {
          color: #333;
          font-size: $smsub;
          margin-top: 2px;
        }
        i {
          display: block;
          width: 23px;
          height: 23px;
        }
      }
      .goods-part {
        i {
          background: url('~jd/images/store.png') no-repeat;
          background-size: 90%;
          background-position: 2px 2px;
        }
      }
      .like-icon {
        i {
          background: url('~jd/images/cart_sprits_all.png') no-repeat;
          background-position: -50px 0;
          background-size: 100px 100px;
          &.active {
            background-size: -50px -21px;
          }
        }
      }
      .shopping-cart {
        i {
          background: url('~jd/images/cart_sprits_all.png') no-repeat;
          background-position: 0 -21px;
          background-size: 100px 100px;
        }
      }
    }
    .right {
      width: 40%;
      height: 100%;
      background: $red;
      color: #fff;
      font-size: $title;
      @include flexbox(center,
      center,
      row,
      nowrap);
      flex: initial;
    }
  }

  /* 底部导航栏 */

  /* 商品详情 */

  #goodDetail {
    .detail-tab {
      @include flexbox(space-between,
      center,
      row,
      nowrap);
      background: #fff;
      padding: $padding 20px;
      li {
        width: 33.33%;
        color: #333;
        text-align: center;
        font-size: $subtitle;
        border-right: 1px solid $border;
        &:last-child {
          border-right: none;
        }
        &.active {
          color: $red;
        }
      }
    }
    .good-detail-content {
      padding: $padding;
      background: #fff;
      .top-tip {
        background: #fff;
        text-align: center;
        position: relative;
        span {
          text-align: center;
          font-size: $subtitle;
          color: $gray;
          position: relative;
          z-index: 222;
          padding: 0 $padding;
          background: #fff;
        }
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background: $border;
          top: 50%;
          left: 0;
        }
      }
      .content {}
    }
  }

  /* 商品详情 */

  /* 商品评价 */

  #goodcommentList {
    background: #fff;
    padding: $padding 0; // margin-top: $margin;
    .goodcomment-item {
      background: #fff;
      @include flexbox(space-between,
      center,
      column,
      wrap);
      width: 100%;
      padding: $padding;
      border-bottom: 1px solid $border;
      &:last-child {
        border-bottom: none;
      }
      .comment-userinfo {
        width: 100%;
        @include flexbox(space-between,
        center,
        row,
        nowrap);
        >div {
          @include flexbox(flex-start,
          center,
          row,
          nowrap);
          .avatar {
            margin-right: 5px;
            img {
              width: 27px;
              height: 27px;
              border-radius: 50%;
              overflow: hidden;
            }
          }
          .comment-username {
            @include flexbox(space-between,
            flex-start,
            column,
            wrap);
            .name {
              font-size: $subtitle;
              color: #333;
            }
          }
        }
        .comment-date {
          color: $gray;
          font-size: smsub;
        }
      }
      .comment-content {
        padding-left: .9rem;
        p {
          font-size: $subtitle;
          color: #333;
          padding: $padding 0;
          @include textoverflow(6);
        }
        .comment-imageslist {
          @include flexbox(space-between,
          flex-start,
          column,
          wrap);
          img {
            width: 33.33%;
            height: 100px;
            margin-right: $margin;
          }
        }
      }
      .comment-sku {
        text-align: left;
        width: 100%;
        padding: $padding 0 $padding .9rem;
        p {
          color: $gray;
          font-size: smsub;
          @include textoverflow(1);
        }
      }
      .comment-other {
        @include flexbox(space-between,
        center,
        row,
        nowrap);
        width: 100%;
        padding: $padding 0 $padding .9rem;
        font-size: $smsub;
        .createDate {
          color: $gray;
        }
        >div {
          @include flexbox(flex-end,
          center,
          row,
          nowrap);
          flex: initial;
          div {
            @include flexbox(space-between,
            center,
            row,
            nowrap);
            margin-right: 5px;
            &:last-child {
              margin-right: 0;
            }
            i {
              display: block;
              width: 22px;
              height: 22px;
            }
            span {
              color: #333;
              margin-left: 5px;
              vertical-align: middle;
            }
          }
          .like-icon {
            i {
              background: url('~jd/images/cart_sprits_all.png') no-repeat;
              background-position: -50px 0;
              background-size: 100px 100px;
              &.active {
                background-size: -50px -21px;
              }
            }
          }
          .sendcomment {
            i {
              background: url('~jd/images/evaluated.png') no-repeat;
              background-size: 100%;
            }
          }
        }
      }
    }
  }

  /* 商品评价 */

</style>
<style lang="scss">
  #prodContent-container {
    width: 100%;
    clear: both;
    overflow: hidden;
  }

  #prodContent-container * {
    max-width: 100% !important;
    width: 100% !important;
    height: auto !important;
  }

</style>

<template>
  <div style="background:#f8f8f8;">
    <!-- 顶部导航栏 -->
    <div class="product-header">
      <div class="product-header-container">
        <div class="goback" @click="$router.go(-1)">
          <i class="back"></i>
        </div>
        <div class="product-tabs">
          <span @click="switchTabs('mainLayout')" :class="['product-tabs-item',containerTab==='mainLayout'?'active':'']">商品</span>
          <span @click="switchTabs('goodDetail')" :class="['product-tabs-item',containerTab==='goodDetail'?'active':'']">详情</span>
          <span @click="switchTabs('goodcommentList')" :class="['product-tabs-item',containerTab==='goodcommentList'?'active':'']">评价</span>
          <div id="loadingbar" :style="containerTab==='mainLayout' ? 'left:5%' : containerTab==='goodDetail' ?  'left:38.63%' : 'left:71.66%'"></div>
        </div>
        <div class="other">
          <i class="share"></i>
          <i class="menu"></i>
        </div>
      </div>
    </div>
    <!-- 顶部导航栏 -->
    <!-- 内容区 -->
    <mt-tab-container v-model="containerTab" :swipeable="true" style="margin: 1.25rem 0;">
      <!-- 商品 -->
      <mt-tab-container-item id="mainLayout"  v-if="containerTab==='mainLayout'">
        <load-more style="width:100%;" @loadMore="infiniteCallback" :commad="commad" :param="recommendParam" :loadMoreIconVisible="false"
          ref="recommendLoadmore">
          <div id="mainLayout">
            <!-- 商品轮播图 -->
            <div class="prouct-swiper">
              <mt-swipe @change="handleChange" :showIndicators="false" :stopPropagation="true" :prevent="true" :continuous="false" :auto="0"
                class="scroll-images">
                <mt-swipe-item v-for="(item,index) in productInfo.image_url" :key="index">
                  <img :src="item.url" :alt="item.name">
                </mt-swipe-item>
              </mt-swipe>
              <div class="swiper-indicators">{{swipeIndex.nowIndex}}/{{swipeIndex.total}}</div>
            </div>
            <!-- 商品轮播图 -->
            <!-- 商品信息 -->
            <div class="product-title-text">
              <p class="product-name-text">{{productInfo.productName}}</p>
              <p class="product-summary-text">{{productInfo.summary}}</p>
              <div class="product-price">
                <span>&yen;</span>
                <strong>{{productInfo.price}}</strong>
              </div>
            </div>
            <!-- 商品信息 -->
            <!-- 商品规格 -->
            <!-- <div class="product-sku">
              <div>
                <span class="sku-select">已选</span>
                <span class="sku-info">银色，64gb，1件，保障服务</span>
              </div>
              <span class="right-menu"></span>
            </div> -->
            <!-- 商品规格 -->

            <!-- 商品留言 -->
            <!-- <div class="product-comment">
              <div class="comment-info">
                <span class="comment-num">评价(298)</span>
                <span class="comment-percentage">好评度
                  <strong>97%</strong>
                </span>
              </div>
              <div class="comment-list">
                <div class="comment-item">
                  <div class="comment-userinfo">
                    <div class="avatar">
                      <img src="~jd/images/rem.jpg" alt="">
                      <span>xxxxxx用户</span>
                    </div>
                    <div class="comment-star">
                      <i class="star-item"></i>
                    </div>
                  </div>
                  <div class="comment-content">
                    <p class="content">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>
                    <div class="comment-images-list">
                      <img src="~jd/images/rem.jpg" alt="">
                    </div>
                  </div>
                  <div class="comment-sku">
                    <span>银色：64GB</span>
                  </div>
                  <div class="comment-more">查看全部评价</div>
                </div>
              </div>
            </div> -->
            <!-- 商品留言 -->

            <!-- 商家信息 -->
            <div class="goods-part" v-if="shopInfo">
              <div class="goods-part-info">
                <img v-lazy="shopInfo.shop_logo[0].url" alt="">
                <div>
                  <span class="goods-part-title">{{shopInfo.shop_name}}</span>
                  <span class="goods-part-summary">店铺描述 9.9</span>
                </div>
              </div>
              <div class="good-part-quantity">
                <div class="quantity-attention">
                  <strong>{{shopInfo.like_count}}</strong>
                  <span>关注人数</span>
                </div>
                <div class="quantity-prodall">
                  <strong>{{shopInfo.goods_total_num}}</strong>
                  <span>全部商品</span>
                </div>
                <div class="good-part-news">
                  <strong>9.9</strong>
                  <span>综合评分</span>
                </div>
              </div>
              <div class="good-part-service">
                <div class="good-part-contact">
                  <i></i>
                  <span>联系客服</span>
                </div>
                <div class="go-good-part">
                  <i></i>
                  <span>进店逛逛</span>
                </div>
              </div>
            </div>
            <!-- 商家信息 -->

            <!-- 为你推荐 -->
            <div class="my-recommend">
              <div class="recommend-tip">
                <img src="~jd/images/tuijian.png" alt="">
              </div>
              <ul class="recommend-list">
                <li class="recommend-item" @click="$router.push(`/product/${item.productNo}`)" v-for="(item,index) in recommendData" :key="index">
                  <div class="item-posre">
                    <img v-lazy="item.image_url[0].url" alt="">
                  </div>
                  <p class="item-product-text">{{item.productName}}</p>
                  <p class="item-product-info">
                    <span>&yen;</span>{{item.price}}</p>
                  <p class="item-product-praise">好评率100%</p>
                </li>
              </ul>
            </div>
            <!-- 为你推荐 -->
          </div>
        </load-more>
      </mt-tab-container-item>
      <!-- 商品 -->

      <!-- 商品详情 -->
      <mt-tab-container-item id="goodDetail">
        <div id="goodDetail">
          <ul class="detail-tab">
            <li :class="{active:detailTab==='description'}" @click="detailTab='description'">产品介绍</li>
            <li :class="{active:detailTab==='skuContent'}" @click="detailTab='skuContent'">规格参数</li>
            <li :class="{active:detailTab==='service'}" @click="detailTab='service'">包装售后</li>
          </ul>
          <div class="good-detail-content">
            <div class="content">
              <div v-show="detailTab==='description'">
                <div class="top-tip">
                  <span>商品信息</span>
                </div>
                <div id="prodContent-container" v-html="productInfo.content"></div>
              </div>
              <div v-show="detailTab==='skuContent'">skuContent</div>
              <div v-show="detailTab==='service'">service</div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <!-- 商品详情 -->

      <!-- 评价 -->
      <mt-tab-container-item id="goodcommentList" style="min-height: 100vh" v-if="containerTab==='goodcommentList'">

        <load-more style="width:100%;" @loadMore="commentinfiniteCallback" :commad="commadComment" :param="commentParam" :loadMoreIconVisible="false"
          ref="commentLoadmore">
          <div id="goodcommentList" v-if="commentData!=''">
            <div class="goodcomment-item" v-for="(item,index) in commentData" :key="index">
              <div class="comment-userinfo">
                <div>
                  <div class="avatar">
                    <img :src="item.avatar" alt="">
                  </div>
                  <div class="comment-username">
                    <span class="name">{{item.username}}</span>
                    <div class="starList">
                      <i class="star" v-for="(star,startIndex) in item.star" :key="startIndex"></i>
                    </div>
                  </div>
                </div>
                <span class="comment-date">{{item.createTime | DateFormat('yyyy-MM-dd hh:mm')}}</span>
              </div>
              <div class="comment-content">
                <p>{{item.content}}</p>
                <div class="comment-imageslist">
                  <img v-for="(img,imgIndex) in item.image_url" :key="imgIndex" :src="img.url" :alt="img.name">
                </div>
              </div>
              <!-- <div class="comment-sku">
                <p>规格规格规格规格规格规格</p>
              </div> -->
              <div class="comment-other">
                <span class="createDate">{{item.createTime | DateFormat('yyyy-MM-dd hh:mm')}}</span>
                <div>
                  <!-- <div class="like-icon">
                    <i></i>
                    <span>0</span>
                  </div>
                  <div class="sendcomment">
                    <i></i>
                    <span>0</span>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </load-more>
      </mt-tab-container-item>
      <!-- 评价 -->
    </mt-tab-container>
    <!-- 内容区 -->

    <!-- 底部导航栏 -->
    <div class="cart-concern-fixed">
      <div class="left">
        <div class="goods-part">
          <i></i>
          <span>店铺</span>
        </div>
        <div class="like-icon" @click="favShop">
          <i></i>
          <span>关注</span>
        </div>
        <div class="shopping-cart" @click="$router.push('/cart')">
          <i></i>
          <span>购物车</span>
        </div>
      </div>
      <div class="right" @click="addShopCart">加入购物车</div>
    </div>
    <!-- 底部导航栏 -->

    <!-- 返回顶部 -->
    <BackHead/>
    <!-- 返回顶部 -->
  </div>
</template>

<script>
  import {
    TabContainer,
    TabContainerItem,
    Swipe,
    Toast,
    SwipeItem
  } from 'mint-ui';
  import {
    getProduct,
    getShop,
    getCommentList,
    getRecommend
  } from '@/service/getData'
  import LoadMore from 'common/loadMore';
  import BackHead from 'common/backHead';

  export default {
    data() {
      return {
        containerTab: 'mainLayout',
        detailTab: 'description',
        productInfo: {},
        shopInfo: null,
        commad: getRecommend,
        recommendParam: {
          Type: 'recommend',
          pageSize: 10,
          pageIndex: 1
        },
        recommendData: [],
        swipeIndex: {
          nowIndex: 1,
          total: 0
        },
        commadComment: getCommentList,
        commentParam: {
          ProductNo: null,
          pageSize: 10,
          pageIndex: 1
        },
        commentData: [],
      };
    },

    watch: {},

    components: {
      TabContainer,
      TabContainerItem,
      Swipe,
      SwipeItem,
      LoadMore,
      BackHead
    },

    computed: {},

    methods: {
      switchTabs(Id) {
        if (this.containerTab === String(Id)) return;
        this.containerTab = Id;
        switch (String(this.containerTab)) {
          case 'mainLayout': 
            break;
          case 'goodDetail':
            break;
          case 'goodcommentList':
            setTimeout(()=>{
              this.$refs.commentLoadmore.onTopLoaded(this.$refs.commentLoadmore.uuid);
            },500)
            break;
          default: //其他
            throw new Error('未知TabId')
            break
        }
      },
      async commentinfiniteCallback(response) { //下拉加载更多评论
        if (response.Data.length > 0) {
          response.Data.map(i => {
            this.commentData.push(i)
          })
        }
      },
      async infiniteCallback(response) { //下拉加载推荐商品
        if (response.Data.length > 0) {
          response.Data.map(i => {
            this.recommendData.push(i)
          })
        }
      },
      handleChange(index) {
        this.swipeIndex.nowIndex = index + 1;
      },
      async favShop() { //收藏店铺
        await this.$store.dispatch('ShopFavorite', {
          Id: this.shopInfo._id
        });
        return Toast({
          message: '收藏店铺成功',
          position: 'bottom'
        })
      },
      async addShopCart() { //加入购物车
        let SelectedList = [{
          ProductNo: this.productInfo.productNo
        }];
        this.$store.dispatch('SelectProduct', {
          SelectedList: JSON.stringify(SelectedList),
          Increment: 1
        }).then(response => {
          return Toast({
            message: '加入购物车成功',
            position: 'bottom'
          })
        })
      },
      async initData() {
        this.commentParam.ProductNo = this.$route.params.id;
        let {
          Data
        } = await getProduct({
          ProductNo: this.$route.params.id
        });
        let shopData = await getShop({
          ShopId: Data.shopId
        });
        Data.price = Data.price.toFixed(2);
        this.productInfo = Data;
        this.swipeIndex.total = Data.image_url.length;
        this.shopInfo = shopData.Data;
      }
    },

    mounted: function () {
      this.initData();
    }
  }

</script>
<style lang='scss' scoped>


</style>
