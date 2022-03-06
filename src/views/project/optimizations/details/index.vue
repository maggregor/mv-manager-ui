<template>
  <a-spin size="large" :spinning="loading">
    <div class="container" v-if="optimization">
      <h1 class="mb-4">Optimization #{{ optimization.id }}</h1>
      <div class="header">
        <OptimizationHeader :optimization="optimization" />
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
  </a-spin>
</template>

<script>
import { useRoute } from 'vue-router'
import { mapGetters, useStore } from 'vuex'

import OptimizationHeader from '@/components/Optimization/OptimizationHeader'
import OptimizationResultList from '@/components/Optimization/OptimizationResultList'
import { onMounted, watch } from '@vue/runtime-core'

export default {
  name: 'Details',
  components: { OptimizationHeader, OptimizationResultList },
  setup() {
    const route = useRoute()
    const store = useStore()
    const projectId = store.getters['selectedProjectId']
    const loadSelectedOptimization = () => {
      const optimizationId = route.params.optimizationId
      store.dispatch('LOAD_SELECTED_OPTIMIZATION', {
        projectId,
        optimizationId,
      })
    }
    onMounted(() => loadSelectedOptimization())
    watch(route, () => loadSelectedOptimization())
  },
  computed: {
    ...mapGetters({
      optimization: 'selectedOptimization',
      appliedResults: 'selectedOptimizationAppliedResults',
      notAppliedResults: 'selectedOptimizationNotAppliedResults',
      loading: 'isSelectedOptimizationLoading',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
