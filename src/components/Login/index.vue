<template>
  <div class="container">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col class="details_container" :span="10">
        <h1>With Achilio</h1>
        <h2>Automatically improve your performance</h2>
        <!-- <div class="strengh_container">
          <h3 class="strengh_item">✅ Ca va très vite</h3>
          <h3 class="strengh_item">✅ En plus c'est automatique</h3>
          <h3 class="strengh_item">✅ Et on fait gaffe à vos données</h3>
        </div> -->
      </a-col>
      <a-col class="details_container" :span="2">
        <a-divider style="height: 30vh" type="vertical" />
      </a-col>
      <a-col class="login_container" :span="10">
        <google-button class="mb-4" @click="handleFinish" />
        <p>
          By signing up, you agree to Achilio’s
          <a href="https://achilio.com"><b>Terms of Service</b></a> and
          <a href="https://achilio.com"><b>Privacy Policy</b></a
          >.
        </p>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

import GoogleButton from '@/components/GoogleButton'

export default {
  name: 'VbLogin',
  components: { 'google-button': GoogleButton },
  setup() {
    const store = useStore()
    const settings = computed(() => store.getters.settings)
    const user = computed(() => store.getters['user/user'])
    const authorized = computed(() => store.getters['user/user'].authorized)
    const projects = computed(() => store.getters['projects/projectNames'])
    const projectLoading = computed(() => store.getters['projects/loading'])

    const loginForm = reactive({})

    const changeAuthProvider = value => {
      store.commit('CHANGE_SETTING', { setting: 'authProvider', value })
    }
    const handleFinish = values => {
      store.dispatch('user/LOGIN', { payload: values })
    }
    const handleFinishFailed = errors => {
      console.log(errors)
    }

    return {
      settings,
      user,
      loginForm,
      changeAuthProvider,
      handleFinish,
      handleFinishFailed,
      authorized,
      projects,
      projectLoading,
    }
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
