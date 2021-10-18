<template>
  <a-layout class="vb__layout">
    <a-layout-content>
      <div
        :class="{
          [$style.container]: true,
          vb__layout__squaredBorders: settings.isSquaredBorders,
          vb__layout__cardsShadow: true,
          vb__layout__borderless: true,
        }"
        :style="{
          backgroundImage:
            settings.authPagesColor === 'image'
              ? `url(resources/images/content/photos/8.jpeg)`
              : 'none',
        }"
      >
        <div
          :class="{
            [$style.topbar]: true,
            [$style.topbarGray]: settings.isGrayTopbar,
          }"
        >
          <div :class="$style.logoContainer">
            <h1>achilio.</h1>
          </div>
          <div v-if="authorized" :class="$style.userContainer">
            <b class="text-gray-6">{{ user.name }}</b>
            <a class="pl-3 text-primary text-weight-700" @click="logout">Logout</a><br />
            {{ user.email }}
          </div>
        </div>
        <div class="mb-5">
          <router-view v-slot="{ Component }">
            <transition :name="settings.routerAnimation" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <div class="mt-auto">
          <ul
            class="list-unstyled d-flex mb-0 flex-wrap justify-content-center"
            :class="[$style.footerNav]"
          ></ul>
          <div class="text-center">
            Copyright © {{ new Date().getFullYear() }}
            <a href="https://achilio.com" target="_blank" rel="noopener noreferrer">
              Achilio.com
            </a>
            |
            <a href="https://achilio.com/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { mapState } from 'vuex'

export default {
  name: 'AuthLayout',
  components: {},
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['user/user'])
    const authorized = computed(() => store.getters['user/user'].authorized)

    const logout = () => {
      store.dispatch('user/LOGOUT')
    }

    return {
      user,
      logout,
      authorized,
    }
  },
  computed: mapState(['settings']),
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
