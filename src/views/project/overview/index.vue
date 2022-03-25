<template>
  <div class="container">
    <div :style="`${selectedProject.activated ? '' : 'filter: blur(7px)'}`">
      <a-row>
        <a-col class="pr-5" :span="7">
          <!-- Materialized view section -->
          <div class="section">
            <h3>
              Materialized Views
            </h3>
          </div>
          <!-- Optimization history section -->
          <div class="section">
            <h3>
              History
              <a-button type="link">
                <span
                  v-if="allOptimizations.length"
                  class="text-dark"
                  @click="$router.push(`/projects/${selectedProjectId}/optimizations`)"
                  >See all</span
                >
              </a-button>
            </h3>
            <div class="section-content">
              <div v-if="allOptimizations.length === 0"><EmptyOptimization /></div>
              <div v-else>
                <div v-for="(optimization, index) in allOptimizations" :key="optimization.id">
                  <OptimizationHeader small v-if="index < 3" :optimization="optimization" />
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="17">
          <div class="section">
            <h3>
              Last 7 days performance
            </h3>
            (Excluding cached queries)
            <a-row>
              <a-col :span="8"
                ><Kpi
                  percent
                  :data="kpiPercentQueriesInMV"
                  :label="'Queries in MV managed by Achilio'"
              /></a-col>
              <a-col :span="8"><Kpi :data="kpiTotalQueries" :label="`Total queries`"/></a-col>
              <a-col :span="8"
                ><Kpi
                  bytes
                  :data="kpiAverageScannedBytes"
                  :label="'Average scanned bytes per query'"
              /></a-col>
            </a-row>
          </div>
          <div class="section">
            <h3>
              Last optimization
            </h3>
            <div>
              <div v-if="lastOptimization">
                <OptimizationHeader standalone :index="index" :optimization="lastOptimization" />
              </div>
              <div v-else>
                <EmptyOptimization />
              </div>
            </div>
          </div>
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
import OptimizationHeader from '@/components/Optimization/OptimizationHeader'
import NotActivatedProject from '@/components/Projects/NotActivatedProject'
import EmptyOptimization from '@/components/Projects/EmptyOptimization'

export default {
  name: 'Overview',
  components: {
    Kpi,
    OptimizationHeader,
    EmptyOptimization,
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
      'lastOptimization',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
