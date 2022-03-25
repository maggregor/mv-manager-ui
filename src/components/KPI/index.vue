<template>
  <div class="kpi-card">
    <span class="value">{{ formattedValue }}</span>
    <br />
    {{ label }}
  </div>
</template>

<script>
import prettyBytes from 'pretty-bytes'
import { mapGetters } from 'vuex'
export default {
  name: 'Kpi',
  props: {
    data: {
      type: [Number, String],
      default: -1,
    },
    label: {
      type: String,
      default: 'Label',
    },
    gradient: {
      type: Boolean,
      default: false,
    },
    // Type of value
    percent: {
      type: Boolean,
    },
    bytes: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(['hasSelectedProjectKpi']),
    formattedValue() {
      if (this.data == -1) {
        return '...'
      }
      let value = this.data
      if (this.percent) {
        return `${value}%`
      } else if (this.bytes) {
        return prettyBytes(value)
      }
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
