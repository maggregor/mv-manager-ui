<template>
  <div class="dataset-card">
    <a-row type="flex" justify="space-between" style="height: 25px">
      <a-col class="p-1" :span="18">{{ datasetName }}</a-col>
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
import { updateDatasetMetadata } from '@/services/axios/backendApi'
export default {
  name: 'DatasetCard',
  components: {},
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
    toggleActivate() {
      this.loading = true
      let newValue = !this.activated
      updateDatasetMetadata(this.projectId, this.datasetName, { activated: newValue })
        .then(() => {
          this.activated = newValue
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
