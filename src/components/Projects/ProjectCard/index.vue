<template>
  <div>
    <div :class="{ 'project-card': true, 'project-activated': project.activated }">
      <a-row type="flex" justify="space-between">
        <a-col :span="12" :style="{ top: '10px' }">
          <p class="project-name">{{ project.projectName }}</p>
          <p class="project-id text-gray-6">{{ project.projectId }}</p>
        </a-col>
        <a-col style="text-align: end;" :span="6" :style="{ top: '10px' }">
          <a-button type="link" @click="unregisterProject">Unregister</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { mapGetters, useStore } from 'vuex'
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()
    const loading = ref(false)
    const unregisterProject = async () => {
      loading.value = true
      await store.dispatch('UNREGISTER_PROJECT', props.project.projectId)
      loading.value = false
    }
    return {
      unregisterProject,
    }
  },
  computed: {
    ...mapGetters(['plans', 'activePlanName']),
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
