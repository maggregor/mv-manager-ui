<template>
  <div :class="$style.container">
    <a-form
      :model="loginForm"
      layout="vertical"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <h2 class="font-weight-bold pb-2">
        Welcome. <br />Join
        <span
          style="color: background-color: #663dff;
background-image: linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;"
          >BigTunr</span
        >
        , now.
      </h2>
      <a-button type="primary" html-type="submit" class="text-center w-100" :loading="user.loading">
        Sign in with<strong> Google</strong>
      </a-button>
    </a-form>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'VbLogin',
  components: {},
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
<style lang="scss" module>
@import './style.module.scss';
</style>
