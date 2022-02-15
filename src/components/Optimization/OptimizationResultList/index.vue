<template>
  <div class="container">
    <OptimizationResult
      v-for="(result, index) in results"
      :key="result.id"
      :index="index"
      :result="result"
    />
  </div>
</template>
<script>
import moment from 'moment'
import OptimizationResult from '@/components/Optimization/OptimizationResult'
export default {
  name: 'OptimizationHeader',
  components: { OptimizationResult },
  props: {
    results: {
      type: Array,
    },
  },
  setup() {
    return {
      moment,
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
