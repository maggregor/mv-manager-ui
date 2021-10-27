<template>
  <div class="project-card mb-4 p-4">
    <ProjectNameBlock
      :key="projectId"
      :project-id="projectId"
      :project-name="projectName"
      :dataset-count="datasetCount"
    /><CtaSecondary
      class="cta-secondary mt-4"
      :resource-id="projectId"
      :url="'/settings'"
      :label="'Settings'"
    />
    <CtaPrimary
      class="cta-primary mt-4"
      :resource-id="projectId"
      :url="'/projects'"
      :label="'Open'"
    />
  </div>
</template>

<script>
import CtaPrimary from '@/components/CTA/CtaPrimary'
import CtaSecondary from '@/components/CTA/CtaSecondary'
import ProjectNameBlock from '@/components/Projects/ProjectName'

export default {
  name: 'ProjectCard',
  components: { ProjectNameBlock, CtaSecondary, CtaPrimary },
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
