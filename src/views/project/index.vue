<template>
  <div :class="$style.container">
    <div class="pl-4 d-flex flex-wrap align-items-center">
      <a-skeleton :loading="isProjectLoading" active>
        <div class="mr-auto">
          <ProjectHeader :project="project" />
          <div class="mt-5">
            <div v-for="dataset in datasets" :key="dataset.datasetName">
              <a :to="`/${projectId}/overview`" class="m-1 btn btn-primary width-300">
                Optimize <b>{{ dataset.datasetName }}</b>
              </a>
            </div>
          </div>
        </div>
      </a-skeleton>
    </div>
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
