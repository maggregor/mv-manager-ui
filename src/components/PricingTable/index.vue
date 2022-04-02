<template>
  <div class="table">
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
          <span class="price">Let's talk</span>
        </div>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col class="description">
        <p>{{ description }}</p>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col class="includes">
        <ul>
          <li v-for="i in includes" :key="i"><check-circle-outlined /> {{ i }}</li>
        </ul>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col>
        <CTA v-if="contact" :label="`Book a meeting`" />
        <CTA v-else :label="`Subscribe`" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CTA from '@/components/CTA'
import { computed } from '@vue/runtime-core'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
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
    includes: {
      type: Array,
      default: () => [],
    },
    contact: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const selectedPrice = computed(() => props.prices.find(p => p.interval === props.interval))
    const fmtPrice = computed(() => {
      const price = selectedPrice.value
      if (price) {
        return (price.amount / (props.interval === 'year' ? 12 : 1)).toFixed(0)
      }
    })
    return { selectedPrice, fmtPrice }
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
