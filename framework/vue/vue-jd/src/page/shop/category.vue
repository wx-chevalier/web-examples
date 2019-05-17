<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .categoryBody {
    display: flex;
    flex: 1;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;

    .rootListcontent {
      border-right: 1px solid #eee;
      list-style: none;
      min-height: 85vh;
      li {
        padding: .25rem .15rem;
        text-align: center;
        font-size: 12px;
        color: #333;
        background: #fff;
        @include textoverflow(1);
        line-height: 2;
        border-bottom: 1px solid #eee;
        &:last-child {
          border: none;
        }
        &.active {
          background: #F5F5F5;
          color: #f23030;
        }
      }
    }
    .jd-categoryContent {
      padding: 0rem .3rem 0;
      .categoryContentBox {
        @include flexbox(flex-start, flex-start, row, wrap);
        padding: .4rem 0; // min-height: 86vh;
        background: #fff;
        >p {
          @include flexbox(center, center, row, nowrap);
          color: #999;
          font-size: 14px;
        }
      }
      .categorytItem {
        width: 33%;
        height: 3rem;
        background: #fff;
        @include flexbox(center, center, column, wrap);
        flex: initial;
        font-size: 13px;
        color: #999;
        text-align: center;
        p {
          @include textoverflow(1);
          padding: .1rem 0;
        }
        img {
          width: 55px;
          height: 55px;
        }
      }
    }
  }

</style>

<!-- category -->
<template>
  <div>
    <search-bar :Status="true">
      <div class="scanCode" slot="left-icon">
        <i class="searchIcon searchQrcodeIcon"></i>
      </div>
      <div class="searchMsg" slot="right-icon">
        <i class="searchIcon searchMsgIcon"></i>
      </div>
    </search-bar>
    <div style="height: 1.255rem;"></div>
    <div class="categoryBody">
      <!-- 分类列表 -->
      <div class="rootList" style="width:20%;">
        <load-more ref="rootScroll" style="height:85%;">
          <ul class="rootListcontent">
            <li :class="selectedRoot === item.Id ? 'active' : ''" @click="rootScrollTo(item)" v-for="(item,index) in categoryBody.categoryRoot"
              v-if="categoryBody.categoryRoot!=null">{{item.name}}</li>
          </ul>
        </load-more>
      </div>
      <!-- 分类列表 -->

      <!-- 分类下的产品目录 -->
      <div class="jd-category-content" style="width: 85%;">
        <load-more  :loadMoreIconVisible="false" ref="loadMore" style="width: 100%;height:85%;left:initial;right:0;">
          <div class="jd-categoryContent">
            <div class="categoryContentBox" v-if="categoryBody.categoryList!=null && categoryBody.categoryList.length>0">
              <div class="categorytItem" v-for="(item,index) in categoryBody.categoryList" :key="index" @click="$router.push({path: '/searchRusult',query: {categoryId:item.Id}})">
                <img :src="item.image_url" alt="" />
                <p>{{item.name}}</p>
              </div>
            </div>
            <div class="categoryContentBox" v-else>
              <p>暂无数据</p>
            </div>
          </div>
        </load-more>
      </div>
      <!-- 分类下的产品目录 -->
    </div>
    <FooterView/>
  </div>
</template>

<script>
  import FooterView from 'component/footer/footerView';
  import SearchBar from 'page/shop/searchBar';
  import LoadMore from 'common/loadMore';
  import ErrorImage from 'assets/common/images/404.png';
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        selectedRoot: 0,
        ErrorImage,
        categoryBody: {
          categoryRoot: null,
          categoryList: null
        }
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
        'categoryData'
      ])
    },

    methods: {
      ...mapMutations([
        'SET_CATEGORY_DATA'
      ]),
      async rootScrollTo(item) {
        this.selectedRoot = item.Id;
        let { Data } = await this.$store.dispatch('GetCategoryList',{RootId: item.Id });
        Data.map(i=>{
          try{
            i.image_url = i.image_url[0].url
          }catch(err){
            i.image_url = this.ErrorImage
          }
        })
        this.categoryBody.categoryList = Data;
      },
      async initData(){
        if(!this.categoryData){
          let res = await this.$store.dispatch('GetCategoryList',{RootId: "0"});
          this.SET_CATEGORY_DATA(res)
          this.selectedRoot = res.Data[0].Id;
          this.categoryBody.categoryRoot = res.Data;
          this.rootScrollTo(res.Data[0]);
        }else{
          this.selectedRoot = this.categoryData.Data[0].Id;
          this.categoryBody.categoryRoot = this.categoryData.Data;
        }
      }
    },
    mounted: function () {
      this.initData();
    }
  }

</script>
<style lang='scss' scoped>


</style>
