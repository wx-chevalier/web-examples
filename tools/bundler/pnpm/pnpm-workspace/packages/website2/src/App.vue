<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!authenticated" to="/">Sign in |</router-link>
      <router-link v-if="!authenticated" to="/signup">Sign up |</router-link>
      <router-link v-if="authenticated" to="/users">Users</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import jwt from "./helpers/jwt.helper";
export default Vue.extend({
  computed: {
    authenticated() {
      return jwt.isAuthenticated();
    }
  }
});
</script>