<template>
  <div>
    <a @click="$router.push('/')" class="text-weight-600 font-size-18">{{ 'Back to projects' }}</a>
    <h1 class="project-path">
      {{ project.projectName }}
    </h1>
    <div v-if="isSelectedProjectSynchronizing">
      <a-button :loading="true" type="link">Synchronizing</a-button>
    </div>
    <div v-else>
      <p>
        <a-button type="link" @click="synchronize">Synchronize</a-button> your project to start
        using Achilio.
      </p>
      <!-- <p v-if="lastFetcherQueryJob">
        <i>Last update {{ moment(lastFetcherQueryJob.createdAt).fromNow() }}</i>
      </p> -->
    </div>
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
    const synchronize = () => store.dispatch('SYNCHRONIZE', { projectId })
    return {
      synchronize,
      moment,
    }
  },
  computed: {
    ...mapGetters([
      'selectedProjectPlan',
      'hasSelectedProjectPlan',
      'isSelectedProjectSynchronizing',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
.ant-btn {
  padding: 0px;
}
</style>
