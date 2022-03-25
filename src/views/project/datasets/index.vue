<template>
  <div class="container-datasets">
    <a-spin size="large" :spinning="isDatasetsLoading">
      <h1 v-if="allEnabledDatasets.length">{{ allEnabledDatasets.length }} datasets enabled</h1>
      <h1 v-else>No dataset enabled</h1>
      <DatasetCard
        v-for="dataset in allDatasets"
        :key="dataset.datasetName"
        :project-id="selectedProjectId"
        :dataset="dataset"
      />
    </a-spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DatasetCard from '@/components/Projects/DatasetCard'
export default {
  components: { DatasetCard },
  computed: {
    ...mapGetters(['allDatasets', 'allEnabledDatasets', 'isDatasetsLoading', 'selectedProjectId']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
