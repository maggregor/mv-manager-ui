<template>
  <div class="container">
    <a-row>
      <ProjectHeader :project="project" />
    </a-row>
  </div>
</template>

<script>
import ProjectHeader from '@/components/Projects/ProjectHeader'
export default {
  name: 'Optimizations',
  components: { ProjectHeader },
  setup() {
    return {}
  },
  // Fake data before API Implementation
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
