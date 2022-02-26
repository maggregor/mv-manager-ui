<template>
  <div class="not-activated-card">
    <Plan v-if="plans" :plans="plans" />
  </div>
</template>

<script>
import Plan from '@/components/Plan'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'NotActivatedProject',
  components: {
    Plan,
  },
  setup() {
    const store = useStore()
    const projectId = store.getters['selectedProjectId']
    const plans = computed(() => store.getters['plans/plans'])
    onMounted(() => {
      store.dispatch('plans/LOAD_PLANS', projectId)
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
