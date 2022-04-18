<template>
  <div>
    <div class="project-card" @click="$router.push(`/projects/${project.projectId}/overview`)">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col :span="16" :style="{ top: '10px' }">
          <p class="project-name">{{ project.projectName }}</p>
          <p class="project-id text-gray-6">{{ project.projectId }}</p>
        </a-col>
        <a-col style="display: flex; justify-content: flex-end" :span="8">
          <img
            style="height: 50px; margin-top: 25px;"
            src="@/assets/illustrations/bigquery_and_achilio.svg"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
