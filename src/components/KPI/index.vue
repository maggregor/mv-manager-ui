<template>
  <div class="kpi-card">
    <span class="value" v-html="data == -1 ? '...' : data" />
    <br />
    <span class="label" v-html="label" />
  </div>
</template>

<script>
export default {
  name: 'Kpi',
  props: {
    data: {
      type: [Number, String],
    },
    label: {
      type: String,
      default: 'Label',
    },
    gradient: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
