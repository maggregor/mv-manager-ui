<template>
  <div class="container">
    <div v-if="allProjects.length">
      <div class="mt-5">
        <div v-for="project in allProjects" :key="project.projectId">
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
    <AddProjectCard />
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { mapGetters, useStore } from 'vuex'
import ProjectCard from '@/components/Projects/ProjectCard'
import AddProjectCard from '@/components/Projects/AddProjectCard'
export default {
  components: {
    ProjectCard,
    AddProjectCard,
  },
  setup() {
    const store = useStore()
    const orgs = store.getters['allOrganizations']
    const firstOrgId = orgs.length > 0 ? orgs[0].id : 'No organizations'
    const currentOrganizationId = ref(firstOrgId)
    const changeTab = organizationId => {
      currentOrganizationId.value = organizationId
    }

    return { currentOrganizationId, changeTab }
  },
  computed: {
    ...mapGetters([
      'allOrganizations',
      'allProjects',
      'activatedProjects',
      'deactivatedProjects',
      'isSynchronizing',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
