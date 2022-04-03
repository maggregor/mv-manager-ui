<template>
  <div :class="$style.container">
    <h1 class="text-black text-weight-700 font-size-50">Hello {{ firstName }},</h1>
    To start using Achilio, first
    <a-button type="link" class="small-button" @click="$router.push('/home/connections')"
      >create a connection</a-button
    >
    to your Datasource and then register a project
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
  computed: {
    ...mapGetters(['firstName', 'allConnections']),
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
