<template>
  <div>
    <VueEcharts style="width:100%; height:300px;" :option="options" :autoresize="true" />
  </div>
</template>

<script>
import { VueEcharts } from 'vue3-echarts'
import { onMounted, computed, ref } from 'vue'
import * as api from '@/services/axios/backendApi'

export default {
  components: {
    VueEcharts,
  },
  setup() {
    const data = ref({})
    const loadData = async () => {
      data.value = await api.getDailyStatistics('achilio-dev', 365)
      data.value = data.value
    }
    loadData()
    const options = computed(() => {
      return {
        xAxis: {
          type: 'category',
          data: Object.keys(data.value),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: Object.values(data.value),
            type: 'line',
            smooth: true,
          },
        ],
      }
    })

    return {
      options,
    }
  },
}
</script>
