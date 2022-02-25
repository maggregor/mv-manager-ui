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
        <tr v-for="(entry, index) in dailyStatistics" :key="entry.timestamp">
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
        v-if="
          averageScannedBytes > 0 && dailyStatistics !== undefined && dailyStatistics.length > 0
        "
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
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
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
    fake: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore()
    const maxValue = ref(0)
    const minValue = ref(0)
    const dailyStatistics = computed(() => {
      const getFakeData = () => {
        let arr = []
        for (let i = 0; i < 28; i++) {
          arr.push({ timestamp: i, value: Math.random() * 50 + 50, valueFormatted: '' })
        }
        return arr
      }
      const statistics = props.fake
        ? getFakeData()
        : store.getters['projects/currentProjectDailyStatistics']
      if (statistics === null) {
        // Not initialized
        return []
      }
      statistics.forEach(entry => {
        // Find min/max to correctly scale the chart
        if (entry.value > maxValue.value) maxValue.value = entry.value
        if (entry.value < minValue.value || minValue.value == 0) minValue.value = entry.value
        // Make human-readabledaily processed bytes
        entry.valueFormatted = entry.value == 0 ? '' : prettyBytes(entry.value)
      })
      return statistics
    })
    return {
      dailyStatistics,
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
      return 15 + (this.averageScannedBytes * 330) / this.maxValue / 1.35
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
