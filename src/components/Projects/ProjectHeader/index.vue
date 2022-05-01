<template>
  <div>
    <a @click="$router.push('/')" class="text-weight-600 font-size-18">{{ 'Back to projects' }}</a>
    <h1 class="project-path">
      {{ project.projectName }}
    </h1>
  </div>
</template>

<script>
const moment = require('moment')
import { mapGetters, useStore } from 'vuex'
export default {
  name: 'ProjectHeader',
  props: {
    project: {
      type: Object,
      default: () => ({
        projectId: 'loading...',
        projectName: 'loading...',
      }),
    },
  },
  setup() {
    const store = useStore()
    const projectId = store.getters['selectedProjectId']
    const synchronize = () => store.dispatch('SYNC_ALL', projectId)
    return {
      synchronize,
      moment,
    }
  },
  computed: {
    ...mapGetters(['selectedProjectPlan', 'hasSelectedProjectPlan']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
.ant-btn {
  padding: 0px;
}
</style>
