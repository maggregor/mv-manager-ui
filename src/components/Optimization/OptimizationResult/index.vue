<template>
  <div class="container">
    <a-row type="flex">
      <a-col flex="auto" class="property">#{{ index + 1 }} </a-col>
      <!-- Name -->
      <a-col flex="auto" class="property">
        <p class="label">Name</p>
        <p class="value">{{ result.mvName }}</p>
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
        <a class="value m-1" @click="showStatement">Show</a> /
        <a class="value m-1" @click="copyToClipboard">Copy</a>
      </a-col>
      <!-- Open in BigQuery -->
      <a-col flex="auto" class="property">
        <a class="value" :href="materializedViewUrl" target="_blank">Open</a>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { Modal, message } from 'ant-design-vue'
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
    const showStatement = () =>
      Modal.info({
        title: `Statement`,
        content: `${props.result.statement}`,
        onOk() {},
        class: 'test',
      })
    const copyToClipboard = () => {
      navigator.clipboard.writeText(props.result.statement)
      message.success('Statement copied to clipboard')
    }
    const materializedViewUrl = computed(
      () =>
        `https://console.cloud.google.com/bigquery?project=${props.result.projectId}&d=${props.result.datasetName}&p=${props.result.projectId}&t=${props.result.mvName}&page=table`,
    )
    return {
      prettyBytes,
      materializedViewUrl,
      showStatement,
      copyToClipboard,
    }
  },
  computed: {},
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
