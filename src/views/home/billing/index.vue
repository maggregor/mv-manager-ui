<template>
  <div class="billing">
    <h3>Pricings</h3>
    <a-row type="flex" class="mb-4" justify="center">
      <a-button-group>
        <a-button
          :type="isIntervalEquals('month') ? 'primary' : 'default'"
          @click="interval = 'month'"
        >
          Monthly
        </a-button>
        <a-button
          :disabled="true"
          :type="isIntervalEquals('year') ? 'primary' : 'default'"
          @click="interval = 'year'"
        >
          Yearly
        </a-button>
      </a-button-group>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col v-for="p in allProducts" :key="p.id" :span="11">
        <PricingTable
          :name="p.name"
          :url-image="p.images[0]"
          :prices="getPricesOfProduct(p.id)"
          :description="p.description"
          :pricing-arguments="getProductArguments(p.id)"
          :interval="interval"
          :activated="isProductActivated(p.id)"
          :active-price="getActivePrice"
        />
      </a-col>

      <a-col :span="2"> </a-col>
      <a-col :span="11">
        <PricingTable
          contact
          name="> 5 projects"
          url-image="https://files.stripe.com/links/MDB8YWNjdF8xSThvTDFLejNUVjhYQmJkfGZsX3Rlc3RfMzNGSGtjVFVtTklYcng0MU5JTXZpbXo40087wHsIVd"
          description="Enterprise scaling custom plan"
          :pricing-arguments="[
            'Custom pricing',
            'Advantages of By Projects',
            'Custom integrations',
            'Dedicated slack channel',
          ]"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PricingTable from '@/components/PricingTable'
import { ref } from '@vue/reactivity'
export default {
  components: {
    PricingTable,
  },
  setup() {
    const interval = ref('month')
    const isIntervalEquals = i => interval.value === i
    return {
      interval,
      isIntervalEquals,
    }
  },
  computed: {
    ...mapGetters([
      'allProducts',
      'allPrices',
      'subscription',
      'getPricesOfProduct',
      'getProductArguments',
      'isProductActivated',
      'getActivePrice',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
a-switch {
  font-size: 28px;
}
</style>
