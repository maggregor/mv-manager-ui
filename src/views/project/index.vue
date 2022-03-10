<template>
  <div class="container">
    <a-row v-if="hasSelectedProject">
      <a-col :span="12"><ProjectHeader :project="selectedProject"/></a-col>
      <a-col :span="12">
        <a-row style="float:right;">
          <cta
            v-if="isOverview"
            secondary
            style="width: 160px; margin-top: 100px; margin-right: 10px;"
            label="Settings"
            :url="`/projects/${selectedProject.projectId}/settings`"
          ></cta>
          <cta
            v-else
            secondary
            style="width: 160px; margin-top: 100px;margin-right: 10px;"
            :url="`/projects/${selectedProject.projectId}/overview`"
            label="Back to overview"
          ></cta>
          <cta
            style="width: 55%; margin-top: 100px;"
            label="Start optimization"
            popover-text="You have to enable at least one dataset"
            :trigger="triggerOptimization"
            :disabled="!atLeastOneDatasetIsActivated"
          ></cta>
        </a-row>
      </a-col>
      <router-view v-slot="{ Component }">
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
import Popper from 'vue3-popper'

export default {
  name: 'Overview',
  components: {
    ProjectHeader,
    cta: CTA,
    Popper,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const projectId = route.params.projectId
    onMounted(async () => {
      store.dispatch('SET_SELECTED_PROJECT_ID', projectId)
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
