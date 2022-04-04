import {
  getSubscription,
  getSubscriptionChecks,
  getAllProducts,
  getAllPrices,
  createPortalSession,
} from '@/services/axios/backendApi'
const _ = require('lodash')
const moment = require('moment')

const state = {
  subscription: {},
  products: {},
  prices: {},
  checks: [],
  subscriptionLoading: false,
  productsLoading: false,
}

const toPrice = o => {
  return {
    id: o.id,
    amount: o.unitAmount ? o.unitAmount / 100 : -1,
    interval: o.recurring.interval,
    product: o.product,
  }
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
      dispatch('LOAD_SUBSCRIPTION_CHECKS')
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
      const subscription = await getSubscription()
      commit('SET_BILLING_STATE', { subscriptionLoading: false, subscription })
    },
    async LOAD_SUBSCRIPTION_CHECKS({ commit }) {
      commit('SET_BILLING_STATE', { customerLoading: true })
      const checks = await getSubscriptionChecks()
      commit('SET_BILLING_STATE', { customerLoading: false, checks })
    },
    async OPEN_STRIPE_PORTAL() {
      window.location = await createPortalSession()
    },
  },
  getters: {
    checks: state => state.checks,
    isBillingLoading: state =>
      state.productsLoading || state.subscriptionLoading || state.pricesLoading,
    allProducts: state => Object.values(state.products),
    allPrices: state => Object.values(state.prices),
    getPricesOfProduct: (state, getters) => product =>
      getters.allPrices.filter(p => p.product === product).map(o => toPrice(o)),
    getProductArguments: state => product => {
      const includes = state.products[product].metadata.ui_price_table_arguments
      return includes ? includes.split(';') : []
    },
    subscription: state => state.subscription,
    /**
     * Returns trial days remaining
     */
    trialDaysRemaining: (state, getters) => {
      const subscription = getters.subscription
      if (subscription) {
        const trialEnd = moment(subscription.trialEnd * 1000)
        const today = moment().startOf('days')
        return trialEnd.diff(today, 'days')
      }
      return -1
    },
    /**
     * Returns true if the subscription is in trial period
     */
    hasTrialPeriod: (state, getters) => getters.trialDaysRemaining > 0,
    /**
     * TODO: find th estatus of the subscription
     */
    hasActiveSubscription: (state, getters) => {
      const subscription = getters.subscription
      if (subscription) {
        return subscription.status === 'active'
      }
      return false
    },
    /**
     * Returns true if the first product id found in the subscription matchs with the given product id
     * Get the first item and returns the product id
     */
    getActivePrice: (state, getters) => {
      const subscription = getters.subscription
      if (subscription && subscription.items) {
        return toPrice(subscription.items.data[0].price)
      }
      return null
    },
    /**
     * Returns true if the first product id found in the subscription matchs with the given product id
     * Get the first item and returns the product id
     */
    isProductActivated: (state, getters) => product => {
      const price = getters.getActivePrice
      if (price) {
        return price.product === product
      }
      return false
    },
    hasPaymentMethod: (state, getters) => {
      const subscription = getters.subscription
      if (subscription) {
        return subscription.defaultPaymentMethodObject
      }
    },
    subscriptionStatus: (state, getters) => {
      const subscription = getters.subscription
      if (subscription) {
        return getters.subscription.status
      }
      return null
    },
    getSubscriptionCancelAt: (state, getters) => getters.subscription.cancelAt,
  },
}
