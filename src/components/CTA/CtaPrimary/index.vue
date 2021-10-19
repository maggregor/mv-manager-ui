<template>
  <div class="cta-primary" @click="changeRoute()">
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
    url: {
      type: String,
      default: '',
    },
  },
  methods: {
    changeRoute() {
      // `route` is either a string or object
      var route = '/' + this.projectId + this.url
      this.$router.push(route)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
