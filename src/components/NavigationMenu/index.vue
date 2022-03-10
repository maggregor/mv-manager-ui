<template>
  <a-menu class="menu mb-3" v-model="current" mode="horizontal">
    <a-menu-item key="overview">Overview</a-menu-item>
    <a-menu-item key="datasets">Datasets</a-menu-item>
    <a-menu-item key="optimizations">Optimizations</a-menu-item>
    <a-menu-item key="settings"> <a-icon type="setting" theme="filled" />Settings</a-menu-item>
  </a-menu>
</template>
<script>
export default {
  setup() {
    return {
      current: ['overview'],
    }
  },
}
</script>

<style lang="scss">
.ant-menu-horizontal {
  font-size: 16px !important;
  color: rgb(73, 81, 99) !important;
  font-weight: 500;
}
</style>
