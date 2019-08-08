<!--  -->
<template>
  <div>
    <VueQrcode  value="Hello, World!" :options="{ size: 300 }" />
  </div>
</template>

<script>
  import VueQrcode from '@xkeshi/vue-qrcode'
  export default {
    data() {
      return {};
    },

    watch: {},

    components: {
    VueQrcode
    },

    computed: {},

    methods: {},

    mounted: function () {}
  }

</script>
<style lang='scss' scoped>


</style>
