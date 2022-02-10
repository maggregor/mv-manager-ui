<template>
  <!-- <a-card class="container">
     <cta secondary class="button" :label="name" :trigger="optimizeDataset" />
    <a slot="extra" href="#">more</a>
  </a-card> -->
  <div class="dataset-card">
    <a-row type="flex" justify="space-between" style="height: 25px">
      <a-col class="p-2" :span="16">{{ datasetName }}</a-col>
      <a-switch
        checked-children="On"
        un-checked-children="Off"
        :loading="loading"
        :checked="activated"
        @click="toggleActivate"
      />
      <br />
    </a-row>
  </div>
</template>
<script>
import { postOptimizeDataset, updateDatasetMetadata } from '@/services/axios/backendApi'
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
    datasetName: {
      type: String,
    },
    defaultActivated: {
      type: Boolean,
    },
  },
  data() {
    return {
      loading: false,
      activated: this.defaultActivated,
    }
  },
  methods: {
    async optimizeDataset() {
      this.loading = true
      this.$message.loading(`Optimization of ${this.name} in progress..`, 5)
      await postOptimizeDataset(this.projectId, this.datasetName)
      this.$message.success(`Optimization done !`, 5)
      this.loading = false
      this.$store.dispatch('optimizations/LOAD_OPTIMIZATIONS', { projectId: this.projectId })
    },
    toggleActivate() {
      this.loading = true
      let newValue = !this.activated
      setTimeout(
        updateDatasetMetadata(this.projectId, this.datasetName, { activated: newValue })
          .then(() => {
            this.activated = newValue
          })
          .finally(() => {
            this.loading = false
          }),
        3000,
      )
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
