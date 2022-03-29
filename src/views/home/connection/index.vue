<template>
  <div :class="$style.container">
    <h4>Service account</h4>
    <a-row type="flex">
      <a-col :span="24">
        <textarea v-model="input" :placeholder="placeholder"></textarea>
      </a-col>
      <a-col class="buttons" :span="20" />
      <a-col class="buttons" :span="4">
        <CTA style="width: 100%" :disabled="input == ''" :trigger="onSave" label="Save" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, useStore } from 'vuex'
import CTA from '@/components/CTA'
import { ref } from '@vue/reactivity'

export default {
  name: 'Home',
  components: {
    CTA,
  },
  setup() {
    const store = useStore()
    const input = ref('')
    const onSave = () => {
      if (store.getters['hasConnection']) {
        let id = store.getters['connectionId']
        store.dispatch('UPDATE_CONNECTION', { id, type: 'service_account', content: input.value })
      } else {
        store.dispatch('CREATE_CONNECTION', { type: 'service_account', content: input.value })
      }
    }
    return {
      // ...mapActions({
      //   createConnection: 'CREATE_CONNECTION',
      //   loadAllConnection: 'LOAD_CONNECTION',
      //   updateConnection: 'UPDATE_CONNECTION',
      //   deleteConnection: 'DELETE_CONNECTION',
      // }),
      onSave,
      input,
      placeholder:
        '{\r\n  "type": "service_account",\r\n  "project_id": "achilio-dev",\r\n  "private_key_id": "",\r\n  "private_key": "\\n",\r\n  "client_email": "@dev.iam.gserviceaccount.com",\r\n  "client_id": "",\r\n  "auth_uri": "https:\/\/accounts.google.com\/o\/oauth2\/auth",\r\n  "token_uri": "https:\/\/oauth2.googleapis.com\/token",\r\n  "auth_provider_x509_cert_url": "https:\/\/www.googleapis.com\/oauth2\/v1\/certs",\r\n  "client_x509_cert_url": "https:\/\/www.googleapis.com\/robot\/v1\/metadata\/x509\/iam.gserviceaccount.com"\r\n}',
    }
  },
  computed: {
    ...mapGetters([
      'hasConnection',
      'connectionId',
      'connectionName',
      'connectionName',
      'connectionContent',
    ]),
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
