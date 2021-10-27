<template>
  <div :class="$style.container">
    <div class="pl-4 d-flex flex-wrap align-items-center">
      <div class="mr-auto">
        <div v-if="project">
          <div class="text-weight-600 text-gray-7 font-size-30">{{ project.projectName }}</div>
          <div class="text-weight-200 text-gray-7 font-size-18">{{ project.projectId }}</div>
        </div>
        <div class="mt-5">
          <div v-for="dataset in datasets" :key="dataset.datasetName">
            <a :to="`/${projectId}/overview`" class="m-1 btn btn-primary width-300">
              Optimize <b>{{ dataset.datasetName }}</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Overview',
  components: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const datasets = computed(() => store.getters['datasets/datasets'])
    const projectId = route.params.projectId
    onMounted(() => {
      store.dispatch('datasets/LOAD_DATASETS', { projectId: projectId })
      .catch(e => router.push('/'))
    })
    const project = computed(() => store.getters['projects/getProjectById'](projectId))
    return {
      datasets,
      project,
      projectId,
    }
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
