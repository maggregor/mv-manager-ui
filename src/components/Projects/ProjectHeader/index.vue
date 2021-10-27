<template>
  <div class="project-header">
    <p class="project-name">{{ project.projectName }}</p>
    <p class="project-id">{{ project.projectId }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProjectHeader',
  props: {
    project: {
      type: Object,
      default: () => ({
        projectId: 'loading...',
        projectName: 'Loading...',
      }),
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
