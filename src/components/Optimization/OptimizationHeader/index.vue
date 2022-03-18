<template>
  <div
    :class="{
      'header-container-large': !isSmall,
      'header-container-small': isSmall,
      'selected-container': isSmall && $route.params.optimizationId == optimization.id,
    }"
  >
    <div
      v-if="isSmall"
      @click="$router.push(`/projects/${$route.params.projectId}/optimizations/${optimization.id}`)"
    >
      <a-row>
        <a-col :span="14">
          <div>
            <div class="text-gray-6 pt-1 font-size-14">
              {{ optimization.mvAppliedCount }} Materialized Views
            </div>
            <Check class="check" :color="statusColor" />
            <p class="title">
              <b>{{ optimization.status }}</b>
            </p>
          </div>
        </a-col>
        <a-col :span="10" style="margin-top: auto;">
          <div class="time">#{{ optimization.id }}</div>
          <p class="time">{{ moment(optimization.createdDate).fromNow() }}</p>
        </a-col>
      </a-row>
    </div>
    <div v-else>
      <a-row>
        <a-col :span="20">
          <div>
            <p>
              {{ moment(optimization.createdDate).format('MMMM Do YYYY hh:mm:ss') }}
              <a class="parameters" @click="showModal">Show parameters</a>
            </p>
          </div>
          <div>
            <Check class="check" :color="statusColor" />
            <h1 v-if="optimization.status !== 'Finished'" class="title">
              <b>{{ optimization.status }}</b>
            </h1>
            <p v-else-if="optimization.mvAppliedCount <= 0" class="title">
              <b>No Materialized Views found</b>
            </p>
            <p v-else-if="partiallyApplied" class="title">
              <b>Partially applied:</b> {{ optimization.mvAppliedCount }} /
              {{ optimization.mvProposalCount }} Materialized views
            </p>
            <p v-else class="title">
              <b>Applied:</b> {{ optimization.mvAppliedCount }} Materialized views
            </p>
            <p>Triggered by {{ optimization.username }}</p>
          </div>
        </a-col>
      </a-row>
      <a-row
        v-if="standalone && optimization.mvAppliedCount > 0 && optimization.status === 'Finished'"
        type="flex"
        justify="center"
        ><a-col :span="6">
          <CTA
            secondary
            class="mt-1"
            :url="`/projects/${$route.params.projectId}/optimizations/${optimization.id}`"
            label="Go to results"/></a-col
      ></a-row>
    </div>
  </div>
</template>
<script>
import CTA from '@/components/CTA'
import { Modal } from 'ant-design-vue'
import moment from 'moment'
import Check from '@/components/Check'
export default {
  name: 'OptimizationHeader',
  components: { Check, CTA },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    // If true display an access to the result list
    standalone: {
      type: Boolean,
      default: false,
    },
    optimization: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
      moment,
    }
  },
  data() {
    return {
      parametersVisible: false,
      visible: false,
    }
  },
  computed: {
    percentApplied() {
      if (this.optimization.mvProposalCount == 0) {
        return 0
      }
      let percent = (this.optimization.mvAppliedCount * 100) / this.optimization.mvProposalCount
      return percent > 100 ? 100 : percent.toFixed(0)
    },
    partiallyApplied() {
      return this.percentApplied < 100
    },
    statusColor() {
      switch (this.optimization.status) {
        case 'Error':
          return '#ec2c43'
        case 'Finished':
          return '#62d493'
        case 'Unknown':
        case 'Pending':
        default:
          return '#a0a0a0'
      }
    },
    isSmall() {
      return this.small
    },
  },
  methods: {
    eligiblePercentFormatted() {
      const percent = this.optimization.queryEligiblePercentage
      return isNaN(percent) ? 0 : (percent * 100).toFixed()
    },
    showModal() {
      Modal.info({
        title: `Parameters`,
        content: `Max. per table: ${this.optimization.mvMaxPerTable}`,
        onOk() {},
        class: 'test',
      })
    },
    handleOk(e) {
      this.visible = false
    },
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
