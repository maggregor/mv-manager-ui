<template>
  <div class="container">
    <a-row>
      <a-col :span="16"><ProjectHeader :project="project"/></a-col>
      <a-col :span="8">
        <cta
          secondary
          disabled
          style="width: 49%; float:right; margin-top: 100px;"
          label="Manage subscription"
        ></cta>
        <cta secondary disabled style="width: 49%; margin-top: 100px;" label="Settings"></cta>
      </a-col>
      <a-col class="pr-5" :span="8">
        <h3>
          Datasets
        </h3>
        <!-- 17/20 Managed Materialized Views
        <a style="color: #e21818; font-weight: bold">Upgrade plan</a>
        <a-progress
          style="height:10px"
          :stroke-color="{
            '0%': 'green',
            '90%': 'green',
            '100%': '#e21818',
          }"
          :percent="90"
          :showInfo="false"
        /> -->
      </a-col>
      <a-col :span="16">
        <h3>
          Last 30 days performance
        </h3>
        <h6>(Excluding cached queries)</h6>
      </a-col>
    </a-row>
    <a-row class="p-1">
      <a-col class="pr-5" :span="8">
        <a-skeleton :paragraph="true" active :loading="!datasets.length">
          <DatasetCard
            v-for="dataset in datasets"
            :key="dataset.datasetName"
            :project-id="projectId"
            :name="dataset.datasetName"
          />
        </a-skeleton>
      </a-col>
      <a-col :span="16">
        <a-row style="height:120px; margin-top: 30px;">
          <a-col class="p-1" :span="8"
            ><Kpi :data="MmvCount" :label="'Queries in Materialized Views<br/>managed by BigTunr'"
          /></a-col>
          <a-col class="p-1" :span="8"
            ><Kpi :data="selectCount" :label="`Queries processed<br/>without optimization`"
          /></a-col>
          <a-col class="p-1" :span="8"
            ><Kpi :data="scannedBytes" :label="'Total scanned byte'"
          /></a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <h3 style="margin-top:50px">
              Optimizations history
            </h3>
            <a-empty style="margin-top:10px"></a-empty>
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
import Kpi from '@/components/KPI'
import CTA from '@/components/CTA'

import DatasetCard from '@/components/Projects/DatasetCard'
// import TableExplorerTree from '@/components/TableExplorer/TableExplorerTree'

const prettyBytes = require('pretty-bytes')

export default {
  name: 'Overview',
  components: {
    ProjectHeader,
    Kpi,
    DatasetCard,
    cta: CTA,
  },
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
      })
    })
    const project = computed(() => store.getters['projects/getProjectById'](projectId))
    const projectLoading = computed(() => store.getters['projects/loading'])
    const projectTables = computed(() => store.getters['projects/currentProjectTables'])
    const queryStatistics = computed(() => store.getters['projects/currentProjectQueryStatistics'])
    if (project.value) {
      project.value.projectPlan = 'Enterprise'
    }
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
        return (
          this.queryStatistics.global.totalQueries -
          this.queryStatistics.details.cached.totalQueries
        )
      }
      return -1
    },
    MmvCount: function() {
      if (this.queryStatistics) {
        let totalOptimized = this.queryStatistics.details.in.totalQueries
        let totalQueries =
          this.queryStatistics.global.totalQueries -
          this.queryStatistics.details.cached.totalQueries
        return Math.round((totalOptimized * 100) / totalQueries) + '%'
      }
      return -1
    },
    scannedBytes: function() {
      if (this.queryStatistics) {
        return prettyBytes(this.queryStatistics.global.totalBilledBytes)
      }
      return -1
    },
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
