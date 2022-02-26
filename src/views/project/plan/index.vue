<template>
  <div class="container"><Plan v-if="plans" :plans="plans" /></div>
</template>

<script>
import Plan from '@/components/Plan'
import { mapGetters, useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
export default {
  components: { Plan },
  setup() {
    onMounted(() => {
      useStore().dispatch('plans/LOAD_PLANS', store.getters['selectedProjectId'])
    })
  },
  computed: {
    ...mapGetters('plans'),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
