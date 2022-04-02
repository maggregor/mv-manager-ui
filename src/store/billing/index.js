import { getSubscription, getAllProducts, getAllPrices } from '@/services/axios/backendApi'
import _ from 'lodash'

const state = {
  subscription: {},
  products: {},
  prices: {},
  subscriptionLoading: false,
  productsLoading: false,
}

export default {
  state,
  mutations: {
    SET_BILLING_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
  },
  actions: {
    LOAD_ALL_BILLING({ commit, dispatch }) {
      dispatch('LOAD_ALL_PRODUCTS')
      dispatch('LOAD_ALL_PRICES')
      dispatch('LOAD_SUBSCRIPTION')
    },
    async LOAD_ALL_PRODUCTS({ commit }) {
      commit('SET_BILLING_STATE', { productsLoading: true })
      const products = _.keyBy(await getAllProducts(), 'id')
      commit('SET_BILLING_STATE', { productsLoading: false, products })
    },
    async LOAD_ALL_PRICES({ commit }) {
      commit('SET_BILLING_STATE', { pricesLoading: true })
      const prices = _.keyBy(await getAllPrices(), 'id')
      commit('SET_BILLING_STATE', { pricesLoading: false, prices })
    },
    async LOAD_SUBSCRIPTION({ commit }) {
      commit('SET_BILLING_STATE', { subscriptionLoading: true })
      const subscription = _.keyBy(await getSubscription(), 'id')
      commit('SET_BILLING_STATE', { subscriptionLoading: false, subscription })
    },
  },
  getters: {
    isBillingLoading: state =>
      state.productsLoading || state.subscriptionLoading || state.pricesLoading,
    allProducts: state => Object.values(state.products),
    allPrices: state => Object.values(state.prices),
    getPricesOfProduct: (state, getters) => product =>
      getters.allPrices
        .filter(p => p.product === product)
        .map(o => {
          return {
            amount: o.unitAmount ? o.unitAmount / 100 : -1,
            interval: o.recurring.interval,
          }
        }),
    getIncludesOfProduct: state => product => {
      const includes = state.products[product].metadata.ui_pricing_incluces
      return includes ? includes.split(';') : []
    },
    subscription: state => state.subscription,
  },
}
