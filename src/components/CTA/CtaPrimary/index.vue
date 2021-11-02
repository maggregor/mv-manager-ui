<template>
  <div class="cta-primary" @click="changeRoute()">
    <p class="label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'CtaPrimary',
  props: {
    url: {
      type: String,
      default: '',
    },
    external: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    changeRoute() {
      if (this.external) {
        window.open(this.url)
      } else {
        this.$router.push(this.url)
      }
      // this.$router.push('/projects/achilio-dev') // For testing only
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
