<template>
  <div v-if="sortedResults.length" class="container">
    <div v-for="(result, index) in sortedResults" :key="result.id">
      <OptimizationResult
        v-if="index >= minIndex && index <= maxIndex"
        :index="index"
        :result="result"
      />
    </div>
    <a-pagination
      v-model="currentPage"
      :page-size="pageSize"
      :total="sortedResults.length"
      show-less-items
      @change="onChangePage"
    />
  </div>
</template>
<script>
import moment from 'moment'
import OptimizationResult from '@/components/Optimization/OptimizationResult'
import { computed, ref } from '@vue/reactivity'
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
    const pageSize = ref(10)
    const currentPage = ref(1)
    const sortedResults = computed(() => [...props.results].sort((a, b) => b.hits - a.hits))
    const onChangePage = newPageNumber => (currentPage.value = newPageNumber)
    const minIndex = computed(() => (currentPage.value - 1) * pageSize.value)
    const maxIndex = computed(() => currentPage.value * pageSize.value - 1)
    return {
      minIndex,
      maxIndex,
      pageSize,
      currentPage,
      moment,
      sortedResults,
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
