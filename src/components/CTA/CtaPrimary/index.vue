<template>
  <a-button class="cta-primary" @click="triggerAction()" :loading="loading">
    <p class="label">{{ label }}</p>
  </a-button>
</template>

<script>
export default {
  name: 'CtaPrimary',
  props: {
    url: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    trigger: {
      type: Function,
    },
  },
  data() {
    return { loading: false }
  },
  computed: {
    isExternal: function() {
      return /^((http|https):\/\/)/.test(this.url)
    },
  },
  methods: {
    async triggerAction() {
      if (this.trigger != undefined) {
        this.loading = true
        await this.trigger()
        this.loading = false
      } else {
        this.changeRoute()
      }
    },
    executePost() {},
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
