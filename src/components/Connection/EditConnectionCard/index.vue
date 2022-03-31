<template>
  <a-row class="connectionCard" type="flex">
    <a-col :span="24">
      <a-row class="mb-3" justify="space-between">
        <a-col>
          <p class="card-title">New connection</p>
        </a-col>
        <a-col> <a-button type="link" @click="close">Close</a-button></a-col>
      </a-row>
    </a-col>
    <a-col class="field" :span="24">
      <p>Connection title</p>
      <input v-model="title" />
    </a-col>
    <a-col class="field" :span="24">
      <p>Service account</p>
      <textarea v-model="serviceAccount" />
    </a-col>
    <a-col :span="24">
      <a-row class="mb-3" justify="end">
        <a-col>
          <CTA
            :disabled="serviceAccount === ''"
            :trigger="createConnection"
            label="Create connection"
          />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
import { ref } from '@vue/reactivity'
import CTA from '@/components/CTA'
import { useStore } from 'vuex'
export default {
  components: {
    CTA,
  },
  setup() {
    const connectionType = 'service_account'
    const store = useStore()
    const title = ref('Connection to BigQuery')
    const serviceAccount = ref('')
    const createConnection = async () => {
      await store.dispatch('CREATE_CONNECTION', {
        type: connectionType,
        content: serviceAccount.value,
      })
      store.dispatch('SET_CREATING', false)
    }
    const close = () => store.dispatch('SET_CREATING', false)

    return {
      title,
      serviceAccount,
      createConnection,
      close,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
