<template>
  <div>
    <div :class="{ 'project-card': true, 'mb-4': true, 'project-activated': isActivated }">
      <a-row>
        <a-col :span="12" :style="{ top: '10px' }">
          <ProjectNameBlock
            :key="projectId"
            :project-id="projectId"
            :project-name="projectName"
            :dataset-count="datasetCount"
          />
        </a-col>
        <!-- Activated project -->
        <a-col :span="12" :style="{ top: '15px' }">
          <div v-if="isActivated">
            <a-row type="flex" justify="space-between" align="bottom">
              <a-col :span="8">
                <!-- <cta
                  class="cta-secondary"
                  :url="'/settings/' + projectId"
                  :label="'Settings'"
                /> -->
              </a-col>
              <a-col class="p-1" :span="8">
                <cta secondary :trigger="deactivateProject" :label="'Deactivate'" />
              </a-col>
              <a-col class="p-1" :span="8">
                <cta secondary :url="`/projects/${projectId}/overview`" :label="'Open'" />
              </a-col>
            </a-row>
          </div>
          <div v-else>
            <a-row type="flex" justify="space-between" align="bottom">
              <a-col :span="8"> </a-col>
              <a-col :span="16">
                <cta :trigger="activateProject" :label="'Try 14-days now'" />
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import CTA from '@/components/CTA'
import ProjectNameBlock from '@/components/Projects/ProjectName'
import { updateProjectMetadata } from '@/services/axios/backendApi'
import { useStore } from 'vuex'

export default {
  name: 'ProjectCard',
  components: {
    ProjectNameBlock,
    cta: CTA,
  },
  props: {
    projectId: {
      type: String,
      default: '',
    },
    projectName: {
      type: String,
      default: '',
    },
    datasetCount: {
      type: Number,
      default: -1,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async activateProject() {
      // this.$message.loading(`Activation of ${this.projectName} in progress..`, 2)
      await updateProjectMetadata(this.projectId, { activated: true })
      await this.$store.dispatch('projects/LOAD_PROJECTS')
      this.$message.success(`${this.projectName} is activated !`, 3)
    },
    async deactivateProject() {
      // this.$message.loading(`Deactivation of ${this.projectName} in progress..`, 2)
      await updateProjectMetadata(this.projectId, { activated: false })
      await this.$store.dispatch('projects/LOAD_PROJECTS')
      this.$message.success(`${this.projectName} is deactivated !`, 3)
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
