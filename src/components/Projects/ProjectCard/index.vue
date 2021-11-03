<template>
  <div>
    <div class="project-card mb-4">
      <img class="google-cloud-logo" src="@/assets/google_cloud-icon.svg" />
      <a-row>
        <a-col :span="12" :style="{ top: '-30px' }">
          <ProjectNameBlock
            :key="projectId"
            :project-id="projectId"
            :project-name="projectName"
            :dataset-count="datasetCount"
          />
        </a-col>
        <!-- Activated project -->
        <a-col class="mt-3" :span="12">
          <div v-if="activated">
            <a-row type="flex" justify="space-between" align="bottom">
              <a-col style="right: 2%" :span="12">
                <CtaSecondary
                  class="cta-secondary"
                  :url="'/settings/' + projectId"
                  :label="'Settings'"
                />
              </a-col>
              <a-col :span="12">
                <CtaPrimary class="cta-primary" :url="'/projects/' + projectId" :label="'Open'" />
              </a-col>
            </a-row>
          </div>
          <div v-else>
            <CtaPrimary class="cta-secondary" :url="'https://cloud.google.com/marketplace'" :label="'Enable in Google Cloud Marketplace'" />
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
    activated: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
