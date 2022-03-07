<template>
  <div
    :class="{
      [$style.menuSimply]: true,
      [$style.menuSimply__white]: true,
      [$style.menuSimply__gray]: false,
    }"
  >
    <a @click="$router.push('/')" :class="$style.menuSimply__logo" class="d-none d-md-block">
      <div :class="$style.menuSimply__logo__name">
        achilio <span class="text-weight-400 font-size-18">beta</span>
      </div>
      <div :class="$style.menuSimply__logo__descr">FOR BIGQUERY</div>
    </a>
    <div :class="$style.logoutContainer">
      <div v-if="authorized">
        <b class="text-gray-6">{{ user.name }} </b>
        <a class="pl-4 text-primary text-weight-600" @click="logout">Logout</a>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  components: {},
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['user'])
    const authorized = computed(() => store.getters['user'].authorized)
    const logout = () => {
      store.dispatch('LOGOUT')
    }
    return {
      user,
      logout,
      authorized,
    }
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
