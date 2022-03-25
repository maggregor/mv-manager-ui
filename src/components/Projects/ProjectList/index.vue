<template>
  <div class="container">
    <h2 class="text-gray-7 text-weight-300 font-size-24">
      You are connected to your
      <span class="google-font text-weight-500 mr-2">Google Cloud Platform</span>
      <img :style="{ height: '2rem' }" src="@/assets/google/google-cloud-platform_logo.svg" />
    </h2>
    Cannot find your project or organization ? Try
    <a-button type="link" :loading="isSynchronizing" @click="synchronize">re-syncing</a-button>
    or check the access.
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
    const synchronize = async () => store.dispatch('SYNCHRONIZE_PROJECTS')
    const changeTab = organizationId => {
      currentOrganizationId.value = organizationId
    }

    return { synchronize, isFromCurrentOrg, currentOrganizationId, changeTab }
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
