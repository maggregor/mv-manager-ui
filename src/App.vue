<template>
  <styleLoader />
  <localization />
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import qs from 'qs'
import Localization from '@/localization'
import StyleLoader from '@/styleLoader'

export default {
  name: 'App',
  components: { Localization, StyleLoader },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const logo = computed(() => store.getters.settings.logo)
    const routeTitle = computed(() => route.meta.title)
    const currentRoute = computed(() => route)
    const authorized = computed(() => store.getters['user'].authorized)

    // watch page title change
    watch(
      [logo, routeTitle],
      ([logo, routeTitle]) => (document.title = `${logo} | ${routeTitle}` || `${logo}`),
    )

    // initial auth check
    onMounted(() => {
      store.dispatch('LOAD_CURRENT_ACCOUNT')
    })

    // redirect if authorized and current page is login
    watch(authorized, async authorized => {
      if (authorized) {
        // TODO: Move to project
        await store.dispatch('LOAD_ALL_PROJECTS')
        const query = qs.parse(currentRoute.value.fullPath.split('?')[1], {
          ignoreQueryPrefix: true,
        })
        router.push(query.redirect || '/')
      } else {
        store.dispatch('clearAll', { root: true })
      }
    })
  },
}
</script>
