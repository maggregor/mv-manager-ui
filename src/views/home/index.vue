<template>
  <div :class="$style.container">
    <div class="text-black text-weight-600 font-size-36">
      Hi {{ username }}, welcome to your optimizer
    </div>
    <div class="mb-4 text-black text-weight-200 font-size-24">
      Activate one of your BigQuery projects below
    </div>
    <a-skeleton v-if="projectLoading" active />
    <div v-else>
      <ProjectCard
        v-for="project in projects"
        :key="project.projectId"
        :project-id="project.projectId"
        :project-name="project.projectName"
        :dataset-count="project.datasetCount"
        :activated="project.activated"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from '@/components/Projects/ProjectCard'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  name: 'Home',
  components: {
    ProjectCard,
  },
  setup() {
    const store = useStore()
    const username = computed(() => store.getters['user/username'])
    const projects = computed(() => store.getters['projects/projectNames'])
    const projectLoading = computed(() => store.getters['projects/loading'])

    return {
      username,
      projects,
      projectLoading,
    }
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
