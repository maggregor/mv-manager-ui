<template>
  <div>
    <table
      id="column-example-13"
      class="charts-css column show-labels show-primary-axis data-spacing-3"
    >
      {{
        columns
      }}
      <thead>
        <tr>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in data" :key="entry.timestamp">
          <th scope="row"></th>
          <td :style="`--size:${entry.value / maxValue / 1.2};`">
            <span v-if="entry.value == maxValue" class="max-data"
              >Higgest {{ entry.valueFormatted }}</span
            >
            <span v-else-if="entry.value == minValue" class="min-data"
              >Lowest {{ entry.valueFormatted }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'
import * as api from '@/services/axios/backendApi'
import moment from 'moment'
const prettyBytes = require('pretty-bytes')

export default {
  components: {},
  setup() {
    const data = ref({})
    const maxValue = ref()
    const minValue = ref()
    const loadData = async () => {
      data.value = await api.getDailyStatistics('achilio-dev', 28)
      data.value = data.value
      let max = 0
      let min = 0
      data.value.forEach(entry => {
        if (entry.value > max) {
          max = entry.value
        }
        if (entry.value < min || min == 0) {
          min = entry.value
        }
        entry.valueFormatted = entry.value == 0 ? '' : prettyBytes(entry.value)
      })
      maxValue.value = max
      minValue.value = min
    }
    loadData()
    return {
      data,
      maxValue,
      minValue,
      moment,
    }
  },
}
</script>

<style lang="scss" scoped>
#column-example-13 {
  height: 330px;
  margin: 0 auto;
}
#column-example-13 td {
  width: 10px;
  background-color: rgb(179, 170, 255);
  border-radius: 5px 5px 0 0;
  border: 1px solid rgb(230, 230, 230);
  .max-data {
    white-space: nowrap;
    font-size: 22px;
    margin-top: -35px;
  }
  .min-data {
    white-space: nowrap;
    font-size: 16px;
    margin-top: -25px;
  }
  .data {
    white-space: nowrap;
    font-size: 18px;
    margin-top: -35px;
  }
}
</style>
