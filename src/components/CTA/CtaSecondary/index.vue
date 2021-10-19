<template>
  <div class="cta-secondary" @click="changeRoute()">
    <p class="label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'CtaSecondary',
  props: {
    resourceId: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    changeRoute() {
      // `route` is either a string or object
      var route = '/' + this.resourceId + this.url
      this.$router.push(route)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
