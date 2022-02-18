<template>
  <div class="container">
    <div class="header">
      <OptimizationHeader v-if="optimization" :optimization="optimization.optimization" />
    </div>
    <div class="results">
      <div v-if="appliedResults.length" class="mb-5">
        <h1 class="mb-4">{{ appliedResults.length }} applied</h1>
        <OptimizationResultList :results="appliedResults" />
      </div>
      <div v-if="notAppliedResults.length" class="mb-5">
        <h1 class="mb-4">{{ notAppliedResults.length }} not applied</h1>
        <OptimizationResultList :results="notAppliedResults" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch } from '@vue/runtime-core'
import { getOptimizations } from '@/services/axios/backendApi'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

import OptimizationHeader from '@/components/Optimization/OptimizationHeader'
import OptimizationResultList from '@/components/Optimization/OptimizationResultList'

export default {
  name: 'Details',
  components: { OptimizationHeader, OptimizationResultList },
  setup() {
    const route = useRoute()
    const store = useStore()
    const projectId = computed(() => route.params.projectId)
    const optimizationId = computed(() => route.params.optimizationId)
    const optimization = computed(() => store.getters['optimizations/currentOptimization'])
    watch(
      () => route,
      () => {
        if (projectId.value && optimizationId.value) {
          store.dispatch('optimizations/LOAD_OPTIMIZATION_DETAILS', {
            projectId: projectId.value,
            optimizationId: optimizationId.value,
          })
        }
      },
      { deep: true, immediate: true },
    )
    const results = computed(() => (optimization.value.results ? optimization.value.results : []))
    const appliedResults = computed(() => results.value.filter(o => o.status === 'APPLY'))
    const notAppliedResults = computed(() =>
      results.value ? results.value.filter(o => o.status === 'PLAN_LIMIT_REACHED') : [],
    )
    return {
      store,
      results,
      optimization,
      appliedResults,
      notAppliedResults,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
