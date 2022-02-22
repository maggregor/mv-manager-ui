<template>
  <div class="container">
    <div :style="`${isActivated ? '' : 'filter: blur(7px)'}`">
      <a-row class="mt-3">
        <a-col :span="7">
          <h3>
            Datasets
          </h3>
        </a-col>
        <a-col :span="17">
          <h3>
            Last 28 days performance
            <h6>(Excluding cached queries)</h6>
          </h3>
        </a-col>
      </a-row>
      <a-row class="p-1">
        <a-col class="pr-5" :span="7">
          <a-skeleton :paragraph="true" active :loading="!datasets.length">
            <DatasetCard
              v-for="dataset in datasets"
              :key="dataset.datasetName"
              :project-id="projectId"
              :dataset-name="dataset.datasetName"
              :default-activated="dataset.activated"
            />
          </a-skeleton>
          <h3 style="margin-top:30px; display: block;">
            Last optimizations
            <a-button :loading="loading" type="link">
              <span
                class="text-dark"
                @click="$router.push(`/projects/${$route.params.projectId}/optimizations`)"
                >All</span
              >
            </a-button>
          </h3>
          <OptimizationHeader
            small
            v-for="optimization in optimizations"
            :key="optimization.id"
            :optimization="optimization"
          />
        </a-col>
        <a-col :span="17">
          <a-row style="height:120px; margin-top: 90px;">
            <a-col class="p-1" :span="8"
              ><Kpi :data="MmvCount" :label="'Queries in Materialized Views<br/>managed by Achilio'"
            /></a-col>
            <a-col class="p-1" :span="8"><Kpi :data="selectCount" :label="`Total queries`"/></a-col>
            <a-col class="p-1" :span="8"
              ><Kpi :data="scannedBytesFormatted" :label="'Average scanned bytes per query'"
            /></a-col>
          </a-row>
          <a-row style="margin-top: 65px">
            <h3>
              Average scanned bytes per query
            </h3>
            <Chart
              :project-id="projectId"
              :average-scanned-bytes="scannedBytes"
              style="width: 100%"
              :fake="!isActivated"
            />
          </a-row>
        </a-col>
      </a-row>
    </div>
    <NotActivatedProject v-if="!isActivated" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

import Kpi from '@/components/KPI'

import DatasetCard from '@/components/Projects/DatasetCard'
import OptimizationHeader from '@/components/Optimization/OptimizationHeader'
import Chart from '@/components/Chart'
import NotActivatedProject from '@/components/Projects/NotActivatedProject'

const prettyBytes = require('pretty-bytes')

export default {
  name: 'Overview',
  components: {
    Kpi,
    DatasetCard,
    OptimizationHeader,
    Chart,
    NotActivatedProject,
  },
  setup() {
    const store = useStore()
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
    const projectId = computed(() => store.getters['projects/currentProjectId'])
    const project = computed(() => store.getters['projects/currentProject'])
    const projectLoading = computed(() => store.getters['projects/loading'])
    const queryStatistics = computed(() => store.getters['projects/currentProjectQueryStatistics'])
    const triggerOptimization = async () => {
      optimizeLoading.value = true
      await store.dispatch('optimizations/RUN_OPTIMIZE', projectId.value)
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
      queryStatistics,
      optimizations,
      optimizeLoading,
      triggerOptimization,
    }
  },
  data() {
    return {
      projectPlan: {
        planName: 'Startup Plan',
        mmvCount: 2,
      },
    }
  },
  computed: {
    isProjectLoading: function() {
      return !this.project
    },
    selectCount: function() {
      if (!this.isActivated) {
        return this.abbr(Math.random() * 100000)
      }
      if (this.queryStatistics) {
        return this.abbr(
          this.queryStatistics.global.totalQueries -
            this.queryStatistics.details.cached.totalQueries,
        )
      }
      return -1
    },
    MmvCount: function() {
      if (!this.isActivated) {
        return Math.floor(Math.random() * 50) + 50 + '%'
      }
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
      if (this.queryStatistics && this.queryStatistics.global.totalQueries) {
        return (
          this.queryStatistics.global.totalProcessedBytes / this.queryStatistics.global.totalQueries
        )
      }
      return -1
    },
    scannedBytesFormatted: function() {
      if (!this.isActivated) {
        return prettyBytes(Math.round(Math.random() * 10))
      }
      if (this.queryStatistics && this.queryStatistics.global.totalQueries) {
        return prettyBytes(this.scannedBytes)
      }
      return -1
    },
    isActivated: function() {
      return !this.isProjectLoading && this.project.activated
    },
  },
  methods: {
    abbr(num) {
      if (num < 1000) {
        return num
      } else if (num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'
      } else {
        return Math.floor(num / 1000000) + 'M'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
