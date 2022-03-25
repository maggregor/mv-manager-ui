<template>
  <div class="datasets">
    <DatasetCard
      v-for="dataset in allDatasets"
      :key="dataset.datasetName"
      :project-id="selectedProjectId"
      :dataset="dataset"
    />
  </div>
</template>

<script setup>
import DatasetCard from '@/components/Projects/DatasetCard'
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
