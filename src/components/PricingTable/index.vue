<template>
  <div :class="{ table: true, activated: activated }">
    <a-row>
      <a-col>
        <div style="height: 25px">
          <div v-if="activated">
            <p v-if="status === 'active'" class="current-plan">
              Current plan
            </p>
            <p v-if="status === 'trialing'" class="current-plan">
              Free trial: <span class="days-left">{{ trialDaysRemaining }} days left</span>
            </p>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col>
        <img class="illustration" v-if="urlImage" :src="urlImage" />
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col>
        <span class="name">{{ name }}</span>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col class="price-section">
        <div v-if="selectedPrice">
          <span class="price">${{ fmtPrice }}</span>
          <span class="sub-title"> / project / mo</span>
        </div>
        <div v-else>
          <span class="price">Contact us</span>
        </div>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col class="description">
        <p>{{ description }}</p>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col class="arguments">
        <ul>
          <li v-for="(a, i) in pricingArguments" :key="i"><check-circle-outlined /> {{ a }}</li>
        </ul>
      </a-col>
    </a-row>
    <a-row>
      <a-col style="height: 80px" :span="24">
        <div v-if="activated">
          <div v-if="getSubscriptionCancelAt">
            <a-tag class="mt-3" color="red"
              >Subscription canceled. <br />Plan ends the
              {{ moment(getSubscriptionCancelAt * 1000).format('MMMM Do YYYY') }}</a-tag
            >
          </div>
          <div v-else-if="checks.includes('NO_PAYMENT_METHOD')">
            <a-tag class="mt-3" color="red">No payment method found</a-tag>
            <a-button type="link" @click="openManageSubscription">Setup a payment method</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <CTA v-if="contact" :trigger="openContactUs" :label="`Book a meeting`" />
        <CTA v-else-if="offerYearlyPayment" :label="`Talk with sales`" />
        <CTA
          v-else-if="activated"
          secondary
          @click="openManageSubscription"
          :label="`Manage subscription`"
        />
        <CTA v-else :label="`Subscribe`" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { createPortalSession } from '@/services/axios/backendApi'
import CTA from '@/components/CTA'
import { computed } from '@vue/runtime-core'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import { mapGetters, useStore } from 'vuex'
const moment = require('moment')
export default {
  name: 'PlanCard',
  components: {
    CTA,
    CheckCircleOutlined,
  },
  props: {
    name: {
      type: String,
      default: 'Plan name',
    },
    urlImage: {
      type: String,
      default: '',
    },
    prices: {
      type: Array,
      default: () => [],
    },
    interval: {
      type: String,
      default: 'month',
    },
    description: {
      type: String,
      default: '',
    },
    pricingArguments: {
      type: Array,
      default: () => [],
    },
    contact: {
      type: Boolean,
      default: false,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    activePrice: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()
    const status = computed(() => store.getters['subscriptionStatus'])
    const trialDaysRemaining = computed(() => store.getters['trialDaysRemaining'])
    const checks = computed(() => store.getters['checks'])
    const selectedPrice = computed(() => props.prices.find(p => p.interval === props.interval))
    const fmtPrice = computed(() => {
      const price = selectedPrice.value
      if (price) {
        return (price.amount / (props.interval === 'year' ? 12 : 1)).toFixed(0)
      }
    })
    const openManageSubscription = async () => {
      const portalSessionUrl = await createPortalSession()
      window.location = portalSessionUrl
    }
    const openContactUs = async () => {
      window.open(process.env.VUE_APP_URL_BOOK_A_MEETING, '_blank')
    }
    const offerYearlyPayment = computed(
      () => props.activated && props.activePrice.interval !== 'year' && props.interval === 'year',
    )
    return {
      moment,
      trialDaysRemaining,
      status,
      checks,
      openContactUs,
      openManageSubscription,
      selectedPrice,
      fmtPrice,
      offerYearlyPayment,
    }
  },
  computed: {
    ...mapGetters(['getSubscriptionCancelAt']),
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
