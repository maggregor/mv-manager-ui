<template>
  <div class="not-activated-card">
    <Plan v-if="!isSelectedProjectPlanLoading" />
  </div>
</template>

<script>
import Plan from '@/components/Plan'
import { mapGetters } from 'vuex'
export default {
  name: 'NotActivatedProject',
  components: {
    Plan,
  },
  computed: {
    ...mapGetters(['isSelectedProjectPlanLoading']),
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
