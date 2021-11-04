<template>
  <div class="project-name-block">
    <p class="project-name">{{ projectName }}</p>
    <p class="project-id text-gray-6">{{ projectId }}</p>
    <div>
    <p class="dataset-count text-gray-5">{{ datasetField }} • {{ Math.floor(Math.random() * 100) }}% optimizable traffic</p>
    </div>
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
          return `${this.datasetCount} datasets`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
