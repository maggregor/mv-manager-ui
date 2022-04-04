<template>
  <a-menu v-model:selectedKeys="selected" @click="changeRoute" mode="horizontal">
    <a-menu-item v-for="route in allRoutes" :key="route.key">{{ route.title }}</a-menu-item>
  </a-menu>
  <a-divider />
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from '@vue/runtime-core'
export default {
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const changeRoute = o => router.push({ path: props.routes.find(r => r.key === o.key).route })
    const currentRoute = () => {
      const currentRoute = props.routes.find(r => r.route === route.fullPath)
      return currentRoute ? currentRoute.key : null
    }
    let selected = ref([currentRoute()])
    watch(route, () => {
      const current = currentRoute()
      selected = ref([current])
    })
    return {
      selected,
      changeRoute,
      allRoutes: props.routes,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
