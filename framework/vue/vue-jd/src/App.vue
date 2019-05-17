<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {}
  }

</script>

<style lang="scss">
  @import './assets/common/css/theme.scss';
  @import 'normalize.css';
  @import 'mint-ui/lib/style.css';
</style>
