<template>
  <div class="container">
    <a-row type="flex">
      <a-col span="7" class="pr-4">
        <h1 class="mb-4">History</h1>
        <OptimizationHeaderList :optimizations="allOptimizations" />
      </a-col>
      <a-col span="17" class="pl-4">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters, useStore } from 'vuex'
import OptimizationHeaderList from '@/components/Optimization/OptimizationHeaderList'
export default {
  name: 'AllOptimizations',
  components: { OptimizationHeaderList },
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
