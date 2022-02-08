<template>
  <div class="event-card">
    <a-row>
      <a-col class="dataset-container" :span="16">
        <a-row class="dataset">{{ dataset }} </a-row>
        <a-row class="time"> {{ moment(date).fromNow() }} </a-row>
      </a-col>
      <a-col class="percent-container" :span="8">
        <a-row>Eligible queries</a-row
        ><a-row class="percent">{{ eligiblePercent.toFixed(2) * 100 }}%</a-row>
      </a-col>
    </a-row>
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
    dataset: {
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
