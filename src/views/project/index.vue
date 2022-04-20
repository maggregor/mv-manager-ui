<template>
  <div class="container">
    <a-row v-if="hasSelectedProject" align="bottom">
      <a-col :span="10"><ProjectHeader :project="selectedProject"/></a-col>
      <a-col :span="10">
        <MenuBar
          :routes="[
            {
              key: 'overview',
              title: 'Overview',
              route: `/projects/${selectedProjectId}/overview`,
            },
            {
              key: 'materialized-views',
              title: 'Materialized Views',
              route: `/projects/${selectedProjectId}/materialized-views`,
            },
            {
              key: 'settings',
              title: 'Settings',
              route: `/projects/${selectedProjectId}/settings`,
            },
          ]"
        />
      </a-col>
      <a-col :span="4" style="display:flex; justify-content: end;">
        <cta
          label="Find Materialized Views"
          popover-text="You have to enable at least one dataset"
          :trigger="triggerFindMVJob"
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
import { computed, onMounted, ref, watch } from 'vue'
import { mapGetters, useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import ProjectHeader from '@/components/Projects/ProjectHeader'
import CTA from '@/components/CTA'
import MenuBar from '@/components/Projects/MenuBar'
import Popper from 'vue3-popper'

const moment = require('moment')

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
    const timeframe = ref(14)
    onMounted(async () => {
      await store.dispatch('LOAD_MATERIALIZED_VIEWS', projectId)
      store.dispatch('SET_SELECTED_PROJECT_ID', projectId)
      //TODO: Check permissions
      store.dispatch('LOAD_PROJECT_STATISTICS', { projectId, timeframe: timeframe.value })
    })
    const triggerFindMVJob = async () => {
      router.push(`/projects/${projectId}/materialized-views`)
      await store.dispatch('FIND_MATERIALIZED_VIEWS', projectId)
    }
    const isOverview = computed(() => route.fullPath.includes('overview'))
    return {
      isOverview,
      router,
      triggerFindMVJob,
      project,
      moment,
    }
  },
  computed: {
    ...mapGetters([
      'hasSelectedProject',
      'selectedProject',
      'selectedProjectId',
      'atLeastOneDatasetIsActivated',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
