<template>
  <div class="container">
    <a-row>
      <a-col :span="24">
        <Logo />
      </a-col>
      <a-col :span="24">
        <div class="p-5 font-size-30">
          <div class="font-weight-bold mb-3">Unreacheable</div>
          <div v-if="isBackendServerUnreachable">
            The server is unreachable
          </div>
          <CTA secondary :trigger="refresh" label="Try again" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CTA from '@/components/CTA'
import Logo from '@/components/Logo'

export default {
  name: 'Unreachable',
  components: {
    Logo,
    CTA,
  },
  setup() {
    return {
      refresh: () => window.location.reload(),
    }
  },
  computed: {
    ...mapGetters(['isBackendServerUnreachable']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
