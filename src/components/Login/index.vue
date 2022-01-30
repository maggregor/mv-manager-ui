<template>
  <div class="container">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="11">
        <h1 class="font-weight-bold font-size-70 pb-2">
          Lorem Ipsum !
        </h1>
        <h3 class=" pb-2">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </h3>
      </a-col>
      <a-divider style="height: 30vh" type="vertical" />
      <a-col :span="10">
        <a-form
          :model="loginForm"
          layout="vertical"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
        >
          <a-button
            type="primary"
            html-type="submit"
            class="text-center w-100  "
            :loading="user.loading"
          >
            Sign in with<strong> Google</strong>
          </a-button>
          <p class="mt-2">
            By signing up, you agree to Achilio’s
            <a href="https://achilio.com"><b>Terms of Service</b></a> and
            <a href="https://achilio.com"><b>Privacy Policy</b></a
            >.
          </p>
        </a-form>
      </a-col>
    </a-row>
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
<style scoped>
.container {
  min-width: 60vw;
  max-width: 60vw;
  min-height: 50vh;
  max-height: 50vh;
  margin-bottom: 20%;
}
.space-align-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}
.ant-row {
  height: 60vh;
}
h2 {
  font-size: 46px;
}
h3 {
  font-size: 28px;
  font-weight: 300;
}
p {
  text-align: center;
  font-size: 12px;
}
</style>
