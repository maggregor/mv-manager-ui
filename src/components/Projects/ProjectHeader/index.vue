<template>
  <div>
    <a @click="$router.push('/projects')" class="text-weight-600 font-size-18">{{
      'Back to projects'
    }}</a>
    <h1 class="project-path">
      {{ project.projectName }}
      <span class="path" v-if="breadcrumb"> / {{ breadcrumb }}</span>
    </h1>
    <div v-if="plan" class="project-plan">
      <p class="name">{{ plan.name }}</p>
      <a class="manage" @click="$router.push(`/projects/${project.projectId}/plan`)">Manage plan</a>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
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
    const store = useStore()
    const plan = computed(() => store.getters['plans/planByProjectId'])
    return { plan }
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
