<template>
  <div>
    <table
      id="column-example-13"
      class="charts-css column show-labels show-primary-axis data-spacing-3"
    >
      <thead>
        <tr>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in statistics" :key="entry.timestamp">
          <th class="x-label" scope="row" v-if="index % 7 == 0">
            {{ moment(entry.timestamp * 1000).format('DD-MM-YYYY') }}
          </th>
          <td :style="`--size:${heightRatio(entry.value)};`">
            <span v-if="entry.value == maxValue && entry.value !== 0" class="max-data"
              >Higgest {{ entry.valueFormatted }}</span
            >
          </td>
        </tr>
      </tbody>
      <div class="average-line" v-if="hasSelectedProjectKpi" :style="`bottom: ${heightAverage}px`">
        <div class="description">
          <span v-if="kpiAverageScannedBytes">
            Average {{ prettyBytes(kpiAverageScannedBytes) }}
          </span>
        </div>
      </div>
    </table>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { mapGetters } from 'vuex'
const moment = require('moment')
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
    fake: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const minValue = ref(0)
    const maxValue = ref(0)
    return {
      minValue,
      maxValue,
      moment,
      prettyBytes,
    }
  },
  computed: {
    ...mapGetters(['hasSelectedProjectKpi', 'kpiAverageScannedBytes']),
    statistics() {
      const statistics = this.$store.getters['chartsStatistics']
      if (this.fake) {
        statistics = this.getFakeData(28)
      }
      if (!statistics) {
        // Not yet initialized
        return []
      }
      statistics.forEach(entry => {
        // Find min/max to correctly scale the chart
        if (entry.value > this.maxValue) this.maxValue = entry.value
        if (entry.value < this.minValue || this.minValue == 0) this.minValue = entry.value
        // Make human-readabledaily processed bytes
        entry.valueFormatted = entry.value == 0 ? '' : prettyBytes(entry.value)
      })
      return statistics
    },
    heightAverage() {
      return 15 + (this.kpiAverageScannedBytes * 330) / this.maxValue / 1.35
    },
  },
  methods: {
    heightRatio(value) {
      return value / this.maxValue / 1.2
    },
    getFakeData(timeframe) {
      let arr = []
      for (let i = 0; i < timeframe; i++) {
        arr.push({ timestamp: i, value: Math.random() * 50 + 50, valueFormatted: '' })
      }
      return arr
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
      font-size: 16px;
      font-weight: 500;
      color: rgb(63, 63, 63);
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
  background-color: rgb(133, 133, 133);
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
