<template>
  <div v-for="project in allProjects" :key="project.projectId">
    <ProjectCard class="mt-2" :project="project" />
  </div>
  <AddProjectCard />
</template>
<script>
import { mapGetters } from 'vuex'
import ProjectCard from '@/components/Projects/ProjectCard'
import AddProjectCard from '@/components/Projects/AddProjectCard'
export default {
  components: {
    ProjectCard,
    AddProjectCard,
  },
  computed: {
    ...mapGetters(['allProjects']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
