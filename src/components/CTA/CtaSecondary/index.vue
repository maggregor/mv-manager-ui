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
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    isExternal: function() {
      return /^((http|https):\/\/)/.test(this.url)
    },
  },
  methods: {
    changeRoute() {
      if (this.isExternal) {
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
