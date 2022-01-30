<template>
  <div class="event-card">
    <a-row type="flex" justify="space-between" style="height: 25px">
      <!-- <a-col class="p-2" :span="16">{{ name }}</a-col>
      <a-col :span="8">
        <a-button :loading="loading" @click="optimizeDataset" type="link">
          Optimize
        </a-button></a-col
      > -->
    </a-row>
  </div>
</template>
<script>
import { notification } from 'ant-design-vue'
import { postOptimizeDataset } from '@/services/axios/backendApi'
// import CTA from '@/components/CTA'
export default {
  name: 'DatasetCard',
  components: {
    // cta: CTA,
  },
  props: {
    dataset: {
      type: String,
    },
    table: {
      type: String,
    },
    type: {
      type: String,
    },
    date: {
      type: Date,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
