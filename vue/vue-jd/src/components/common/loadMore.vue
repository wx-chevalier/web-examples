<template>
  <div class="loadmore" 
        id="ScrollLoadMore"
        v-infinite-scroll="onloadMoreScroll"
        :infinite-scroll-disabled="LoadMoreLoading"
        :infinite-scroll-distance="0"
        v-if="!LoadMoreError"
    >
    <div class="loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}" :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
      <slot name="top">
        <div class="loadmore-top" v-if="topMethod">
          <div v-if="topStatus !== 'loading'" :class="topStatus === 'drop' ? 'drop' : 'pull'">
                <icon v-if="loadMoreIconVisible" :class="['arrow-down',topStatus === 'drop'? 'arrow-drop':'arrow-pull']" name="long-arrow-down" scale="1.1"></icon>
                <span>{{topStatus === 'drop' ? '释放更新' : '下拉刷新'}}</span>
            </div>
            <div v-if="topStatus === 'loading'">
                <mt-spinner :size="20" type="fading-circle"></mt-spinner>
                <span>{{topText}}</span>
            </div>
        </div>
      </slot>
      <slot></slot>
      <slot name="LoadmoreText">
          <div v-if="!AllLoaded && LoadMoreLoading" class="loadmoreText">
            <mt-spinner v-if="loadMoreIconVisible" :size="20" type="fading-circle"></mt-spinner>
            <span>加载中...</span>
          </div>
          <div v-if="AllLoaded" class="loadmoreText AllLoaded">
            <span>没有更多了</span>
          </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .loadmoreText{
      /* background: #f0f3f5; */
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      background: transparent;
      padding: 10px 0;
      >span{
        padding-left: 10px;
      }
  }
  .AllLoaded{
      color: #999;
      padding: 15px 0;
  }
  .arrow-down {
    color: #ccc;
    transition: .2s;
  }

  .arrow-pull {
    transform: rotate(0deg);
  }

  .arrow-drop {
    transform: rotate(-180deg);
  }

  .loadmore-top {
    >div {
      font-size: 15px;
      color: #666;
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      >span {
        padding-left: 10px;
      }
    }
  }
  @component-namespace mint {
    @component loadmore {
      overflow: hidden;
      @descendent content {
        @when dropped {
          transition: .2s;
        }
      }
      @descendent top, bottom {
        text-align: center;
        height: 50px;
        line-height: 50px;
      }
      @descendent top {
        margin-top: -50px;
      }
      @descendent bottom {
        margin-bottom: -50px;
      }
      @descendent spinner {
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle;
      }
      @descendent text {
        vertical-align: middle;
      }
    }
  }
</style>

