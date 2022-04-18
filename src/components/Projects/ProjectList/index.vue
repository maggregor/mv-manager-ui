<template>
  <div class="list-container">
    <a-row
      :gutter="[16, 16]"
      :justify="`${allProjects.length > 0 ? 'space-between' : 'space-around'}`"
    >
      <a-col v-for="project in allProjects" :key="project.projectId" :span="12">
        <ProjectCard :project="project" />
      </a-col>
      <a-col :span="12"> <AddProjectCard /></a-col>
    </a-row>
  </div>
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
