<template>
  <div class="container">
    <a-row v-if="allOptimizations.length" type="flex">
      <a-col span="7">
        <h1>History</h1>
        <OptimizationHeaderList :optimizations="allOptimizations" />
      </a-col>
      <a-col span="17" class="pl-4">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </a-col>
    </a-row>
    <OptimizationEmpty v-else />
  </div>
</template>

<script>
import { mapGetters, useStore } from 'vuex'
import OptimizationHeaderList from '@/components/Optimization/OptimizationHeaderList'
import OptimizationEmpty from '@/components/Optimization/OptimizationEmpty'
export default {
  name: 'AllOptimizations',
  components: { OptimizationHeaderList, OptimizationEmpty },
  setup() {
    const store = useStore()
    const projectId = store.getters['selectedProjectId']
    store.dispatch('LOAD_OPTIMIZATIONS', { projectId: projectId })
  },
  computed: {
    ...mapGetters(['allOptimizations', 'optimizationDetails']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