<script type="text/babel">
  import 'vue-awesome/icons/long-arrow-down'
  import Icon from 'vue-awesome/components/Icon';
  import { Spinner, InfiniteScroll  } from 'mint-ui';
  export default {
    name: 'mt-loadmore',
    props: {
      maxDistance: {
        type: Number,
        default: 0
      },
      loadMoreIconVisible: {
        type: Boolean,
        default: true
      },
      autoFill: {
        type: Boolean,
        default: true
      },
      distanceIndex: {
        type: Number,
        default: 2
      },
      topPullText: {
        type: String,
        default: '下拉刷新'
      },
      topDropText: {
        type: String,
        default: '释放更新'
      },
      topLoadingText: {
        type: String,
        default: '加载中...'
      },
      topDistance: {
        type: Number,
        default: 70
      },
      topMethod: {
        type: Function
      },
      bottomPullText: {
        type: String,
        default: '上拉刷新'
      },
      bottomDropText: {
        type: String,
        default: '释放更新'
      },
      commad: {
        type: Function
      },
      param: {
        type: Object,
        default: ()=>{
          return {
            pageIndex: 1,
            pageSize: 10
          }
        }
      },
      bottomLoadingText: {
        type: String,
        default: '加载中...'
      },
      bottomDistance: {
        type: Number,
        default: 70
      },
      bottomMethod: {
        type: Function
      },
      bottomAllLoaded: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        uuid: null,
        translate: 0,
        scrollEventTarget: null,
        containerFilled: false,
        topText: '',
        LoadMoreError:false,
        topDropped: false,
        bottomText: '',
        bottomDropped: false,
        bottomReached: false,
        direction: '',
        startY: 0,
        startScrollTop: 0,
        currentY: 0,
        topStatus: '',
        bottomStatus: '',
        LoadMoreLoading: false,
        AllLoaded:false
      };
    },
    components:{
        Icon,
        Spinner,
        InfiniteScroll
    },
    watch: {
      translate(val){
        this.$emit('translate-change',val);
      },
      topStatus(val) {
        this.$emit('top-status-change', val);
        switch (val) {
          case 'pull':
            this.topText = this.topPullText;
            break;
          case 'drop':
            this.topText = this.topDropText;
            break;
          case 'loading':
            this.topText = this.topLoadingText;
            break;
        }
      },
      bottomStatus(val) {
        this.$emit('bottom-status-change', val);
        switch (val) {
          case 'pull':
            this.bottomText = this.bottomPullText;
            break;
          case 'drop':
            this.bottomText = this.bottomDropText;
            break;
          case 'loading':
            this.bottomText = this.bottomLoadingText;
            break;
        }
      }
    },
    methods: {
      async onloadMoreScroll(){
          if(this.AllLoaded || this.LoadMoreLoading || !this.commad)return;
          this.LoadMoreLoading = true;
          let response = await this.commad(this.param).catch(()=>{
            this.LoadMoreError = true;
            this.LoadMoreLoading = false;
            throw new Error('the commad is Error !')
          });
          try {
            if(response.Data.length<=0 /*|| response.total <= (this.param.pageIndex*this.param.pageSize)*/){
                this.AllLoaded = true;
                return this.LoadMoreLoading = false;
            };
          } catch (error) {
              this.AllLoaded = true;
              return this.LoadMoreLoading = false;
          }
          setTimeout(() => {
            this.$emit('loadMore',response);
            this.param.pageIndex +=1;
            this.LoadMoreLoading = false;
          }, 500);
      },
      async onTopLoaded(id) {
        if (id === this.uuid) {
          this.translate = 0;
          this.topStatus = 'pull';
          this.AllLoaded = false;
          this.LoadMoreLoading = false;
          await this.onloadMoreScroll();
        }
      },
      onBottomLoaded(id) {
        this.bottomStatus = 'pull';
        this.bottomDropped = false;
        if (id === this.uuid) {
          this.$nextTick(() => {
            if (this.scrollEventTarget === window) {
              document.body.scrollTop += 50;
            } else {
              this.scrollEventTarget.scrollTop += 50;
            }
            this.translate = 0;
          });
        }
        if (!this.bottomAllLoaded && !this.containerFilled) {
          this.fillContainer();
        }
      },
      getScrollEventTarget(element) {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
      },
      getScrollTop(element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {
          return element.scrollTop;
        }
      },
      bindTouchEvents() {
        this.$el.addEventListener('touchstart', this.handleTouchStart);
        this.$el.addEventListener('touchmove', this.handleTouchMove);
        this.$el.addEventListener('touchend', this.handleTouchEnd);
      },
      init() {
        this.topStatus = 'pull';
        this.bottomStatus = 'pull';
        this.topText = this.topPullText;
        this.scrollEventTarget = this.getScrollEventTarget(this.$el);
        if (typeof this.bottomMethod === 'function') {
          this.fillContainer();
          this.bindTouchEvents();
        }
        if (typeof this.topMethod === 'function') {
          this.bindTouchEvents();
        }
      },
      fillContainer() {
        if (this.autoFill) {
          this.$nextTick(() => {
            if (this.scrollEventTarget === window) {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                  document.documentElement.getBoundingClientRect().bottom;
            } else {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                  this.scrollEventTarget.getBoundingClientRect().bottom;
            }
            if (!this.containerFilled) {
              this.bottomStatus = 'loading';
              this.bottomMethod(this.uuid);
            }
          });
        }
      },
      checkBottomReached() {
        if (this.scrollEventTarget === window) {
          return document.body.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight;
        } else {
          return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom;
        }
      },
      handleTouchStart(event) {
        this.startY = event.touches[0].clientY;
        this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
        this.bottomReached = false;
        if (this.topStatus !== 'loading') {
          this.topStatus = 'pull';
          this.topDropped = false;
        }
        if (this.bottomStatus !== 'loading') {
          this.bottomStatus = 'pull';
          this.bottomDropped = false;
        }
      },
      handleTouchMove(event) {
        if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
          return;
        }
        this.currentY = event.touches[0].clientY;
        let distance = (this.currentY - this.startY) / this.distanceIndex;
        this.direction = distance > 0 ? 'down' : 'up';
        if (typeof this.topMethod === 'function'  && this.direction === 'down' &&
            this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading') {
          event.preventDefault();
          event.stopPropagation();
          if (this.maxDistance > 0) {
            this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
          } else {
            this.translate = distance - this.startScrollTop;
          }
          if (this.translate < 0) {
            this.translate = 0;
          }
          this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
        }
        if (this.direction === 'up') {
          this.bottomReached = this.bottomReached || this.checkBottomReached();
        }
        if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&
            this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
          event.preventDefault();
          event.stopPropagation();
          if (this.maxDistance > 0) {
            this.translate = Math.abs(distance) <= this.maxDistance
                ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
          } else {
            this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
          }
          if (this.translate > 0) {
            this.translate = 0;
          }
          this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
        }
      },
      handleTouchEnd() {
        if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
          this.topDropped = true;
          if (this.topStatus === 'drop') {
            this.translate = '50';
            this.topStatus = 'loading';
            this.topMethod(this.uuid);
          } else {
            this.translate = '0';
            this.topStatus = 'pull';
          }
        }
        if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
          this.bottomDropped = true;
          this.bottomReached = false;
          if (this.bottomStatus === 'drop') {
            this.translate = '-50';
            this.bottomStatus = 'loading';
            this.bottomMethod(this.uuid);
          } else {
            this.translate = '0';
            this.bottomStatus = 'pull';
          }
        }
        this.direction = '';
      }
    },
    mounted() {
      this.uuid = Math.random().toString(36).substring(3, 8);
      this.init();
    }
  };
</script>
<style lang="scss">
.loadmore-content{
  min-height: 100vh;
  margin-bottom: 5px;
}
</style>
