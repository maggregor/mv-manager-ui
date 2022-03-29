<template>
  <div class="container">
    <EmptyProjectList v-if="!allProjects.length" />
    <div v-else>
      <div class="mt-5">
        <a-tabs type="card" @change="changeTab">
          <a-tab-pane v-for="o in allOrganizations" :key="o.id" :tab="o.name" />
        </a-tabs>
        <div v-if="deactivatedProjects.length" class="mb-3"></div>
        <div v-for="project in activatedProjects" :key="project.projectId">
          <ProjectCard v-if="isFromCurrentOrg(project)" :project="project" />
        </div>
        <a-divider>Not yet managed by Achilio</a-divider>
        <div v-for="project in deactivatedProjects" :key="project.projectId">
          <ProjectCard v-if="isFromCurrentOrg(project)" :project="project" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { mapActions, mapGetters, useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import ProjectCard from '@/components/Projects/ProjectCard'
import EmptyProjectList from '@/components/Projects/EmptyProjectList'
export default {
  components: {
    ProjectCard,
    EmptyProjectList,
  },
  setup() {
    const store = useStore()
    const orgs = store.getters['allOrganizations']
    const firstOrgId = orgs.length > 0 ? orgs[0].id : 'No organizations'
    const currentOrganizationId = ref(firstOrgId)
    const isFromCurrentOrg = computed(() => project =>
      project.organization ? currentOrganizationId.value === project.organization.id : false,
    )
    const changeTab = organizationId => {
      currentOrganizationId.value = organizationId
    }

    return { isFromCurrentOrg, currentOrganizationId, changeTab }
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
