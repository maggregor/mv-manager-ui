<template>
  <div class="container">
    <div v-for="(optimization, index) in sortedOptimizations" :key="optimization.id">
      <OptimizationHeader
        small
        v-if="index >= minIndex && index <= maxIndex"
        :index="index"
        :optimization="optimization"
      />
    </div>
    <a-pagination
      v-model="currentPage"
      :page-size="pageSize"
      :total="sortedOptimizations.length"
      show-less-items
      @change="onChangePage"
    />
  </div>
</template>
<script>
import moment from 'moment'
import OptimizationHeader from '@/components/Optimization/OptimizationHeader'
import { computed, ref } from '@vue/reactivity'
export default {
  name: 'OptimizationHeaderList',
  components: { OptimizationHeader },
  props: {
    optimizations: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const pageSize = ref(8)
    const currentPage = ref(1)
    const sortedOptimizations = computed(() => [...props.optimizations])
    const onChangePage = newPageNumber => (currentPage.value = newPageNumber)
    const minIndex = computed(() => (currentPage.value - 1) * pageSize.value)
    const maxIndex = computed(() => currentPage.value * pageSize.value - 1)
    return {
      minIndex,
      maxIndex,
      pageSize,
      currentPage,
      moment,
      sortedOptimizations,
      onChangePage,
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
