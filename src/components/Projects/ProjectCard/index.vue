<template>
  <div>
    <div
      :class="{ 'project-card': true, 'project-activated': project.activated }"
      @click="$router.push(`/projects/${project.projectId}/overview`)"
    >
      <a-row>
        <a-col :span="12" :style="{ top: '10px' }">
          <p class="project-name">{{ project.projectName }}</p>
          <p class="project-id text-gray-6">{{ project.projectId }}</p>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { updateProject } from '@/services/axios/backendApi'
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async activateProject() {
      const email = this.$store.getters['user'].email
      await updateProject(this.projectId, {
        activated: true,
        username: email,
      })
      await this.$store.dispatch('LOAD_ALL_PROJECTS')
      this.$message.success(`${this.projectName} is activated !`, 3)
    },
    async deactivateProject() {
      await updateProject(this.projectId, { activated: false })
      await this.$store.dispatch('LOAD_ALL_PROJECTS')
      this.$message.success(`${this.projectName} is deactivated !`, 3)
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
