<template>
  <div>
    <div class="project-card mb-4">
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
        <a-col :span="12" :style="{ top: '50px' }">
          <div v-if="isActivated">
            <a-row type="flex" justify="space-between" align="bottom">
              <a-col style="right: 2%" :span="12">
                <CtaSecondary
                  class="cta-secondary"
                  :url="'/settings/' + projectId"
                  :label="'Settings'"
                />
              </a-col>
              <a-col :span="12">
                <CtaPrimary :url="'/projects/' + projectId" :label="'Open'" />
              </a-col>
            </a-row>
          </div>
          <div v-else>
            <CtaSecondary
              :url="'https://cloud.google.com/marketplace'"
              :label="'Enable in Google Cloud Marketplace'"
            />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import CtaPrimary from '@/components/CTA/CtaPrimary'
import CtaSecondary from '@/components/CTA/CtaSecondary'
import ProjectNameBlock from '@/components/Projects/ProjectName'

export default {
  name: 'ProjectCard',
  components: {
    ProjectNameBlock,
    CtaSecondary,
    CtaPrimary,
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
