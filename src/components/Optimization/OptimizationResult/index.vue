<template>
  <div class="container">
    <a-row type="flex">
      <a-col flex="auto" class="property">#{{ index + 1 }} </a-col>

      <!-- Name -->
      <a-col flex="auto" class="property">
        <p class="label">Name</p>
        <p class="value">{{ result.name }}</p>
      </a-col>
      <!-- Dataset -->
      <a-col flex="auto" class="property">
        <p class="label">Dataset</p>
        <a-tag class="value">{{ result.datasetName }}</a-tag>
      </a-col>
      <!-- Table -->
      <a-col flex="auto" class="property">
        <p class="label">Table</p>
        <a-tag class="value">{{ result.tableName }}</a-tag>
      </a-col>
      <!-- Processed bytes -->
      <a-col flex="auto" class="property">
        <p class="label">Processed bytes</p>
        <p class="value principal">{{ prettyBytes(result.totalProcessedBytes) }}</p>
      </a-col>
      <!-- Queries -->
      <a-col flex="auto" class="property">
        <p class="label">Queries</p>
        <p class="value">{{ result.queries }}</p>
      </a-col>
      <!-- Statement -->
      <a-col flex="auto" class="property">
        <p class="label">Statement</p>
        <a class="value" @click="showStatement">Show</a>
      </a-col>
      <!-- Open in BigQuery -->
      <a-col flex="auto" class="property">
        <a class="value" :href="materializedViewUrl" target="_blank">Open</a>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import prettyBytes from 'pretty-bytes'
import { computed } from '@vue/reactivity'
export default {
  name: 'OptimizationResult',
  components: {},
  props: {
    index: {
      type: Number,
    },
    result: {
      type: Object,
    },
  },
  setup(props) {
    const materializedViewUrl = computed(
      () =>
        `https://console.cloud.google.com/bigquery?project=${props.result.projectId}&d=${props.result.datasetName}&p=${props.result.projectId}&t=${props.result.name}&page=table`,
    )
    return {
      prettyBytes,
      materializedViewUrl,
    }
  },
  computed: {},
  methods: {},
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
