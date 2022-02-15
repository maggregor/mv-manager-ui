<template>
  <div class="container">
    {{ goBackMessage }}
    <a-row>
      <a-col :span="12"><ProjectHeader :project="project"/></a-col>
      <a-col :span="12">
        <a-row style="float:right;">
          <cta
            secondary
            style="width: 20%; margin-top: 100px;margin-right: 10px;"
            @click="router.go(-1)"
            label="Back"
          ></cta
          ><cta
            secondary
            style="width: 20%; margin-top: 100px; margin-right: 10px;"
            label="Settings"
            @click="router.push(`/projects/${projectId}/settings`)"
          ></cta>
          <cta
            style="width: 45%; margin-top: 100px; "
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
import { computed, ref } from 'vue'
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
    const projectId = ref(route.params.projectId)
    const project = computed(() => store.getters['projects/getProjectById'](projectId.value))

    const triggerOptimization = async () => {
      optimizeLoading.value = true
      await store.dispatch('optimizations/RUN_OPTIMIZE', projectId.value)
      optimizeLoading.value = false
    }

    return {
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
