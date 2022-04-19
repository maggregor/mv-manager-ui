<template>
  <div class="container">
    <a-row justify="space-between">
      <a-col class="pr-5" :span="7">
        <!-- Materialized views section -->
        <div class="section">
          <h3>
            Materialized Views
          </h3>
          <a-col :span="24">
            <div class="no-materialized-views" v-if="!allMaterializedViews.length">
              <div>
                <img
                  style="height: 10%; width: 10%"
                  class="mr-1"
                  src="@/assets/illustrations/materialized_view.svg"
                />
              </div>
              <div class="mt-2">
                No Materialized Views proposals
              </div>

              <a-button @click="triggerFindMVJob" type="link">Find Materialized Views</a-button>
            </div>
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
          <h3 v-if="selectedPeriod">
            {{ selectedPeriod.name }} performance

            <a-button
              v-for="period in periods"
              @click="changePeriod(period.key)"
              :key="period.key"
              :disabled="!hasLoadedAllKPI"
              type="link"
              ><a-badge :dot="true" v-if="period.key === selectedPeriod.key" color="#108ee9" />{{
                period.name
              }}</a-button
            >
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
import { mapGetters, useStore } from 'vuex'
import _ from 'lodash'
import ProjectKPI from '@/components/Projects/ProjectKPI'
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
  name: 'Overview',
  components: {
    ProjectKPI,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const projectId = store.getters['selectedProjectId']
    const periods = {
      last_7_days: {
        name: 'Last 7 days',
        key: 'last_7_days',
        days: 7,
      },
      last_14_days: {
        name: 'Last 14 days',
        key: 'last_14_days',
        days: 14,
      },
      last_28_days: {
        name: 'Last 28 days',
        key: 'last_28_days',
        days: 28,
      },
    }
    const selectedPeriodKey = ref('last_14_days')
    const selectedPeriod = computed(() => periods[selectedPeriodKey.value])
    const triggerFindMVJob = async () => {
      router.push(`/projects/${projectId}/materialized-views`)
      await store.dispatch('FIND_MATERIALIZED_VIEWS', projectId)
    }
    const changePeriod = periodKey => {
      selectedPeriodKey.value = periodKey
      store.dispatch('LOAD_PROJECT_STATISTICS', {
        projectId,
        timeframe: selectedPeriod.value.days,
      })
    }
    return {
      triggerFindMVJob,
      selectedPeriod,
      periods,
      changePeriod,
    }
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
      'isLastFetcherQueryJobPending',
      'lastFercherQueryJob',
      'hasLoadedAllKPI',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
