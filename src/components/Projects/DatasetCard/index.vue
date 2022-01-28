<template>
  <CtaPrimary :label="name" class="m-2 p-2" :trigger="optimizeDataset" />
</template>
<script>
import { postOptimizeDataset } from '@/services/axios/backendApi'
import CtaPrimary from '@/components/CTA/CtaPrimary'
export default {
  name: 'DatasetCard',
  components: {
    CtaPrimary,
  },
  props: {
    projectId: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  methods: {
    async optimizeDataset() {
      await postOptimizeDataset({ projectId: this.projectId, datasetName: this.name })
    },
  },
}
</script>
