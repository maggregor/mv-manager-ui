<template>
  <div class="container">
    <h1 class="mb-5">Optimization parameters</h1>
    <div class="setting">
      <h2>Automatic generation</h2>
      <h3>
        Achilio creates automatically Materialized Views when the algorithm find something good.
      </h3>
      <div>
        <a-switch
          class="mt-2 mb-2"
          checked-children="On"
          un-checked-children="Off"
          :loading="loading"
          :checked="activated"
          @click="toggleActivate"
        />
      </div>
      <p>Automatic mode is disabled.</p>
    </div>
    <div class="setting">
      <h2>Range of history analysis</h2>
      <h3>
        The query history range in BigQuery on which Achilio will work to create views adapted to
        your use.
      </h3>
      <a-select default-value="30d">
        <a-select-option value="1d">
          1 day
        </a-select-option>
        <a-select-option value="7d">
          7 days
        </a-select-option>
        <a-select-option value="14d">
          14 days
        </a-select-option>
        <a-select-option value="30d">
          30 days
        </a-select-option>
        <a-select-option value="90d">
          90 days
        </a-select-option>
        <a-select-option value="365d">
          365 days
        </a-select-option>
      </a-select>
    </div>
    <div class="setting">
      <h2>Maximum Materialized Views per table</h2>
      <h3>
        Achilio creates automatically Materialized Views when the algorithm find something good.
      </h3>
      <div>
        <a-slider
          style="margin: auto;width: 90%"
          class="mb-5"
          v-model:value="mvPerTable"
          :marks="mvPerTableMarks"
          :min="1"
          :max="20"
        />
      </div>
      <p>Maximum per table: {{ mvPerTable }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Optimizations',
  components: {},
  setup() {
    const mvPerTable = ref(10)
    return { mvPerTable }
  },
  // Fake data before API Implementation
  data() {
    return {
      mvPerTableMarks: {
        1: 'Minimum',
        5: {
          style: {
            color: 'red',
            'white-space': 'nowrap',
          },
          label: 'Plan limit (5 max.)',
        },
        20: {
          style: {
            'white-space': 'nowrap',
          },
          label: 'Google limit',
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
