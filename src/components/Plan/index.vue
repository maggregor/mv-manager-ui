<template>
  <div class="plans">
    <h1 class="text-weight-600 mb-4">Choose a plan</h1>
    <a-row type="flex" justify="space-around" align="middle">
      <a-col span="auto" v-for="plan in sortedPlans" :key="plan.id">
        <PlanCard :plan="plan" :interval="interval" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import PlanCard from '@/components/Plan/PlanCard'

import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  name: 'Plan',
  components: {
    PlanCard,
  },
  props: {
    plans: {
      type: Array,
    },
  },
  setup(props) {
    const store = useStore()
    const interval = ref('month')
    const loading = computed(() => store.getters['plans/loading'])
    const plansRef = computed(() => props.plans)
    const sortedPlans = computed(() =>
      plansRef.value.sort((a, b) => a.prices[0].amount - b.prices[0].amount),
    )
    return { interval, loading, sortedPlans, plansRef }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
