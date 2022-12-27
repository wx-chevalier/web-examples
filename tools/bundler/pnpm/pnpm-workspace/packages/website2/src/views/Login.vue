<template>
  <form @submit.prevent="submit">
    <smp-hello-world message="This is vue"></smp-hello-world>
    <section>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="params.email" required />
    </section>
    <section>
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="params.password" required />
    </section>
    <section>
      <button type="submit">Sign in.</button>
    </section>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import jwt from "@/helpers/jwt.helper";
import { $http } from "@/helpers";
import { IUserOptions, IAuthResponse } from "@monosample/lib";

export default Vue.extend({
  data() {
    return {
      params: { email: "", password: "" } as Required<IUserOptions>
    };
  },
  methods: {
    async submit() {
      const result: IAuthResponse = await $http
        .post("auth/login", this.params)
        .then(res => res.data);
      jwt.setToken(result.token, result.user);
    }
  }
});
</script>