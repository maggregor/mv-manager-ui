<template>
  <div class="cta-secondary" @click="$router.push(':projectId/settings')">
    <p class="label">Settings</p>
  </div>
</template>

<script>
export default {
  name: 'CtaSecondary',
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
