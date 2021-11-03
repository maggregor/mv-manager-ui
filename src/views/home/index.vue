<template>
  <div :class="$style.container">
    <div class="mb-4 text-black text-weight-600 font-size-36">
      Hi {{ username }}, welcome to your optimizer
    </div>
    <div v-if="activatedProjects.length" class="mb-3 text-black text-weight-200 font-size-24">
      Your activated projects below
    </div>
    <a-skeleton :loading="isProjectLoading">
      <ProjectCard
        v-for="project in activatedProjects"
        :key="project.projectId"
        :project-id="project.projectId"
        :project-name="project.projectName"
        :dataset-count="project.datasetCount"
        :activated="project.activated"
      />
    </a-skeleton>
    <div v-if="notActivatedProjects.length" class="mb-3 text-black text-weight-200 font-size-24">
      Activate one of your BigQuery projects below
    </div>
    <a-skeleton :loading="isProjectLoading">
      <ProjectCard
        v-for="project in notActivatedProjects"
        :key="project.projectId"
        :project-id="project.projectId"
        :project-name="project.projectName"
        :dataset-count="project.datasetCount"
        :activated="project.activated"
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
