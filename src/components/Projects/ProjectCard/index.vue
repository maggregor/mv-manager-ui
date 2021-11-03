<template>
  <div class="project-card mb-4">
    <a-row>
      <a-col :span="12">
        <ProjectNameBlock
          :key="projectId"
          :project-id="projectId"
          :project-name="projectName"
          :dataset-count="datasetCount"
        />
      </a-col>
      <a-col :span="12">
        <a-row class="mt-5" type="flex" justify="space-between" align="bottom">
          <a-col :span="11">
            <CtaSecondary
              class="cta-secondary"
              :url="'/settings/' + projectId"
              :label="'Settings'"
            />
          </a-col>
          <a-col class="ml-1" :span="11">
            <CtaPrimary class="cta-primary" :url="'/projects/' + projectId" :label="'Open'" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
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
