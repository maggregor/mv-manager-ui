<template>
  <div class="kpi-1">
    <p class="data">{{ data }}</p>
    <p class="label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'Kpi1',
  props: {
    data: {
      type: Number,
      default: 345,
    },
    label: {
      type: String,
      default: 'Directly on the Table from BigQuery',
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
