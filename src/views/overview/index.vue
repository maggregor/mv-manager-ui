<template>
  <div>
    <div class="pl-4 d-flex flex-wrap align-items-center">
      <div class="mr-auto">
        <div class="text-weight-600 text-gray-7 font-size-30">{{ project.projectName }}</div>
        <div class="text-weight-200 text-gray-7 font-size-18">{{ project.projectId }}</div>
        <!-- {{ datasets }} -->
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
// import VbHeadersHeading from '@/@vb/widgets/Headers/Heading'
// import VbWidgetsGeneral2v3 from '@/@vb/widgets/WidgetsGeneral/2v3'
// import VbChartsChartistjs1 from '@/@vb/widgets/ChartsChartistjs/1'
// import VbWidgetsGeneral3v1 from '@/@vb/widgets/WidgetsGeneral/3v1'
// import VbWidgetsGeneral1 from '@/@vb/widgets/WidgetsGeneral/1'
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'Overview',
  components: {
    // VbHeadersHeading,
    // VbWidgetsGeneral2v3,
    // VbChartsChartistjs1,
    // VbWidgetsGeneral3v1,
    // VbWidgetsGeneral1,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const datasets = computed(() => store.getters['datasets/datasets'])
    const projectId = route.params.projectId
    onMounted(() => {
      store.dispatch('datasets/LOAD_DATASETS', { projectId: 'achilio-dev' })
    })
    const project = computed(() => store.getters['projects/getProjectById'](projectId))
    return {
      datasets,
      project,
    }
  },
}
</script>
