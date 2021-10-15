<template>
  <div class="project-name-block">
    <p class="project-name">{{ projectName }}</p>
    <p class="project-id">{{ projectId }}</p>
    <p class="dataset-count">{{ datasetField }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProjectNameBlock',
  props: {
    projectId: {
      type: String,
      default: '',
    },
    projectName: {
      type: String,
      default: '',
    },
    datasetCount: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    datasetField() {
      switch (this.datasetCount) {
        case -1:
          return 'Loading...'
        case 0:
          return 'No dataset'
        default:
          return `${this.datasetCount} dataset(s)`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
