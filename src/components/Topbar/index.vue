<template>
  <div class="menuSimply">
    <a-row type="flex" align="middle">
      <a-col :span="6">
        <a @click="$router.push('/')" class="d-none d-md-block">
          <Logo />
        </a>
      </a-col>
      <a-col :span="12"> </a-col>
      <a-col :span="6">
        <div :class="$style.logoutContainer">
          <div v-if="authorized">
            <b class="text-gray-6">{{ user.name }} </b>
            <a class="pl-4 text-primary text-weight-600" @click="logout">Logout</a>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Logo from '@/components/Logo'
export default {
  components: { Logo },
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
