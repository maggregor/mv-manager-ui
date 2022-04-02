<template>
  <a-menu @click="changeRoute" mode="horizontal">
    <a-menu-item v-for="(value, key) in routes" :key="key">{{ value.title }}</a-menu-item>
  </a-menu>
  <a-divider />
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const routes = {
      projects: {
        title: 'Projects',
        route: '/home/projects',
      },
      connection: {
        title: 'Connections',
        route: '/home/connections',
      },
      billing: {
        title: 'Billing',
        route: '/home/billing',
      },
    }
    const changeRoute = o => router.push({ path: routes[o.key].route })
    return {
      changeRoute,
      routes,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
