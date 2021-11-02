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
          <a-col :span="8"><Kpi1 :data="tableCount.data" :label="tableCount.label"/></a-col>
          <a-col :span="8"><Kpi1 :data="viewCount.data" :label="viewCount.label"/></a-col>
          <a-col :span="8"><Kpi1 :data="scannedBytes.data" :label="scannedBytes.label"/></a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <ProjectPlan
              :project-plan="projectPlan.planName"
              :table-count="projectPlan.tableCount"
              :mmv-count="projectPlan.mmvCount"
            />
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
import ProjectPlan from '@/components/Projects/ProjectPlan'
import Kpi1 from '@/components/KPI1'

export default {
  name: 'Overview',
  components: { ProjectHeader, ProjectPlan, Kpi1 },
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
  // Fake data before API Implementation
  data() {
    return {
      tableCount: {
        data: 543,
        label: 'Queries directly on a Table',
      },
      viewCount: {
        data: 21,
        label: 'Queries catched by Managed Materialized View',
      },
      scannedBytes: {
        data: 28000,
        label: 'Total scanned byte last 30 days',
      },
      projectPlan: {
        planName: 'Startup Plan',
        tableCount: 1,
        mmvCount: 2,
      },
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
