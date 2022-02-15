<template>
  <div class="container">
    <a-row type="flex" justify="center" align="middle">
      <a-col class="property" flex="auto">
        <p class="label"></p>
        <p class="value">#{{ index + 1 }}</p>
      </a-col>
      <a-col class="property" flex="auto">
        <p class="label">Name</p>
        <p class="value">mmv_name_placeholder</p>
      </a-col>
      <a-col class="property" flex="auto">
        <p class="label">Dataset</p>
        <a-tag>
          {{ result.datasetName }}
        </a-tag>
      </a-col>
      <a-col class="property" flex="auto">
        <p class="label">Table</p>
        <a-tag>
          {{ result.tableName }}
        </a-tag>
      </a-col>
      <a-col class="property" flex="auto">
        <p class="label">Processed bytes</p>
        <p class="value">
          {{ prettyBytes(result.totalProcessedBytes) }}
        </p>
      </a-col>
      <a-col class="property" flex="auto">
        <p class="label">Queries</p>
        <p class="value">
          {{ result.queries }}
        </p>
      </a-col>

      <a-col class="property" flex="auto">
        <p class="label">Statement</p>
        <a class="parameters" @click="showStatement">Show</a>
      </a-col>
      <a-col class="property" flex="auto">
        <a
          :href="
            `https://console.cloud.google.com/bigquery?project=${result.projectId}&d=${result.datasetName}&p=${result.projectId}&t=&page=table`
          "
          target="_blank"
          >Open</a
        >
        <icon-font type="icon-external" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { Modal } from 'ant-design-vue'

import prettyBytes from 'pretty-bytes'

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
  setup() {
    return { prettyBytes }
  },
  methods: {
    showStatement() {
      Modal.info({
        title: `Create statement`,
        content: `${this.result.statement}`,
        onOk() {},
        class: '',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
