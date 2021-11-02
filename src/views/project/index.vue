<template>
  <div :class="$style.container">
    <div class="d-flex flex-wrap align-items-center">
      <ProjectHeader :project="project" />
    </div>
    <a-row>
      <a-col :span="8">
        Tree view Datasets / Tables
      </a-col>
      <a-col :span="16">
        <a-row>
          <a-col :span="6" :offset="2"> KPI #1 </a-col>
          <a-col :span="6" :offset="2"> KPI #2 </a-col>
          <a-col :span="6" :offset="2"> KPI #3 </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            Project Plan / Upgrade the project
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import ProjectHeader from '@/components/Projects/ProjectHeader'

export default {
  name: 'Overview',
  components: { ProjectHeader },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const datasets = computed(() => store.getters['datasets/datasets'])
    const projectId = route.params.projectId
    onMounted(() => {
      store
        .dispatch('datasets/LOAD_DATASETS', { projectId: projectId })
        .catch(e => router.push('/'))
    })
    const project = computed(() => store.getters['projects/getProjectById'](projectId))
    const projectLoading = computed(() => store.getters['projects/loading'])
    return {
      store,
      datasets,
      project,
      projectId,
      projectLoading,
    }
  },
  computed: {
    isProjectLoading: function() {
      return !this.project
    },
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
