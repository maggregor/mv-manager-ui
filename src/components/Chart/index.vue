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
        <tr v-for="(entry, index) in data" :key="entry.timestamp">
          <th class="x-label" scope="row" v-if="index % 7 == 0">
            {{ moment(entry.timestamp * 1000).format('DD-MM-YYYY') }}
          </th>
          <td :style="`--size:${heightRatio(entry.value)};`">
            <span v-if="entry.value == maxValue" class="max-data"
              >Higgest {{ entry.valueFormatted }}</span
            >
          </td>
        </tr>
      </tbody>
      <div
        class="average-line"
        v-if="averageScannedBytes > 0 && data != undefined && data.length > 0"
        :style="`bottom: ${heightAverage(averageScannedBytes)}px`"
      >
        <div class="description">
          <span> Average {{ prettyBytes(averageScannedBytes) }} </span>
        </div>
      </div>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as api from '@/services/axios/backendApi'
import moment from 'moment'
const prettyBytes = require('pretty-bytes')

export default {
  components: {},
  props: {
    projectId: {
      type: String,
    },
    averageScannedBytes: {
      type: Number,
      default: -1,
    },
  },
  setup() {
    const data = ref({})
    const maxValue = ref()
    const minValue = ref()
    onMounted(async () => {
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
    })
    return {
      data,
      maxValue,
      minValue,
      moment,
      prettyBytes,
    }
  },
  methods: {
    heightRatio(value) {
      return value / this.maxValue / 1.2
    },
    heightAverage() {
      return 25 + (this.averageScannedBytes * 330) / this.maxValue
    },
  },
}
</script>

<style lang="scss" scoped>
.average-line {
  height: 3px;
  background: repeating-linear-gradient(90deg, #000000, #000000 5px, #ffffff00 5px, #ffffff00 15px);
  border-radius: 90px;
  position: relative;
  .description {
    margin-top: -25px;
    span {
      font-weight: 600;
      color: white;
      background-color: #505050;
      padding: 2px 5px 2px 5px;
      border-radius: 8px;
    }
  }
}
#column-example-13 {
  height: 330px;
  margin: 0 auto;
  .x-label {
    white-space: nowrap;
    font-size: 10px;
    font-weight: 500;
  }
}
#column-example-13 td {
  width: 10px;
  background-color: rgb(194, 190, 255);
  border-radius: 8px 8px 0 0;
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
