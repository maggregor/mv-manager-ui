<template>
  <div :class="$style.container">
    <h1 class="text-black text-weight-700 font-size-50">Hello {{ username }},</h1>
    <h2 class="mb-5 text-gray-7 text-weight-300 font-size-24">
      You are connected to your
      <span class="google-font text-weight-500 mr-2">Google Cloud Platform™</span>

      <img :style="{ height: '2rem' }" src="@/assets/google/google-cloud-platform_logo.svg" />
    </h2>
    <a-skeleton :loading="isProjectLoading">
      <ProjectCard
        v-for="project in activatedProjects"
        :key="project.projectId"
        :project-id="project.projectId"
        :project-name="project.projectName"
        :dataset-count="project.datasetCount"
        :is-activated="project.activated"
      />
    </a-skeleton>
    <div
      v-if="notActivatedProjects.length"
      class="mb-3 mt-5 text-black text-weight-300 font-size-24"
    >
      <span class="text-weight-500">Activate</span> the optimizer on your projects
    </div>
    <a-skeleton :loading="isProjectLoading">
      <ProjectCard
        v-for="project in notActivatedProjects"
        :key="project.projectId"
        :project-id="project.projectId"
        :project-name="project.projectName"
        :dataset-count="project.datasetCount"
        :is-activated="project.activated"
      />
    </a-skeleton>
  </div>
</template>

<script>
import ProjectCard from '@/components/Projects/ProjectCard'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'

export default {
  name: 'Home',
  components: {
    ProjectCard,
  },
  setup() {
    const store = useStore()
    const username = computed(() => store.getters['user/username'])
    const projects = computed(() => store.getters['projects/projectNames'])

    return {
      username,
      projects,
    }
  },
  computed: {
    isProjectLoading: function() {
      return !this.projects.length
    },
    activatedProjects: function() {
      return this.projects.filter(e => e.activated)
    },
    notActivatedProjects: function() {
      return this.projects.filter(e => !e.activated)
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
