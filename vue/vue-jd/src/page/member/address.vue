<!-- address -->
<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss';
  .address-from {
    background: #fff;
    .cell-from-item {
      @include flexbox(flex-start, center, row, nowrap);
      padding: 15px $padding;
      border-bottom: 1px solid #eee;
      .title {
        font-size: $subtitle;
        color: #333;
        white-space: nowrap;
      }
      .content {
        width: 70%;
        @include placeholderColor($gray);
        input {
          width: 100%;
          border: none;
          outline: none;
          box-shadow: none;
          text-shadow: none;
          text-align: left;
          font-size: $subtitle;
          color: #333;
        }
      }
    }
    .save-address {
      position: fixed;
      bottom: .2rem;
      width: 70%;
      text-align: center;
      padding: $padding 0;
      background: $red;
      font-size: $title;
      color: #fff;
      margin: 0 1.5rem;
      border-radius: 2px;
    }
  }

  .address-pricker {
    @include wh(100%, 70%);
    .address-picker-header {
      position: relative;
      p {
        padding: $padding 0;
        font-size: 15px;
        color: #333;
        text-align: center;
      }
      .picker-close {
        position: absolute;
        right: 10px;
        bottom: 7px;
        font-weight: normal;
        font-size: 25px;
        color: #999;
        opacity: .7;
      }
    }
  }

  .popupVisible {
    transform: scale(0.95) !important;
  }

</style>
<template>
  <div style="height:100%;">
    <div style="transition:1s;background:#000;height:100%;">
      <div class="address-from" style="transition:1s;height:100%;transform: scale(1);" :class="addressVisible? 'popupVisible' : ''">
        <div class="cell-from-item">
          <span class="title">收货人：</span>
          <div class="content">
            <input type="text" v-focus v-model="addressForm.nickName">
          </div>
        </div>
        <div class="cell-from-item">
          <span class="title">联系方式：</span>
          <div class="content">
            <input type="text" v-model="addressForm.phone">
          </div>
        </div>
        <div class="cell-from-item" @click="()=>addressVisible=true" style="justify-content:space-between;">
          <span class="title">所在地区：</span>
          <div class="content">
            <input type="text" :value="addressForm.province + addressForm.city + addressForm.area" placeholder="">
          </div>
          <i class="arrow-right" style="opacity: .4"></i>
        </div>
        <div class="cell-from-item">
          <span class="title">详细地址：</span>
          <div class="content">
            <input type="text" placeholder="街道、楼牌号" v-model="addressForm.address">
          </div>
        </div>
        <div class="cell-from-item">
          <span class="title">设为默认地址：</span>
          <div class="content">
            <mt-switch v-model="addressForm.selected"></mt-switch>
          </div>
        </div>
        <div class="save-address" @click="saveAddress">保存</div>
      </div>
    </div>
    <div>
      <mt-popup v-model="addressVisible" position="bottom" class="address-pricker">
        <div class="address-picker-header">
          <p>配送至</p>
          <span class="picker-close">&times;</span>
        </div>
        <v-distpicker :placeholders="{ province: '请选择', city: '请选择', area: '请选择' }" wrapper="address-pricker-wrapper" type="mobile"
          @selected="onSelected"></v-distpicker>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import {
    Switch,
    Toast
  } from 'mint-ui'
  import VDistpicker from 'v-distpicker'
  export default {
    data() {
      return {
        addressForm: {
          nickName: '',
          phone: '',
          province: '',
          city: '',
          area: '',
          address: '',
          selected: false
        },
        addressVisible: false,
      };
    },

    watch: {},

    components: {
      VDistpicker
    },

    computed: {},

    methods: {
      async saveAddress(){
        let params = {
          Phone: this.addressForm.phone,
          Province: this.addressForm.province,
          City: this.addressForm.city,
          Area: this.addressForm.area,
          Address: this.addressForm.address,
          Selected: this.addressForm.selected ? 1 : 9,
        };
        if(this.$route.params.Id){ //有传Id则是编辑模式 没传是新增
          params.Id = this.$route.params.Id
        }
        this.$store.dispatch('SaveAddress',params).then(response=>{
          Toast({
            message: response.Message
          })
        })
      },
      onSelected(data) {
        this.addressVisible = false;
        this.addressForm.province = data.province.value;
        this.addressForm.city = data.city.value;
        this.addressForm.area = data.area.value;
      },
      async initData(){
        if(this.$route.params.Id){
          let { Data } = await this.$store.dispatch('GetAddress',{Id:this.$route.params.Id});
          this.addressForm.nickName = Data.nickName;
          this.addressForm.phone = Data.Phone;
          this.addressForm.province = Data.Province;
          this.addressForm.city = Data.City;
          this.addressForm.area = Data.Area;
          this.addressForm.address = Data.Address;
          this.addressForm.selected = Data.Selected===1 ? true : false;
        }
      }
    },

    mounted: function () {
      this.initData();
    }
  }

</script>
<style lang="scss" scoped>


</style>
