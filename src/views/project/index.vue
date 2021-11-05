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
          <a-col :span="8"><Kpi1 :data="totalSelectOnTable" :label="tableCount.label"/></a-col>
          <a-col :span="8"><Kpi1 :data="totalSelectCaught" :label="viewCount.label"/></a-col>
          <a-col :span="8"><Kpi1 :data="totalScanned" :label="scannedBytes.label"/></a-col>
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
    const totalSelect = ref(-1)
    const totalSelectOnTable = ref(-1)
    const totalSelectCaught = ref(-1)
    const totalScanned = ref(-1)
    watch(queryStatistics, queryStatistics => {
      if (queryStatistics) {
        totalSelect.value = queryStatistics.totalSelect
        totalSelectCaught.value = queryStatistics.totalSelectCaught 
        totalSelectOnTable.value = totalSelect.value - totalSelectCaught.value
        totalScanned.value = prettyBytes(queryStatistics.totalScanned)
      }
    })
    return {
      store,
      datasets,
      project,
      projectId,
      projectLoading,
      projectTables,
      queryStatistics,
      totalSelect,
      totalSelectCaught,
      totalScanned,
      totalSelectOnTable,
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
