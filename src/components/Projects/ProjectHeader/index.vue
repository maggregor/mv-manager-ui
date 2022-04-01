<template>
  <div>
    <a @click="$router.push('/')" class="text-weight-600 font-size-18">{{ 'Back to projects' }}</a>
    <h1 class="project-path">
      {{ project.projectName }}
      <span class="path" v-if="breadcrumb"> / {{ breadcrumb }}</span>
    </h1>
    <!-- <div class="project-plan">
      <p v-if="hasSelectedProjectPlan" class="plan-name">
        {{ selectedProjectPlan.name }}
      </p>
      <p v-else class="no-plan-name">No subscription</p>
      <a class="manage" @click="$router.push(`/projects/${project.projectId}/plan`)">Manage plan</a>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProjectHeader',
  props: {
    project: {
      type: Object,
      default: () => ({
        projectId: 'loading...',
        projectName: 'loading...',
      }),
    },
  },
  computed: {
    ...mapGetters(['selectedProjectPlan', 'hasSelectedProjectPlan']),
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
