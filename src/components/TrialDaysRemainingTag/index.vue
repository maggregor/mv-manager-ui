<template>
  <a-tag v-if="days" class="trial-tag" :color="tagContext.color" @click="openStripePortal">{{
    tagContext.text
  }}</a-tag>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  props: {
    days: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const store = useStore()
    store
    const tagContext = computed(() => {
      const days = props.days
      if (days > 0) {
        return {
          color: `${days > 7 ? 'green' : 'orange'}`,
          text: `Trial period: ${days} days remaining`,
        }
      } else {
        return {
          color: 'red',
          text: `Trial period has expired`,
        }
      }
    })
    return {
      openStripePortal: () => store.dispatch('OPEN_STRIPE_PORTAL'),
      tagContext,
    }
  },
}
</script>

<style lang="scss" scoped>
.trial-tag {
  &:hover {
    cursor: pointer;
  }
}
</style>
