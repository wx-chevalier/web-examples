<template>
  <article>
    Current Users:
    <ul>
      <li v-for="user in users" :key="user.id" class="preserve-lines">{{getFullProfile(user)}}</li>
    </ul>
  </article>
</template>

<script lang="ts">
import Vue from "vue";
import { $http } from "@/helpers";
import {
  IUserOptions,
  IPaginatedResult,
  getFullProfileStr
} from "@monosample/lib";

export default Vue.extend({
  data() {
    return {
      users: [] as Partial<IUserOptions>[],
      count: 0 as number | string
    };
  },
  async mounted() {
    const result: IPaginatedResult<Partial<IUserOptions>> = await $http
      .get("api/users")
      .then(res => res.data);
    this.count = result.count;
    this.users = result.list.map(user => {
      user.createdAt = new Date(user.createdAt as Date);
      user.updatedAt = new Date(user.updatedAt as Date);
      return user;
    });
  },
  methods: {
    getFullProfile(user: IUserOptions) {
      return getFullProfileStr(user);
    }
  }
});
</script>
<style scoped>
.preserve-lines {
  white-space: pre-line;
}
</style>