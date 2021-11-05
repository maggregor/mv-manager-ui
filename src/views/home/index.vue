<template>
  <div :class="$style.container">
    <div class="text-black text-weight-600 font-size-36">
      Hello {{ username }},
    </div>
    <div class="mb-5 text-gray-7 text-weight-300 font-size-18">
      <div>
      You are connected to your <span class="google-font text-weight-400 mr-2">Google Cloud Platform™</span>

    <img :style="{ height: '1.5rem' }" src="@/assets/google/google-cloud-platform_logo.svg" />
      </div>
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
    <div v-if="notActivatedProjects.length" class="mb-3 mt-5 text-black text-weight-200 font-size-24">
      Activate Smart Tuning on your projects
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
.test {
  height: 25%;
  position: relative;
  right: 5%;
  bottom: 10%;
}
</style>
