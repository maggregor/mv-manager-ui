<template>
  <div class="cta-primary" @click="changeRoute()">
    <p class="label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'CtaPrimary',
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
      var route = this.url + '/' + this.resourceId
      this.$router.push(route)
      // this.$router.push('/projects/achilio-dev') // For testing only
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
