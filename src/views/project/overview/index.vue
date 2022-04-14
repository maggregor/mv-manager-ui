<template>
  <div class="container">
    <a-row>
      <a-col class="pr-5" :span="7">
        <!-- Materialized views section -->
        <div class="section">
          <h3>
            Materialized Views
          </h3>
          <a-col :span="24">
            <a-card v-if="!allMaterializedViews.length">No Materialized Views</a-card>
            <a-alert
              v-if="allAppliedMaterializedViews.length"
              :message="`x ${allAppliedMaterializedViews.length} are applied`"
              description=" "
              type="success"
              show-icon
              class="mb-3"
            >
              <template #icon>
                <img
                  style="height: 7%; width: 7%"
                  class="mr-1"
                  src="@/assets/illustrations/materialized_view.svg"
              /></template>
            </a-alert>
          </a-col>
          <a-col :span="24"
            ><a-alert
              v-if="allNotAppliedMaterializedViews.length"
              :message="`x ${allNotAppliedMaterializedViews.length} are waiting for review`"
              type="info"
              show-icon
              class="mb-3"
            >
              <template #icon>
                <img
                  style="height: 7%; width: 7%"
                  class="mr-1"
                  src="@/assets/illustrations/materialized_view.svg"/></template
              ><template #description>
                <a-button
                  type="link"
                  @click="$router.push('/projects/achilio-dev/materialized-views')"
                >
                  Review now
                </a-button>
              </template>
            </a-alert>
          </a-col>
          <a-col :span="24">
            <a-alert
              v-if="allOutdatedMaterializedViews.length"
              :message="`x ${allOutdatedMaterializedViews.length} are outdated`"
              type="warning"
              show-icon
            >
              <template #icon>
                <img
                  style="height: 7%; width: 7%"
                  class="mr-1"
                  src="@/assets/illustrations/materialized_view.svg"
              /></template>
              <template #description>
                <a-button
                  type="link"
                  @click="$router.push('/projects/achilio-dev/materialized-views')"
                >
                  Clean up now
                </a-button>
              </template></a-alert
            ></a-col
          >
        </div>
      </a-col>
      <a-col :span="17">
        <div class="section">
          <h3>
            Last 14 days performance
          </h3>
          (Excluding cached queries)
          <a-row>
            <a-col :span="8"
              ><ProjectKPI
                percent
                :data="kpiPercentQueriesInMV"
                :label="'Queries in MV managed by Achilio'"
            /></a-col>
            <a-col :span="8"><ProjectKPI :data="kpiTotalQueries" :label="`Total queries`"/></a-col>
            <a-col :span="8"
              ><ProjectKPI
                bytes
                :data="kpiAverageScannedBytes"
                :label="'Average scanned bytes per query'"
            /></a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import ProjectKPI from '@/components/Projects/ProjectKPI'

export default {
  name: 'Overview',
  components: {
    ProjectKPI,
  },
  computed: {
    ...mapGetters([
      'kpiTotalQueries',
      'kpiPercentQueriesInMV',
      'kpiAverageScannedBytes',
      'selectedProject',
      'selectedProjectId',
      'allDatasets',
      'isDatasetsLoading',
      'allMaterializedViews',
      'allAppliedMaterializedViews',
      'allNotAppliedMaterializedViews',
      'allOutdatedMaterializedViews',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
