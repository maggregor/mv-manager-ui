<template>
  <LoadingScreen :is-loading="isAccountLoading" />
  <Unreachable v-if="isUnreachable" />
  <div v-else-if="!isAccountLoading">
    <styleLoader />
    <localization />
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { mapGetters, useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import qs from 'qs'
import Localization from '@/localization'
import StyleLoader from '@/styleLoader'
import LoadingScreen from '@/components/LoadingScreen'
import Unreachable from '@/components/Errors/Unreachable'
import NProgress from 'nprogress'
export default {
  name: 'App',
  components: { Localization, StyleLoader, LoadingScreen, Unreachable },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const routeTitle = computed(() => route.meta.title)
    const currentRoute = computed(() => route)
    const authorized = computed(() => store.getters['user'].authorized)
    const loading = computed(() => store.getters.loading)
    const isAccountLoading = ref(true)
    // watch page title change
    watch([routeTitle], ([routeTitle]) => (document.title = `Achilio | ${routeTitle}` || `Achilio`))

    // initial auth check
    onMounted(async () => {
      await store.dispatch('LOAD_CURRENT_ACCOUNT')
    })

    watch(loading, async loading => {
      if (loading && !isAccountLoading.value) {
        NProgress.start()
      } else {
        NProgress.done()
      }
    })

    // redirect if authorized and current page is login
    watch(authorized, async authorized => {
      if (authorized) {
        await store.dispatch('LOAD_CONNECTION')
        store.dispatch('LOAD_ALL_BILLING')
        store.dispatch('LOAD_ALL_PROJECTS')
        const query = qs.parse(currentRoute.value.fullPath.split('?')[1], {
          ignoreQueryPrefix: true,
        })
        router.push(query.redirect || '/')
      } else {
        store.dispatch('clearAll', { root: true })
      }
      setTimeout(() => (isAccountLoading.value = false), 300)
    })
    return {
      loading,
      isAccountLoading,
    }
  },
  computed: {
    ...mapGetters(['loading', 'isUnreachable']),
  },
}
</script>
