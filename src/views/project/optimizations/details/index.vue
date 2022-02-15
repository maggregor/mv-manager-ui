<template>
  <div class="container">
    <div class="header">
      <OptimizationHeader
        v-if="optimization"
        :optimization="optimization.optimization"
        :mv-applied-count="appliedResults.length"
        :mv-proposal-count="appliedResults.length + notAppliedResults.length"
        :mv-plan-max="24"
        :created-by="'unknowndu75@gmail.com'"
      />
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
import { onMounted } from '@vue/runtime-core'
import { getOptimizations } from '@/services/axios/backendApi'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

import OptimizationHeader from '@/components/Optimization/OptimizationHeader'
import OptimizationResultList from '@/components/Optimization/OptimizationResultList'

export default {
  name: 'Details',
  components: { OptimizationHeader, OptimizationResultList },
  setup() {
    const route = useRoute()
    const projectId = route.params.projectId
    const optimizationId = route.params.optimizationId
    const optimization = ref()
    onMounted(async () => {
      optimization.value = await getOptimizations({ projectId, optimizationId })
    })
    const results = computed(() => (optimization.value ? optimization.value.results : []))
    const appliedResults = computed(() => results.value.filter(o => o.status === 'APPLY'))
    const notAppliedResults = computed(() =>
      results.value.filter(o => o.status === 'PLAN_LIMIT_REACHED'),
    )
    return {
      optimization,
      appliedResults,
      notAppliedResults,
    }
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
