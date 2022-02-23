<template>
  <div class="checkout-container">
    <h1 class="mb-5">Payment</h1>
    <form id="payment-form">
      <div id="payment-element">
        <!-- Elements will create form elements here -->
      </div>
      <CTA
        style="width:300px; margin: auto; margin-top: 50px;"
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
    priceId: String,
  },
  data() {
    return {
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
    const projectId = store.getters['projects/currentProjectId']
    getLatestIntentClientSecret({
      subscriptionId,
    }).then(response => {
      let clientSecret = response.clientSecret
      if (clientSecret === null) {
        router.push(`/projects/${projectId}/overview`)
      } else {
        this.mountElements({ clientSecret: clientSecret })
      }
    })
  },
  methods: {
    async confirmPayment() {
      const projectId = this.$route.params.projectId
      const { error } = await this.stripe.confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements: this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/projects/${projectId}/overview`,
        },
      })

      if (error) {
        const messageContainer = document.querySelector('#error-message')
        messageContainer.textContent = error.code
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
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

<style lang="scss" scoped>
@import './style.module.scss';
</style>