<template>
  <div
    class="event-card"
    @click="$router.push(`/projects/${$route.params.projectId}/optimizations/${optimization.id}`)"
  >
    <div>
      <div class="d-flex flex-nowrap align-items-center pb-2">
        <div class="mr-auto">
          <div class="text-gray-4 pt-1 font-size-12">
            ID
          </div>
          <div class="font-weight-bold font-size-18 text-gray-6">
            {{ optimization.id }}
          </div>
          <div class="text-gray-4 pt-1">
            {{ moment(optimization.createdDate).fromNow() }}
          </div>
        </div>
        <div>
          <div class="percent">{{ eligiblePercentFormatted }}%</div>
          <div class="font-size-12">Eligible queries</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'OptimizationHistoryCard',
  components: {},
  props: {
    optimization: {
      type: Object,
      default: () => ({
        createdDate: '...',
        id: '...',
        eligiblePercent: 0,
      }),
    },
  },
  data() {
    return {
      loading: false,
      moment,
    }
  },
  computed: {
    eligiblePercentFormatted() {
      const percent = this.optimization.eligiblePercent
      return isNaN(percent) ? 0 : (percent * 100).toFixed()
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
