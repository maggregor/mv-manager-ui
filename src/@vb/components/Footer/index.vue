<template>
  <div :class="$style.footer">
    <div :class="$style.footerInner">
      <a
        href="https://achilio.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong class="mr-2">Materialized View Manager <b>for Google BigQuery™</b></strong>
      </a>
      <br />
      <p class="mb-0">
        Copyright © {{ new Date().getFullYear() }}
        <a href="https://sellpixels.com" target="_blank" rel="noopener noreferrer">
          achilio.com
        </a>
        |
        <a href="https://sellpixels.com/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const settings = computed(() => store.getters.settings)

    return {
      settings,
    }
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
