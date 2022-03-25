<template>
  <div class="container">
    <a-row v-if="hasSelectedProject" align="bottom">
      <a-col :span="10"><ProjectHeader :project="selectedProject"/></a-col>
      <a-col :span="10">
        <MenuBar v-if="project.activated" />
      </a-col>
      <a-col :span="4" style="display:flex; justify-content: end;">
        <cta
          label="Start optimization"
          popover-text="You have to enable at least one dataset"
          :trigger="triggerOptimization"
          :disabled="!atLeastOneDatasetIsActivated"
        ></cta>
      </a-col>
      <a-divider style="padding: 0px" />
      <router-view class="mt-4" v-slot="{ Component }">
        <transition name="zoom-fadein" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </a-row>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { mapGetters, useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import ProjectHeader from '@/components/Projects/ProjectHeader'
import CTA from '@/components/CTA'
import MenuBar from '@/components/Projects/MenuBar'
import Popper from 'vue3-popper'

export default {
  name: 'Overview',
  components: {
    ProjectHeader,
    cta: CTA,
    MenuBar,
    Popper,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const projectId = route.params.projectId
    const project = computed(() => store.getters.selectedProject)
    onMounted(async () => {
      store.dispatch('SET_SELECTED_PROJECT_ID', projectId)
      //TODO: Check permissions
      store.dispatch('LOAD_DATASETS', { projectId })
      store.dispatch('LOAD_OPTIMIZATIONS', { projectId })
      store.dispatch('LOAD_PROJECT_STATISTICS', { projectId, timeframe: 7 })
    })
    const triggerOptimization = async () => {
      router.push(`/projects/${projectId}/overview`)
      await store.dispatch('RUN_OPTIMIZE', projectId)
    }
    const isOverview = computed(() => route.fullPath.includes('overview'))
    return {
      isOverview,
      router,
      triggerOptimization,
      project,
    }
  },
  computed: {
    ...mapGetters(['hasSelectedProject', 'selectedProject', 'atLeastOneDatasetIsActivated']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
