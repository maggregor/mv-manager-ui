<template>
  <div :class="$style.container">
    <h1 class="text-black text-weight-700 font-size-50">Hello {{ username }},</h1>
    <h2 class="mb-5 text-gray-7 text-weight-300 font-size-24">
      You are connected to your
      <span class="google-font text-weight-500 mr-2">Google Cloud Platform</span>
      <img :style="{ height: '2rem' }" src="@/assets/google/google-cloud-platform_logo.svg" />
    </h2>
    <a-skeleton :loading="loading">
      <ProjectCard
        v-for="project in activatedProjects"
        :key="project.projectId"
        :project="project"
      />
    </a-skeleton>
    <div
      v-if="deactivatedProjects.length"
      class="mb-3 mt-5 text-black text-weight-300 font-size-24"
    >
      Projects without <span class="text-weight-600">achilio</span>
    </div>
    <a-skeleton :loading="loading">
      <ProjectCard
        v-for="project in deactivatedProjects"
        :key="project.projectId"
        :project="project"
      />
    </a-skeleton>
  </div>
</template>

<script>
import ProjectCard from '@/components/Projects/ProjectCard'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    ProjectCard,
  },
  computed: {
    ...mapGetters(['username', 'activatedProjects', 'deactivatedProjects', 'loading']),
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
