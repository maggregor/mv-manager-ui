<template>
  <div class="container">
    <div :style="`${selectedProject.activated ? '' : 'filter: blur(7px)'}`">
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
          <a-skeleton
            :paragraph="true"
            active
            :loading="allDatasets === undefined && isDatasetsLoading"
          >
            <DatasetCard
              v-for="dataset in allDatasets"
              :key="dataset.datasetName"
              :project-id="selectedProjectId"
              :dataset="dataset"
            />
          </a-skeleton>
          <h3 style="margin-top:30px; display: block;">
            Optimisations
            <a-button type="link">
              <span
                class="text-dark"
                @click="$router.push(`/projects/${selectedProjectId}/optimizations`)"
                >See all</span
              >
            </a-button>
          </h3>
          <div v-for="(optimization, index) in allOptimizations" :key="optimization.id">
            <OptimizationHeader small v-if="index < 3" :optimization="optimization" />
          </div>
        </a-col>
        <a-col :span="17">
          <a-row style="height:120px; margin-top: 90px;">
            <a-col :span="8"
              ><Kpi
                percent
                :data="kpiPercentQueriesInMV"
                :label="'Queries in Materialized Views managed by Achilio'"
            /></a-col>
            <a-col :span="8"><Kpi :data="kpiTotalQueries" :label="`Total queries`"/></a-col>
            <a-col :span="8"
              ><Kpi bytes :data="kpiAverageScannedBytes" :label="'Average scanned bytes per query'"
            /></a-col>
          </a-row>
          <a-row style="margin-top: 65px">
            <h3>
              Average scanned bytes per query
            </h3>
            <Chart style="width: 90%; height: 200px; margin: auto" :fake="false" />
          </a-row>
        </a-col>
      </a-row>
    </div>
    <NotActivatedProject v-if="!selectedProject.activated" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import Kpi from '@/components/KPI'
import DatasetCard from '@/components/Projects/DatasetCard'
import OptimizationHeader from '@/components/Optimization/OptimizationHeader'
import Chart from '@/components/Chart'
import NotActivatedProject from '@/components/Projects/NotActivatedProject'

export default {
  name: 'Overview',
  components: {
    Kpi,
    DatasetCard,
    OptimizationHeader,
    Chart,
    NotActivatedProject,
  },
  computed: {
    ...mapGetters([
      'kpiTotalQueries',
      'kpiPercentQueriesInMV',
      'kpiAverageScannedBytes',
      'selectedProject',
      'selectedProjectId',
      'allOptimizations',
      'allDatasets',
      'isDatasetsLoading',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
