<template>
  <a-row type="flex" justify="center">
    <a-col v-for="p in allProducts" :key="p.id" :span="10">
      <PricingTable
        :name="p.name"
        :url-image="p.images[0]"
        :prices="getPricesOfProduct(p.id)"
        :description="p.description"
        :includes="getIncludesOfProduct(p.id)"
      />
    </a-col>

    <a-col :span="10">
      <PricingTable
        contact
        name="> 5 projects"
        url-image="https://files.stripe.com/links/MDB8YWNjdF8xSThvTDFLejNUVjhYQmJkfGZsX3Rlc3RfMzNGSGtjVFVtTklYcng0MU5JTXZpbXo40087wHsIVd"
        description="We are gonna to give the best sizing"
        :includes="[
          'Flexible pricing',
          'Automatic generation',
          'Custom SAML support',
          'Dedicated slack channel',
        ]"
      />
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import PricingTable from '@/components/PricingTable'
export default {
  components: {
    PricingTable,
  },
  computed: {
    ...mapGetters([
      'allProducts',
      'allPrices',
      'subscription',
      'getPricesOfProduct',
      'getIncludesOfProduct',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
