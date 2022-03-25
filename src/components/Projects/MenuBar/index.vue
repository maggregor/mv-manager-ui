<template>
  <a-menu v-model="currentItem" @click="changeRoute" mode="horizontal">
    <a-menu-item v-for="menuItem in menuItems" :key="menuItem">{{
      menuItem.meta.title
    }}</a-menu-item>
  </a-menu>
</template>
<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const projectId = store.getters['selectedProjectId']
    const changeRoute = o => {
      console.log(o.key)
      let path = o.key.path.replace(':projectId', projectId)
      router.push({ path })
    }
    const currentItem = ref(route.meta.title)
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
