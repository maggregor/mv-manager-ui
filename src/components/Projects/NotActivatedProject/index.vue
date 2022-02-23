<template>
  <div class="not-activated-card">
    <!-- <CTA :url="`/projects/${projectId}/plan`" label="Enable this project" /> -->
    <Plan v-if="plans" :plans="plans" />
  </div>
</template>

<script>
import Plan from '@/components/Plan'
// import CTA from '@/components/CTA'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'NotActivatedProject',
  components: {
    // CTA,
    Plan,
  },
  setup() {
    const store = useStore()
    const projectId = computed(() => store.getters['projects/currentProjectId'])
    const customerId = store.getters['projects/currentProjectCustomerId']
    const plans = computed(() => store.getters['plans/plans'])
    onMounted(() => {
      store.dispatch('plans/LOAD_PLANS', { customerId })
    })
    return {
      projectId,
      plans,
    }
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
