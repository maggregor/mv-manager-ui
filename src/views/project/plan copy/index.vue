<template>
  <div class="container">
    <a-spin size="large" :spinning="allDatasets === undefined && isDatasetsLoading">
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
    ...mapGetters(['allDatasets', 'isDatasetsLoading', 'selectedProjectId']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
