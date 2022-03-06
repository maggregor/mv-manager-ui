<template>
  <div
    :class="{
      'header-container-large': !isSmall,
      'header-container-small': isSmall,
      'selected-container': isSmall && $route.params.optimizationId == optimization.id,
    }"
    @click="$router.push(`/projects/${$route.params.projectId}/optimizations/${optimization.id}`)"
  >
    <div v-if="isSmall">
      <a-row>
        <a-col :span="14">
          <div>
            <div class="text-gray-6 pt-1 font-size-14">
              {{ optimization.mvAppliedCount }} Materialized Views
            </div>
            <Check class="check" :color="statusColor" />
            <p v-if="partiallyApplied" class="title">
              <b>Partially: </b>
              <span class="font-size-18">
                {{ optimization.mvAppliedCount }} / {{ optimization.mvProposalCount }}</span
              >
            </p>

            <p v-else class="title">
              <b>Applied: </b>
              <span class="font-size-18">
                {{ optimization.mvAppliedCount }} / {{ optimization.mvProposalCount }}</span
              >
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
            <p v-if="partiallyApplied" class="title">
              <b>Partially applied:</b> {{ optimization.mvAppliedCount }} /
              {{ optimization.mvProposalCount }} Materialized views
            </p>
            <p v-else class="title">
              <b>Applied:</b> {{ optimization.mvAppliedCount }} Materialized views
            </p>
            <p>Triggered by {{ optimization.username }}</p>
          </div>
        </a-col>
        <a-col :span="4">
          <h1 class="percent">
            {{ eligiblePercentFormatted() }}%
            <p>Eligible queries</p>
          </h1>
        </a-col>
      </a-row>
      <a-row class="bar">
        <p>
          {{ percentApplied }}% Managed Materialized Views created
          <span v-if="percentApplied < 100" class="limit"
            >Plan limit reached: {{ mvPlanMax }} (<a
              class="upgrade"
              @click="$router.push(`/projects/${$route.params.projectId}/subscription`)"
              >Upgrade</a
            >)
          </span>
        </p>
        <a-progress
          :stroke-color="statusColor"
          :percent="percentApplied"
          size="small"
          :show-info="false"
        />
      </a-row>
    </div>
  </div>
</template>
<script>
import { Modal } from 'ant-design-vue'
import moment from 'moment'
import Check from '@/components/Check'
export default {
  name: 'OptimizationHeader',
  components: { Check },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    optimization: {
      type: Object,
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
      return this.partiallyApplied ? '#ECAD4F' : '#62d493'
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
