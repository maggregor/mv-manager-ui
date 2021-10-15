<template>
  <div class="project-card">
    <ProjectNameBlock
      :key="project.projectId"
      :project-id="project.projectId"
      :project-name="project.projectName"
      :dataset-count="project.datasetCount"
    /><CtaSecondary class="cta-secondary" /><CtaPrimary class="cta-primary" />
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
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
