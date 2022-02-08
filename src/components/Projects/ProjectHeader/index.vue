<template>
  <div>
    <a @click="$router.push('/projects')" class="text-weight-600 font-size-18">{{
      'Back to projects'
    }}</a>
    <h1 class="mt-3 project-name">
      {{ project.projectName }}
    </h1>
    <h2 class="project-plan">{{ project.projectPlan }}</h2>
    <!-- <a-progress
      :stroke-color="{
        '0%': 'rgb(255, 109, 109)',
        '100%': 'blue',
      }"
      :percent="90"
      :showInfo="false"
      style="width:150px; height:5px important;"
    />
    17/20 Materialized View -->
    <!-- <h2 class="project-id">{{ project.projectId }}</h2> -->
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
        projectName: 'loading...',
        projectPlan: 'loading...',
      }),
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
