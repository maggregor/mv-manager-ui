<template>
  <div class="mt-5">
    <div class="card" :class="$style.container">
      <a-form
        :model="loginForm"
        :rules="rules"
        layout="vertical"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-button v-if="!authorized" type="primary" html-type="submit" class="text-center w-100" :loading="loading">
          Sign in with <strong> Google</strong>
        </a-button>
        <div v-else> 
          <UserMenu class="text-center w-100 mb-5 p"/>
          <a-skeleton v-if="projectLoading" active/>
          <a-skeleton v-if="projectLoading" active/>
          <ProjectCard 
            v-else
            class="mt-3"
            v-for="project in projects" 
            :key="project.projectId"
            :project-id="project.projectId"
            :project-name="project.projectName"
            :dataset-count="project.datasetCount"
            :activated="project.activated"
            />
        </div>
      </a-form>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import ProjectCard from '@/@vb/components/ProjectCard'
import UserMenu from '@/@vb/components/Topbar/UserMenu'
export default {
  name: 'VbLogin',
  components: {
    ProjectCard,
    UserMenu,
  },
  setup() {
    const store = useStore()
    const settings = computed(() => store.getters.settings)
    const loading = computed(() => store.getters['user/user'].loading)
    const authorized = computed(() => store.getters['user/user'].authorized)
    const projects = computed(() => store.getters['projects/projects'])
    const projectLoading = computed(() => store.getters['projects/loading'])
    const rules = {
      email: [
        {
          required: true,
          message: 'Please input your email!',
          trigger: 'change',
        },
      ],
      password: [{ required: true, message: 'Please input password!', trigger: 'change' }],
    }
    const loginForm = reactive({
      email: 'demo@visualbuilder.cloud',
      password: 'VisualBuilder',
    })

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
      loading,
      rules,
      loginForm,
      changeAuthProvider,
      handleFinish,
      handleFinishFailed,
      authorized,
      projects,
      projectLoading,
    }
  },
  // data: function () {
  //   return {
  //     rules: {
  //       email: [{ required: true, message: 'Please input your email!', trigger: 'change' }],
  //       password: [{ required: true, message: 'Please input password!', trigger: 'change' }],
  //     },
  //     loginForm: {
  //       email: 'demo@visualbuilder.cloud',
  //       password: 'VisualBuilder',
  //     },
  //   }
  // },
  // computed: {
  //   ...mapState(['settings']),
  //   loading() {
  //     return this.$store.state.user.loading
  //   },
  // },
  // methods: {
  //   changeAuthProvider(value) {
  //     this.$store.commit('CHANGE_SETTING', { setting: 'authProvider', value })
  //   },
  //   handleFinish(values) {
  //     this.$store.dispatch('user/LOGIN', { payload: values })
  //   },
  //   handleFinishFailed(errors) {
  //     console.log(errors)
  //   },
  // },
}
</script>
<style lang="scss" module>
@import '@/@vb/components/Auth/style.module.scss';
</style>
