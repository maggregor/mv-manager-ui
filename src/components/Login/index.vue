<template>
  <div :class="$style.container">
    <a-form
      :model="loginForm"
      layout="vertical"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-button
        v-if="!authorized"
        type="primary"
        html-type="submit"
        class="text-center w-100"
        :loading="user.loading"
      >
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
