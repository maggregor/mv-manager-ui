<template>
  <div class="container">
    <a-row>
      <a-col :span="12"><ProjectHeader :project="project"/></a-col>
      <a-col :span="12">
        <a-row style="float:right;">
          <cta
            secondary
            style="width: 30%; float:right; margin-top: 100px;margin-right: 10px;"
            @click="$router.push(`/projects/${projectId}/settings`)"
            label="Settings"
          ></cta>
          <cta
            style="width: 60%; margin-top: 100px; "
            label="Start optimization"
            :loading="optimizeLoading"
            @click="triggerOptimization"
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
import { computed, onMounted, method, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import ProjectHeader from '@/components/Projects/ProjectHeader'
import CTA from '@/components/CTA'

const prettyBytes = require('pretty-bytes')

export default {
  name: 'Overview',
  components: {
    ProjectHeader,
    cta: CTA,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const datasets = computed(() => store.getters['datasets/datasets'])
    const optimizations = computed(() => {
      let optimizations = store.getters['optimizations/optimizations']
      optimizations = optimizations.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
      )
      if (optimizations.length >= 3) {
        optimizations.length = 3
      }
      return optimizations
    })
    const optimizeLoading = ref(false)
    const projectId = ref(route.params.projectId)

    const project = computed(() => store.getters['projects/getProjectById'](projectId.value))

    const triggerOptimization = async () => {
      optimizeLoading.value = true
      await store.dispatch('optimizations/RUN_OPTIMIZE', projectId.value)
      optimizeLoading.value = false
    }
    return {
      store,
      datasets,
      project,
      projectId,
      optimizeLoading,
      triggerOptimization,
    }
  },
  data() {
    return {
      projectPlan: {
        planName: 'Startup Plan',
        tableCount: 1,
        mmvCount: 2,
      },
    }
  },
  computed: {
    isProjectLoading: function() {
      return !this.project
    },
    selectCount: function() {
      if (this.queryStatistics) {
        return (
          this.queryStatistics.global.totalQueries -
          this.queryStatistics.details.cached.totalQueries
        )
      }
      return -1
    },
    MmvCount: function() {
      if (this.queryStatistics) {
        let totalOptimized = this.queryStatistics.details.in.totalQueries
        let totalQueries =
          this.queryStatistics.global.totalQueries -
          this.queryStatistics.details.cached.totalQueries
        return Math.round((totalOptimized * 100) / totalQueries) + '%'
      }
      return -1
    },
    scannedBytes: function() {
      if (this.queryStatistics) {
        return prettyBytes(this.queryStatistics.global.totalProcessedBytes)
      }
      return -1
    },
  },
  methods: {
    goTo(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
