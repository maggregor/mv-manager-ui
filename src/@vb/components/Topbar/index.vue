<template>
  <div :class="$style.topbar">
    <div class="d-none d-sm-block ml-auto mr-2 mt-3">
      
    </div>
    <div class="d-none d-sm-block">
      <vb-user-menu />
    </div>
  </div>
</template>

<script>
import VbUserMenu from './UserMenu'

export default {
  components: {
    VbUserMenu,
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
