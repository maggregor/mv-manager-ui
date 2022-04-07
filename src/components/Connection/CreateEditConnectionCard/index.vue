<template>
  <a-row class="connectionCard" type="flex">
    <a-col :span="24">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col :span="1">
          <img :style="{ height: '3em' }" src="@/assets/google/google_bigquery.svg" />
        </a-col>
        <a-col class="field" :span="20">
          <p class="sub-title">Connection name *</p>
          <input :size="inputNameSize" class="input-connection-name" v-model="name" />
        </a-col>
        <a-col> <a-button type="link" @click="close">Close</a-button></a-col>
      </a-row>
    </a-col>
    <a-col class="field mt-4" :span="24">
      <span class="title">Credentials *</span>
      <p>
        The credentials (JSON) that Achilio will use to manage your BigQuery materialized views.
        <br />Create a service account just for Achilio to use.
      </p>
    </a-col>
    <a-col :span="24">
      <textarea v-model="serviceAccount" :placeholder="defaultServiceAccount" />
    </a-col>
    <a-col :span="24">
      <a-row justify="space-between">
        <a-col>
          <p>
            Consult
            <a-button class="small-button" type="link" @click="openSADocumentation">
              our documentation</a-button
            >
            for the minimum permissions required.
          </p>
        </a-col>
        <a-col>
          <CTA
            v-if="editing"
            :disabled="(serviceAccount === null || serviceAccount === '') && name === defaultName"
            :trigger="saveConnection"
            label="Update connection"
          /><CTA
            v-else
            :disabled="serviceAccount === null || serviceAccount === '' || name.length === 0"
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
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
    // If editing = true, connection to edit
    connection: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const connectionType = 'service_account'
    const store = useStore()
    let defaultName = ref('Connection to BigQuery')
    let defaultServiceAccount = ref(null)
    if (props.connection !== null) {
      defaultName = ref(props.connection.name)
      defaultServiceAccount = ref(props.connection.content)
    }
    const name = ref(defaultName.value)
    const serviceAccount = ref(null)
    const inputNameSize = computed(() => (name.value.length > 50 ? 50 : name.value.length))
    const createConnection = async () => {
      await store.dispatch('CREATE_CONNECTION', {
        type: connectionType,
        serviceAccountKey: serviceAccount.value,
        sourceType: 'bigquery',
        name: name.value,
      })
      store.dispatch('SET_CONNECTION_CREATING', false)
    }
    const saveConnection = async () => {
      await store.dispatch('UPDATE_CONNECTION', {
        id: props.connection.id,
        type: connectionType,
        serviceAccountKey: serviceAccount.value,
        sourceType: 'bigquery',
        name: name.value,
      })
      store.dispatch('FINISH_CONNECTION_EDITING', props.connection.id)
    }
    const close = () => {
      store.dispatch('SET_CONNECTION_CREATING', false)
      if (props.editing) {
        store.dispatch('FINISH_CONNECTION_EDITING', props.connection.id)
      }
    }

    const openSADocumentation = () =>
      window.open('https://docs.achilio.com/google-service-account', '_blank')
    return {
      openSADocumentation,
      defaultServiceAccount,
      serviceAccount,
      defaultName,
      name,
      inputNameSize,
      createConnection,
      saveConnection,
      close,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
