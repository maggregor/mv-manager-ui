<template>
  <div :class="$style.container">
    <h1 class="text-black text-weight-700 font-size-50">Hello {{ firstName }},</h1>
    <h2 class="text-gray-7 text-weight-300 font-size-24">
      You are connected to your
      <span class="google-font text-weight-500 mr-2">Google Cloud Platform</span>
      <img :style="{ height: '2rem' }" src="@/assets/google/google-cloud-platform_logo.svg" />
    </h2>
    Cannot find your project or organization ? Try
    <a-button type="link" :loading="isSynchronizing" @click="synchronize">re-syncing</a-button>
    or check the access.
    <MenuBar />
    <router-view class="mt-4" v-slot="{ Component }">
      <transition name="zoom-fadein" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { mapGetters, useStore } from 'vuex'
import MenuBar from '@/components/Home/MenuBar'

export default {
  name: 'Home',
  components: {
    MenuBar,
  },
  setup() {
    const store = useStore()
    const synchronize = async () => store.dispatch('SYNCHRONIZE_PROJECTS')
    return {
      synchronize,
    }
  },
  computed: {
    ...mapGetters(['firstName', 'synchronize', 'isSynchronizing']),
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
