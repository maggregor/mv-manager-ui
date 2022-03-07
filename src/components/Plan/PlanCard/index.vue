<template>
  <div>
    <div :class="{ 'subscription-card': true }">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col span="auto">
          <h1>{{ plan.name }}</h1>
        </a-col>
        <a-col class="mb-2" span="auto">
          <img class="illustration" v-if="plan.urlImage" :src="plan.urlImage" />
        </a-col>
        <a-col class="mb-1" span="auto">
          <h2>{{ formattedAmount }} {{ formattedCurrency }} / {{ interval }}</h2>
        </a-col>
        <a-col class="mb-5" span="auto">
          <h3>{{ plan.description }}</h3>
        </a-col>
        <a-col class="mt-5" span="24">
          <CTA v-if="plan.enabled" secondary :trigger="triggerCancel" :label="`Cancel`" />
          <CTA v-else :trigger="triggerPay" :label="`Subscribe`" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import CTA from '@/components/CTA'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { createSubscription, cancelSubscription } from '@/services/axios/backendApi'
export default {
  name: 'PlanCard',
  components: {
    CTA,
  },
  props: {
    plan: {
      type: Object,
      default: () => {},
    },
    interval: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const projectId = store.getters['selectedProjectId']
    const triggerPay = () => {
      return createSubscription({ projectId, priceId: price.id }).then(response => {
        let subscriptionId = response.data.id
        router.push(`/projects/${route.params.projectId}/checkout/${subscriptionId}`)
      })
    }
    const triggerCancel = () => {
      return cancelSubscription({ subscriptionId: props.plan.subscription.id }).then(async () => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        await store.dispatch('LOAD_ALL_PROJECTS')
        await store.dispatch('LOAD_PLANS', projectId)
        router.push(`/projects`)
      })
    }
    const getAvailableFreeTrialDays = computed(() =>
      canFreeTrial ? props.price.recurring.trialPeriodDays : -1,
    )
    const canFreeTrial = computed(() => props.price.recurring.trialPeriodDays)
    const price = props.plan.prices.find(p => p.interval === props.interval)
    const formattedAmount = computed(() => (price.amount / 100).toFixed(1))
    const formattedCurrency = computed(() => {
      let currency = price.currency
      switch (currency) {
        case 'eur':
          return '€'
        case 'usd':
          return '$'
        default:
          return currency
      }
    })
    return {
      triggerPay,
      triggerCancel,
      getAvailableFreeTrialDays,
      formattedAmount,
      formattedCurrency,
    }
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
