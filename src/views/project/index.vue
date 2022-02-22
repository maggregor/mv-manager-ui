<template>
  <div class="container">
    <a-row>
      <a-col :span="12"><ProjectHeader :project="project"/></a-col>
      <a-col :span="12">
        <a-row style="float:right;">
          <cta
            v-if="isOverview"
            secondary
            style="width: 150px; margin-top: 100px; margin-right: 10px;"
            label="Settings"
            @click="router.push(`/projects/${projectId}/settings`)"
          ></cta>

          <cta
            v-else
            secondary
            style="width: 150px;; margin-top: 100px;margin-right: 10px;"
            :url="`/projects/${projectId}/overview`"
            label="Back to overview"
          ></cta>
          <cta
            style="width: 50%; margin-top: 100px; "
            label="Start optimization"
            :loading="optimizeLoading"
            :trigger="triggerOptimization"
          ></cta>
        </a-row>
      </a-col>
      <router-view v-if="currentProjectLoaded" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </a-row>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import ProjectHeader from '@/components/Projects/ProjectHeader'
import CTA from '@/components/CTA'

export default {
  name: 'Overview',
  components: {
    ProjectHeader,
    cta: CTA,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const optimizeLoading = ref(false)
    const project = computed(() => store.getters['projects/currentProject'])
    const projectId = ref(route.params.projectId)
    const currentProjectLoaded = ref(false)
    onMounted(async () => {
      await store.dispatch('projects/LOAD_CURRENT_PROJECT', { projectId: projectId.value })
      currentProjectLoaded.value = true
      store.dispatch('datasets/LOAD_DATASETS', { projectId: projectId.value })
      store.dispatch('optimizations/LOAD_OPTIMIZATIONS', { projectId: projectId.value })
      store.dispatch('projects/LOAD_CURRENT_PROJECT_STATISTICS', { days: 28 })
      store.dispatch('projects/LOAD_CURRENT_PROJECT_DAILY_STATISTICS', { days: 28 })
    })
    const triggerOptimization = async () => {
      router.push(`/projects/${projectId.value}/overview`)
      optimizeLoading.value = true
      await store.dispatch('optimizations/RUN_OPTIMIZE', projectId.value)
      optimizeLoading.value = false
    }
    const isOverview = computed(() => route.fullPath.includes('overview'))
    return {
      currentProjectLoaded,
      isOverview,
      router,
      project,
      projectId,
      optimizeLoading,
      triggerOptimization,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
