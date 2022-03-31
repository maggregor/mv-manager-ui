<template>
  <a-row class="connectionCard" type="flex">
    <a-col :span="24">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col :span="1">
          <img :style="{ height: '3em' }" src="@/assets/google/google_bigquery.svg" />
        </a-col>
        <a-col class="field" :span="20">
          <p>Connection name</p>
          <input :size="inputNameSize" class="input-title" v-model="name" />
        </a-col>
        <a-col> <a-button type="link" @click="close">Close</a-button></a-col>
      </a-row>
    </a-col>
    <a-col class="field mt-4" :span="24">
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
import { computed } from '@vue/runtime-core'
export default {
  components: {
    CTA,
  },
  setup() {
    const connectionType = 'service_account'
    const store = useStore()
    const name = ref('Connection to BigQuery')
    const serviceAccount = ref('')
    const inputNameSize = computed(() => (name.value.length > 50 ? 50 : name.value.length))
    const createConnection = async () => {
      await store.dispatch('CREATE_CONNECTION', {
        type: connectionType,
        serviceAccountKey: serviceAccount.value,
        sourceType: 'bigquery',
        name: name.value,
      })
      store.dispatch('SET_CREATING', false)
    }
    const close = () => store.dispatch('SET_CREATING', false)

    return {
      name,
      serviceAccount,
      createConnection,
      close,
      inputNameSize,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
