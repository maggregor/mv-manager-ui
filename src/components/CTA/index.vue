<template>
  <!-- Popover displayed if the button is disabled -->
  <Popper :hover="true" :disabled="!disabled && popoverText !== ''" placement="top">
    <a-button
      :class="{ 'cta-disabled': disabled, 'cta-secondary': secondary, 'cta-primary': !secondary }"
      @click="triggerAction()"
      :loading="loading"
    >
      <p class="label">{{ label }}</p>
    </a-button>
    <template #content>
      <div>
        {{ popoverText }}
      </div>
    </template>
  </Popper>
</template>

<script>
import Popper from 'vue3-popper'

export default {
  name: 'Cta',
  components: {
    Popper,
  },
  props: {
    url: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    popoverText: {
      type: String,
      default: '',
    },
    trigger: {
      type: Function,
      default: undefined,
    },
    secondary: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
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
      if (!this.disabled) {
        if (this.trigger != undefined) {
          this.loading = true
          try {
            await this.trigger()
          } catch (e) {}
          this.loading = false
        } else {
          this.changeRoute()
        }
      }
    },
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
