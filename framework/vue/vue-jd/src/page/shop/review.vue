<!-- review -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
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
    span {
      font-size: 18px;
      color: $red;
    }
  }

  .comment-container {
    padding: $padding;
    background: #fff;
    .commentList {
      .comment-item {
        margin: 25px 0;
        .star-container {
          @include flexbox(space-between,
          center,
          row,
          nowrap);
          img {
            max-width: 60px;
            max-height: 60px;
          }
          span {
            font-size: 16px;
            color: #999;
          }
          .starList {
            justify-content: flex-start;
            .star,
            .blur {
              width: 30px;
              height: 30px;
            }
          }
          .starTip {}
        }
        .content {
          padding: $padding;
          textarea::placeholder {
            color: #999;
          }
          textarea {
            font-size: 16px;
            width: 100%;
          }
        }
        .uploadFile-container {
          @include flexbox(flex-start,
          center,
          row,
          wrap);
          .file-data {
            margin: 0 5px;
            img {
              width: 118px;
              border: 1px dashed #999;
              height: 120px;
            }
          }
          .uploadFile {
            border: 1px dashed #999;
            @include flexbox(center,
            center,
            column,
            wrap);
            width: 120px;
            height: 120px;
            .camera {
              display: block;
              width: .85rem;
              height: .85rem;
              background: url('~jd/images/camera.png') no-repeat;
              background-size: 100%;
            }
            span {
              font-size: 14px;
              margin-top: 10px;
              color: #999;
            }
          }
        }
      }
    }
  }

</style>
<template>
  <div>
    <div class="my-header">
      <i class="back" @click="$router.go(-1)"></i>
      <strong>评价</strong>
      <span @click="commitMsg">发布</span>
    </div>
    <div class="comment-container" v-if="orderData">
      <div class="commentList">
        <div class="comment-item" v-for="(item,index) in orderData.ProductList" :key="index">
          <div class="star-container">
            <img :src="item.product.image_url[0].url" alt="">
            <span>评价：</span>
            <div class="starList">
              <i :class="star===1?'star':'blur'" v-for="(star,starIndex) in item.starList" :key="starIndex" @click="starChange(item.starList,starIndex,item)"></i>
            </div>
            <span class="starTip">{{item.starTip}}</span>
          </div>
          <div class="content">
            <textarea v-model="item.content" placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧" name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div class="uploadFile-container">
            <file-upload ref="upload" v-model="item.uploadFiles" :multiple="true" accept="image/*" post-action="http://awei.fun:3333/Unit/uploadfile"
              :maximum="5" @input-file="inputFile" @input-filter="inputFilter">
              <div class="uploadFile">
                <i class="camera"></i>
                <span>添加图片</span>
              </div>
            </file-upload>
            <div class="file-data" v-for="(file,fileIndex) in item.uploadFiles">
              <img :src="file.blob" alt="" :key="fileIndex">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueUploadComponent from 'vue-upload-component';
  import {
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {
        orderData: null
      };
    },

    watch: {},

    components: {
      FileUpload: VueUploadComponent
    },

    computed: {},

    methods: {
      starChange(data, dataIndex, parentItem) {
        let count = 0,
          tip = ['非常差', '差', '一般', '好', '非常好'];
        data.map((item, index) => {
          index <= dataIndex ? count++ : false
          this.$set(data, index, index <= dataIndex ? 1 : 0)
        })
        this.$set(parentItem, 'starTip', tip[count - 1])
      },
      inputFile: function (newFile, oldFile) {
        if (newFile && oldFile && !newFile.active && oldFile.active) {
          // 获得相应数据
          console.log('response', newFile.response)
          if (newFile.xhr) {
            //  获得响应状态码
            console.log('status', newFile.xhr.status)
          }
        }
      },
      inputFilter: function (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          // 过滤不是图片后缀的文件
          if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
            return prevent()
          }
        }
        // 创建 blob 字段 用于图片预览
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
      },
      async initData() {
        let {
          Data
        } = await this.$store.dispatch('GetOrder', {
          OrderNo: this.$route.params.OrderNo
        })
        Data.ProductList.map(item => {
          item.uploadFiles = [];
          item.content = '';
          item.starTip = '非常好'
          item.starList = [1, 1, 1, 1, 1];
        })
        this.orderData = Data;
      },
      async commitMsg() {
        this.$refs.upload.map(i => i.active = true)
        let times = setInterval(() => {
          let count = 0;
          this.$refs.upload.map(item => {
            if (item && item.uploaded) {
              count++;
            }
          })
          if (count === this.$refs.upload.length) {
            clearInterval(times)
            let commentList = [];
            this.orderData.ProductList.map(item=>{
              let count = 0,fileList = [];
              item.uploadFiles.map(i=>{
                fileList.push({
                  url: i.response.Data[0].filename,
                  name: i.response.Data[0].originalname
                })
              })
              item.starList.map(i=>{
                if(i===1)return count++;
              })
              commentList.push({
                ProductNo: item.product.productNo,
                Star: count,
                Image_url: fileList,
                Content: item.content,
                Counter: item.counter,
              })
            })
            this.$store.dispatch('CommitMessage',{
              CommentList: commentList,
              OrderNo: this.$route.params.OrderNo
            }).then(response=>{
              Toast({
                message: response.Message
              })
              setTimeout(()=>{
                this.$router.go(-1)
              },1000)
            })
          }
        }, 500)
      }
    },

    mounted: function () {
      if (!this.$route.params.OrderNo) return Toast({
        message: '订单号不能为空'
      })
      this.initData()
    }
  }

</script>
<style lang="scss" scoped>


</style>
