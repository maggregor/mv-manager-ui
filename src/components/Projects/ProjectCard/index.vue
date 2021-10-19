<template>
  <div class="project-card mb-4">
    <ProjectNameBlock
      :key="project.projectId"
      :project-id="project.projectId"
      :project-name="project.projectName"
      :dataset-count="project.datasetCount"
    /><CtaSecondary
      class="cta-secondary"
      :project-id="project.projectId"
      :url="'/settings'"
      :label="'Settings'"
    />
    <CtaPrimary
      class="cta-primary"
      :project-id="project.projectId"
      :url="'/overview'"
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
  data() {
    return {
      project: {
        projectId: this.projectId,
        projectName: this.projectName,
        datasetCount: this.datasetCount,
      },
    }
  },
  watch: {
    datasetCount: function() {
      this.project.datasetCount = this.datasetCount
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
