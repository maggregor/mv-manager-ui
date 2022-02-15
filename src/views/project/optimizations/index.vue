<template>
  <div class="container">
    <a-row type="flex">
      <a-col span="7" class="pr-4">
        <h1 class="mb-4">History</h1>
        <OptimizationHeaderList :optimizations="optimizations" />
      </a-col>
      <a-col v-if="route.params.optimizationId" span="17" class="pl-4">
        <h1 class="mb-4">Optimization #{{ route.params.optimizationId }}</h1>
        <router-view v-slot="{ Component }">
          <transition name="zoom-fadein" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import OptimizationHeaderList from '@/components/Optimization/OptimizationHeaderList'
import { computed, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
export default {
  name: 'Optimizations',
  components: { OptimizationHeaderList },
  setup() {
    const store = useStore()
    const route = useRoute()
    const projectId = ref(route.params.projectId)
    store.dispatch('optimizations/LOAD_OPTIMIZATIONS', { projectId: projectId.value })
    const currentOptimization = computed(() => store.getters['optimizations/currentOptimization'])
    const optimizations = computed(() => {
      return store.getters['optimizations/optimizations'].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
      )
    })
    return { optimizations, currentOptimization, route }
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
