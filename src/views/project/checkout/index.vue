<template>
  <div class="checkout-container">
    <h1 class="mb-5">Payment</h1>
    <form id="payment-form">
      <a-spin size="large" :spinning="loading">
        <div id="payment-element">
          <!-- Elements will create form elements here -->
        </div>
      </a-spin>

      <CTA
        extra-style="width:300px; margin: auto; margin-top: 50px;"
        text="Subscribe"
        label="Pay"
        :trigger="confirmPayment"
      />
      <div id="error-message">
        <!-- Display error message to your customers here -->
      </div>
    </form>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import CTA from '@/components/CTA'
import { useRoute, useRouter } from 'vue-router'
import { getLatestIntentClientSecret } from '@/services/axios/backendApi'
export default {
  name: 'ElementsCheckout',
  components: {
    CTA,
  },
  props: {
    priceId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: true,
      clientSecret: null,
    }
  },
  computed: {
    path() {
      const { path } = this.$router.currentRoute.value
      return path
    },
  },
  async mounted() {
    this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const subscriptionId = route.params.subscriptionId
    const projectId = store.getters['selectedProjectId']
    getLatestIntentClientSecret({
      subscriptionId,
    }).then(async response => {
      let clientSecret = response.clientSecret
      if (clientSecret === null) {
        message.loading('Subscription...')
        // No one invoice to pay, redirect to overview
        this.loading = true
        setTimeout(async () => {
          await store.dispatch('LOAD_ALL_PROJECTS')
          await store.dispatch('LOAD_PLANS', projectId)
          router.push(`/projects`)
          message.destroy()
          message.success('Congratulations. Successfully subscribed.')
        }, 2000)
      } else {
        // Mount the Stripe elements for the payment intent
        this.mountElements({ clientSecret: clientSecret })
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    })
  },
  methods: {
    async confirmPayment() {
      const { error } = await this.stripe.confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements: this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/projects`,
        },
      })

      if (error) {
        const messageContainer = document.querySelector('#error-message')
        messageContainer.textContent = error.code
      } else {
      }
    },
    async mountElements({ clientSecret }) {
      const options = {
        clientSecret,
        appearance: {
          theme: 'stripe',
        },
      }
      this.elements = this.stripe.elements(options)
      const paymentElement = this.elements.create('payment')
      paymentElement.mount('#payment-element')
    },
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
