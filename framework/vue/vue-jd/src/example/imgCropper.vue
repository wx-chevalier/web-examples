<!-- cropper 
文档
https://github.com/xyxiao001/vue-cropper
-->
<template>
  <vueCropper
  ref="cropper"
  :img="option.img"
  :outputType="option.outputType"
  :info="option.info"
  :canScale="option.canScale"
  :autoCrop="option.autoCrop"
  :autoCropWidth="option.autoCropWidth"
  :autoCropHeight="option.autoCropHeight"
  :canMoveBox="option.canMoveBox"
  :fixedBox="option.fixedBox"
  
  ></vueCropper>
</template>
<script>
  import vueCropper from 'vue-cropper'
  export default {
    data() {
      return {
        option: {
          img: 'http://img5.imgtn.bdimg.com/it/u=3774060300,3554869785&fm=27&gp=0.jpg',
          outputType: 'jpg',
          info: false,
          canScale:true,
          autoCrop: true,
          autoCropWidth: 150,
          autoCropHeight: 150,
          canMoveBox: false,
          fixedBox: true
        }
      };
    },

    watch: {},

    components: {
      vueCropper
    },

    computed: {},

    methods: {},

    mounted: function () {
    }
  }

</script>
<style lang='scss' scoped>


</style>
