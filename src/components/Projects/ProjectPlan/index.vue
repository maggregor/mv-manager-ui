<template>
  <div class="project-plan">
    <p class="project-plan-name">{{ planName }}</p>
    <p class="table-count text-weight-300 font-size-18">
      <span class="count-num text-weight-600">{{ tableCount }}/{{ maxTable }}</span> Table(s)
    </p>
    <p class="mmv-count text-weight-300 font-size-18">
      <span class="count-num text-weight-600">{{ mmvCount }}/{{ maxMmv }}</span> Managed Materialized View(s)
    </p>
    <CtaPrimary
      class="cta-primary mt-4"
      v-if="planUpgradable"
      :url="'https://cloud.google.com/marketplace'"
      :label="'Upgrade your Smart Tuning Plan'"
    />
  </div>
</template>

<script>
import CtaPrimary from '@/components/CTA/CtaPrimary'

export default {
  name: 'ProjectPlan',
  components: { CtaPrimary },
  props: {
    planName: {
      type: String,
      default: 'Startup Plan',
    },
    tableCount: {
      type: Number,
      default: 0,
    },
    mmvCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    maxTable: function() {
      var r = 0
      if (this.planName == 'Startup Plan') {
        r = 2
      }
      return r
    },
    maxMmv: function() {
      var r = 0
      if (this.planName == 'Startup Plan') {
        r = 4
      }
      return r
    },
    planUpgradable: function() {
      return this.planName != 'Premium Plan'
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
