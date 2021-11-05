<template>
  <div :class="$style.container">
    <div class="d-flex flex-wrap align-items-center">
      <ProjectHeader :project="project" />
    </div>
    <a-row>
      <a-col :span="8">
        <TableExplorerTree />
      </a-col>
      <a-col :span="16">
        <a-row>
            <a-col :span="8"><Kpi1 :data="selectCount" :label="'Queries Total'"/></a-col>
            <a-col :span="8"><Kpi1 :data="MmvCount" :label="'Queries in MMV'"/></a-col>
            <a-col :span="8"><Kpi1 :data="scannedBytes" :label="'Total scanned byte'"/></a-col>
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
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import ProjectHeader from '@/components/Projects/ProjectHeader'
import ProjectPlan from '@/components/Projects/ProjectPlan'
import Kpi1 from '@/components/KPI1'
import TableExplorerTree from '@/components/TableExplorer/TableExplorerTree'

const prettyBytes = require('pretty-bytes')

export default {
  name: 'Overview',
  components: { ProjectHeader, ProjectPlan, Kpi1, TableExplorerTree },
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
      store.dispatch('projects/LOAD_CURRENT_PROJECT', {
        projectId: projectId,
        datasetId: 'nyc_trips',
      })
    })
    const project = computed(() => store.getters['projects/getProjectById'](projectId))
    const projectLoading = computed(() => store.getters['projects/loading'])
    const projectTables = computed(() => store.getters['projects/currentProjectTables'])
    const queryStatistics = computed(() => store.getters['projects/currentProjectQueryStatistics'])
    return {
      store,
      datasets,
      project,
      projectId,
      projectLoading,
      projectTables,
      queryStatistics,
    }
  },
  // Fake data before API Implementation
  data() {
    return {
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
    selectCount: function() {
      if (this.queryStatistics) {
        return this.queryStatistics.global.queries
      }
      return -1
    },
    MmvCount: function() {
      if (this.queryStatistics) {
        return this.queryStatistics.details.in.queries
      }
      return -1
    },
    scannedBytes: function() {
      if (this.queryStatistics) {
        return prettyBytes(this.queryStatistics.global.billedBytes)
      }
      return -1
    },
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
