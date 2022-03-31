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
            v-if="editing"
            :disabled="serviceAccount === defaultServiceAccount && name === defaultName"
            :trigger="saveConnection"
            label="Update connection"
          /><CTA
            v-else
            :disabled="serviceAccount == null"
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
    const serviceAccount = ref(defaultServiceAccount.value)
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
    const saveConnection = async () => {
      await store.dispatch('UPDATE_CONNECTION', {
        id: props.connection.id,
        type: connectionType,
        serviceAccountKey: serviceAccount.value,
        sourceType: 'bigquery',
        name: name.value,
      })
      store.dispatch('FINISH_EDITING', props.connection.id)
    }
    const close = () => {
      store.dispatch('SET_CREATING', false)
      if (props.editing) {
        store.dispatch('FINISH_EDITING', props.connection.id)
      }
    }

    return {
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
