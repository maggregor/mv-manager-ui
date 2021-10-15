<template>
  <div :class="$style.container">
    <a-form
      :model="loginForm"
      :rules="rules"
      layout="vertical"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-button
        v-if="!authorized"
        type="primary"
        html-type="submit"
        class="text-center w-100"
        :loading="loading"
      >
        Sign in with<strong> Google</strong>
      </a-button>
      <div v-else>
        <div class="mb-3 text-black text-weight-600 font-size-36">
          Hi {{ user.name.split(' ')[0] }}, welcome to your optimizer
        </div>
        <div class="mb-3 text-black text-weight-200 font-size-24">
          Activate one of your projects below
        </div>
        <a-skeleton v-if="projectLoading" active />
        <a-skeleton v-if="projectLoading" active />
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
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import ProjectCard from '@/components/ProjectCard'
export default {
  name: 'VbLogin',
  components: {
    ProjectCard,
  },
  setup() {
    const store = useStore()
    const settings = computed(() => store.getters.settings)
    const user = computed(() => store.getters['user/user'])
    const authorized = computed(() => store.getters['user/user'].authorized)
    const projects = computed(() => store.getters['projects/projectNames'])
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
      user,
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
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
