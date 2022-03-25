<template>
  <div class="container">
    <h2 class="text-gray-7 text-weight-300 font-size-24">
      You are connected to your
      <span class="google-font text-weight-500 mr-2">Google Cloud Platform</span>
      <img :style="{ height: '2rem' }" src="@/assets/google/google-cloud-platform_logo.svg" />
    </h2>
    Cannot find your project or organization ? Try <a>re-syncing</a> or check the access.
    <div class="mt-5">
      <a-tabs type="card" @change="changeTab">
        <a-tab-pane v-for="o in allOrganizations" :key="o.id" :tab="o.name"> </a-tab-pane>
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
</template>
<script>
import { ref } from '@vue/reactivity'
import { mapGetters, useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import ProjectCard from '@/components/Projects/ProjectCard'
export default {
  components: {
    ProjectCard,
  },
  setup() {
    const store = useStore()
    const orgs = store.getters['allOrganizations']
    const firstOrgId = orgs.length > 0 ? orgs[0].id : 'No organizations'
    const currentOrganizationId = ref(firstOrgId)
    const isFromCurrentOrg = computed(() => project =>
      currentOrganizationId.value === project.organization.id,
    )
    const changeTab = organizationId => {
      currentOrganizationId.value = organizationId
    }
    return {
      isFromCurrentOrg,
      currentOrganizationId,
      changeTab,
    }
  },
  computed: {
    ...mapGetters(['allOrganizations', 'activatedProjects', 'deactivatedProjects']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
