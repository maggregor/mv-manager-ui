<template>
  <div class="cta-primary" @click="$router.push(':projectId/overview')">
    <p class="label">Open</p>
  </div>
</template>

<script>
export default {
  name: 'CtaPrimary',
  props: {
    projectId: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
