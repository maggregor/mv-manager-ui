<template>
  <div class="project-header">
    <p class="project-name">{{ project.projectName }}</p>
    <p class="project-id">{{ project.projectId }}</p>
  </div>
  <!-- <div class="container">
    <h1 class="text-black text-weight-700 font-size-50">{{ project.projectName }}</h1>
    <h2 class="mb-5 text-gray-7 text-weight-300 font-size-24">
      {{ project.projectId }}
    </h2>
  </div> -->
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
.container {
  max-width: 50vw;
  min-width: 50vw;
  padding: rem(0) rem(30) rem(30) rem(30);
  margin-left: auto;
  margin-right: auto;
}
</style>
