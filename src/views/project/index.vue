<template>
  <div class="container">
    <a-row>
      <a-col :span="8"><ProjectHeader :project="project"/></a-col>
      <a-col :span="8">
        <cta
          style="width: 49%; float:right; margin-top: 100px; margin-right: 5px;"
          label="Start optimization"
          :loading="optimizeLoading"
          @click="triggerOptimization"
        ></cta
      ></a-col>
      <a-col :span="8">
        <cta
          secondary
          disabled
          style="width: 49%; float:right; margin-top: 100px;"
          label="Manage subscription"
        ></cta>
        <cta secondary disabled style="width: 49%; margin-top: 100px;" label="Settings"></cta>
      </a-col>
    </a-row>
    <a-row class="mt-3">
      <a-col :span="8">
        <h3>
          Datasets
        </h3>
      </a-col>
      <a-col :span="16">
        <h3>
          Last 30 days performance
          <h6>(Excluding cached queries)</h6>
        </h3>
      </a-col>
    </a-row>
    <a-row class="p-1">
      <a-col class="pr-5" :span="8">
        <a-skeleton :paragraph="true" active :loading="!datasets.length">
          <DatasetCard
            v-for="dataset in datasets"
            :key="dataset.datasetName"
            :project-id="projectId"
            :dataset-name="dataset.datasetName"
            :default-activated="dataset.activated"
          />
        </a-skeleton>
        <h3
          style="margin-top:30px; 
  display: block;"
        >
          Last optimizations
          <a-button :loading="loading" type="link">
            <span
              class="text-dark"
              @click="$router.push(`/projects/${$route.params.projectId}/optimizations`)"
              >All</span
            >
          </a-button>
        </h3>
        <OptimizationHistoryCard
          v-for="optimization in optimizations"
          :key="optimization.id"
          :date="optimization.createdDate"
          :id="optimization.id"
          :eligible-percent="optimization.eligiblePercent"
        />
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
        <a-row style="height:500px">
          <Chart style="width: 100%" />
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { computed, onMounted, method, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import ProjectHeader from '@/components/Projects/ProjectHeader'
import Kpi from '@/components/KPI'
import CTA from '@/components/CTA'

import DatasetCard from '@/components/Projects/DatasetCard'
import OptimizationHistoryCard from '@/components/OptimizationHistoryCard'
import Chart from '@/components/Chart'

import { optimizeProject } from '@/services/axios/backendApi'

const prettyBytes = require('pretty-bytes')

export default {
  name: 'Overview',
  components: {
    ProjectHeader,
    Kpi,
    DatasetCard,
    cta: CTA,
    OptimizationHistoryCard,
    Chart,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const datasets = computed(() => store.getters['datasets/datasets'])
    const optimizations = computed(() => {
      let optimizations = store.getters['optimizations/optimizations']
      optimizations = optimizations.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
      )
      if (optimizations.length >= 3) {
        optimizations.length = 3
      }
      return optimizations
    })
    const optimizeLoading = ref(false)
    const projectId = ref(route.params.projectId)
    onMounted(() => {
      store.dispatch('datasets/LOAD_DATASETS', { projectId: projectId.value })
      store.dispatch('projects/LOAD_CURRENT_PROJECT', { projectId: projectId.value })
      store.dispatch('optimizations/LOAD_OPTIMIZATIONS', { projectId: projectId.value })
    })
    const project = computed(() => store.getters['projects/getProjectById'](projectId.value))
    const projectLoading = computed(() => store.getters['projects/loading'])
    const projectTables = computed(() => store.getters['projects/currentProjectTables'])
    const queryStatistics = computed(() => store.getters['projects/currentProjectQueryStatistics'])
    const triggerOptimization = async () => {
      optimizeLoading.value = true
      await optimizeProject(projectId.value)
      optimizeLoading.value = false
    }
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
      optimizations,
      optimizeLoading,
      triggerOptimization,
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
        return prettyBytes(this.queryStatistics.global.totalProcessedBytes)
      }
      return -1
    },
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
