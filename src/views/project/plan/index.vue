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
    const customerId = store.getters['projects/currentProjectCustomerId']
    const plans = computed(() => store.getters['plans/plans'])
    onMounted(() => {
      store.dispatch('plans/LOAD_PLANS', { customerId })
    })
    return { plans }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
