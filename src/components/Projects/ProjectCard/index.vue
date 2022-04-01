<template>
  <div>
    <div class="project-card" @click="$router.push(`/projects/${project.projectId}/overview`)">
      <a-row type="flex" justify="space-between">
        <a-col :span="12" :style="{ top: '10px' }">
          <p class="project-name">{{ project.projectName }}</p>
          <p class="project-id text-gray-6">{{ project.projectId }}</p>
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
