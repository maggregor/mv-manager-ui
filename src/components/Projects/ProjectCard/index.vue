<template>
  <div class="project-card mb-4">
    <ProjectNameBlock
      :key="project.projectId"
      :project-id="project.projectId"
      :project-name="project.projectName"
      :dataset-count="project.datasetCount"
      :dataset-text="project.datasetText"
    /><CtaSecondary class="cta-secondary" />
    <CtaPrimary class="cta-primary" />
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
        datasetText: 'Loading...',
      },
    }
  },
  watch: {
    datasetCount: function() {
      switch (this.datasetCount) {
        case -1:
          this.project.datasetText = 'Loading...'
        case 0:
          this.project.datasetText = 'No dataset'
        default:
          this.project.datasetText = `${this.datasetCount} dataset(s)`
      }
    },
    // computed: {
    //   datasetField() {
    //     switch (this.datasetCount) {
    //       case -1:
    //         return 'Loading...'
    //       case 0:
    //         return 'No dataset'
    //       default:
    //         return `${this.datasetCount} dataset(s)`
    //     }
    //   },
    // },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
