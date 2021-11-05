<template>
  <div class="kpi-1">
    <a-skeleton :loading="data == -1">
      <p class="data">{{ data }}</p>
      <p class="label">{{ label }}</p>
    </a-skeleton>
  </div>
</template>

<script>
export default {
  name: 'Kpi1',
  props: {
    data: {
      type: [Number, String],
      default: -1,
    },
    label: {
      type: String,
      default: 'Label',
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
