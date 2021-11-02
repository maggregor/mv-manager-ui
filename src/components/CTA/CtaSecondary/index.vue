<template>
  <div class="cta-secondary" @click="changeRoute()">
    <p class="label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'CtaSecondary',
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
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
