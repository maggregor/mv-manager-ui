<template>
  <div class="container"><Plan v-if="plans" :plans="plans" /></div>
</template>

<script>
import Plan from '@/components/Plan'
import { useStore } from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
export default {
  components: { Plan },
  setup() {
    const store = useStore()
    const plans = computed(() => store.getters['plans/plans'])
    const projectId = store.getters['projects/currentProjectId']
    onMounted(() => {
      store.dispatch('plans/LOAD_PLANS', { projectId })
    })
    return { plans }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
