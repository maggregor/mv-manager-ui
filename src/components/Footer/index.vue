<template>
  <div :class="$style.footer">
    <div>
      <a
        @click="window.open('https://achilio.com', '_blank')"
        :class="$style.logo"
        class="d-none d-md-block"
      >
        <div :class="$style.logo__name">
          achilio <span class="text-weight-400 font-size-10">beta</span>
        </div>
        <div :class="$style.logo__descr">FOR BIGQUERY</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
