<template>
  <div :class="$style.container">
    <h1 class="text-black text-weight-700 font-size-50">Hello {{ firstName }},</h1>
    <!-- Description -->
    <MenuBar />
    <router-view class="mt-5" v-slot="{ Component }">
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
