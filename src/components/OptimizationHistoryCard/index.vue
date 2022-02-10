<template>
  <div class="event-card">
    <div>
      <div class="d-flex flex-nowrap align-items-center pb-2">
        <div class="mr-auto">
          <div class="text-gray-4 pt-1 font-size-12">
            ID
          </div>
          <div class="font-weight-bold font-size-18 text-gray-6">
            {{ id }}
          </div>
          <div class="text-gray-4 pt-1">
            {{ moment(date).fromNow() }}
          </div>
        </div>
        <div>
          <div class="percent">
            {{ isNaN(eligiblePercent) ? 0 : eligiblePercent.toFixed(2) * 100 }}%
          </div>
          <div class="font-size-12">Eligible queries</div>
        </div>
      </div>
    </div>
    <!-- <a-row>
      <a-col class="dataset-container" :span="16">
        <a-row class="dataset">{{ dataset }} </a-row>
        <a-row class="time"> {{ moment(date).fromNow() }} </a-row>
      </a-col>
      <a-col class="percent-container" :span="8">
        <a-row>Eligible queries</a-row
        ><a-row class="percent">{{ eligiblePercent.toFixed(2) * 100 }}%</a-row>
      </a-col>
    </a-row> -->
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'OptimizationHistoryCard',
  components: {},
  props: {
    date: {
      type: Date,
    },
    id: {
      type: String,
    },
    eligiblePercent: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      moment,
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
