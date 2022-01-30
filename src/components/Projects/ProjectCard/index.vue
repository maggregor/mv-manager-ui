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
              <a-col :span="12">
                <!-- <cta
                  class="cta-secondary"
                  :url="'/settings/' + projectId"
                  :label="'Settings'"
                /> -->
              </a-col>
              <a-col :span="12">
                <cta secondary :url="'/projects/' + projectId" :label="'Open'" />
              </a-col>
            </a-row>
          </div>
          <div v-else>
            <a-row type="flex" justify="space-between" align="bottom">
              <a-col :span="12"> </a-col>
              <a-col :span="12">
                <cta :url="'https://cloud.google.com/marketplace'" :label="'Try 14-days now'" />
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
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
