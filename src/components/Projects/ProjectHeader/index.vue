<template>
  <div>
    <a @click="$router.push('/projects')" class="text-weight-600 font-size-18">{{
      'Back to projects'
    }}</a>
    <h1 class="project-path">
      {{ project.projectName }}
      <span class="path" v-if="breadcrumb"> / {{ breadcrumb }}</span>
    </h1>
    <h2 class="project-plan">{{ project.projectPlan }}</h2>
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
  setup() {
    return {}
  },
  computed: {
    breadcrumb() {
      let optimizationId = this.$route.params.optimizationId
      if (optimizationId) {
        return `#${optimizationId}`
      }
      return this.$route.meta.breadcrumb
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
