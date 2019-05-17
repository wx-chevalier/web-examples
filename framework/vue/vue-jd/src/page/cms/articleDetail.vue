<!-- articleDetail -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .article-container {
    .con {
      padding: 20px $padding;
      background: #fff;
      height: 100%;
      .titile {
        font-size: 22px;
        font-weight: bold;
        @include textoverflow(3);
      }
      .summary {
        font-size: 15px;
        color: #999;
        margin: 20px 0;
      }
    }
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

  }

</style>
<style lang="scss">
  .article-container .content {
    padding: 15px 0;

  }

  .article-container .content * {
    max-width: 100% !important;
    width: 100% !important;
    line-height: 1.5 !important;
    font-size: 16px !important;
    height: auto !important;
  }

</style>
<template>
  <div class="article-container" v-if="articleData">
    <div class="my-header">
      <i class="back" @click="$router.go(-1)"></i>
      <strong>资讯详情</strong>
      <i class="myMsg"></i>
    </div>
    <div class="con">
      <p class="titile">{{articleData.article_title}}</p>
      <p class="summary">{{articleData.summary}}</p>
      <d-player :contextmenu="[1,2,3,4]" v-if="articleData.type==='video'" :screenshot="true" :loop="true" :autoplay="true" :video="articleData.VideoData"></d-player>
      <div class="content" v-html="articleData.content"></div>
    </div>
  </div>
</template>

<script>
  import VueDPlayer from 'vue-dplayer'
  export default {
    data() {
      return {
        articleData: null
      };
    },

    watch: {},

    components: {
      'd-player': VueDPlayer
    },

    computed: {},

    methods: {
      async initData() {
        let {
          Data
        } = await this.$store.dispatch('GetArticle', {
          Id: this.$route.params.Id
        })
        if (Data.type === 'video') {
          Data.VideoData = {
            url: Data.media_video[0].url,
            pic: Data.image_url[0].url
          }
        }
        this.articleData = Data;
      }
    },

    mounted: function () {
      if (!this.$route.params.Id) return Toast({
        message: '无效的Id'
      })
      this.initData()
    }
  }

</script>
<style lang="scss" scoped>


</style>
