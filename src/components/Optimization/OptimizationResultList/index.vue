<template>
  <div v-if="sortedResults.length" class="container">
    <div v-for="(result, index) in sortedResults" :key="result.id">
      <OptimizationResult :index="index" :result="result" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import OptimizationResult from '@/components/Optimization/OptimizationResult'
import { computed } from '@vue/reactivity'
import _ from 'lodash'
export default {
  name: 'OptimizationHeader',
  components: { OptimizationResult },
  props: {
    results: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const sortedResults = computed(() => [...props.results].sort((a, b) => b.hits - a.hits))
    return {
      moment,
      sortedResults,
    }
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
