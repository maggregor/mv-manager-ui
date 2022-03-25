<template>
  <a-menu v-model="currentItem" @click="changeRoute" mode="horizontal">
    <a-menu-item v-for="menuItem in menuItems" :key="menuItem">{{
      menuItem.meta.title
    }}</a-menu-item>
  </a-menu>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const projectId = computed(() => store.getters['selectedProjectId'])
    const changeRoute = o => {
      router.push({ path: o.key.path.replace(':projectId', projectId.value) })
    }
    const currentItem = computed(() => route)
    return {
      changeRoute,
      currentItem,
      menuItems: router.getRoutes().filter(o => o.meta.projectMenuBar),
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
