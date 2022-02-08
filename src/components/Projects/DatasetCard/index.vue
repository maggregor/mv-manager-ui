<template>
  <!-- <a-card class="container">
     <cta secondary class="button" :label="name" :trigger="optimizeDataset" />
    <a slot="extra" href="#">more</a>
  </a-card> -->
  <div class="dataset-card">
    <a-row type="flex" justify="space-between" style="height: 25px">
      <a-col class="p-2" :span="16">{{ name }}</a-col>
      <a-col :span="8">
        <a-button :loading="loading" @click="optimizeDataset" type="link">
          Optimize
        </a-button></a-col
      >
    </a-row>
  </div>
</template>
<script>
import { postOptimizeDataset } from '@/services/axios/backendApi'
// import CTA from '@/components/CTA'
export default {
  name: 'DatasetCard',
  components: {
    // cta: CTA,
  },
  props: {
    projectId: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async optimizeDataset() {
      this.loading = true
      this.$message.loading(`Optimization of ${this.name} in progress..`, 5)
      await postOptimizeDataset({ projectId: this.projectId, datasetName: this.name })
      this.$message.success(`Optimization done !`, 5)
      this.loading = false
      this.$store.dispatch('optimizations/LOAD_OPTIMIZATIONS', { projectId: this.projectId })
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
