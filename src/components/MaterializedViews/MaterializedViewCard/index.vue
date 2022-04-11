<template>
  <div class="mb-3">
    <div :class="{ 'mv-card': true, closed: opened, 'selected-header': selected }">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col style="text-align: center" :span="1">
          <div class="icon-open" @click="opened = !opened">
            <down-outlined v-if="opened" />
            <right-outlined v-else />
          </div>
        </a-col>
        <a-col class="p-1" :span="14">
          <a v-if="mv.status === 'NOT_APPLIED'">
            <a-tag color="green">New Materialized View proposal</a-tag></a
          >
          <a> {{ mv.datasetName }}/{{ mv.tableName }}/{{ mv.mvName }}</a>
        </a-col>
        <a-col class="actions-container" :span="9">
          <div v-if="mv.status === 'OUTDATED'">
            <a-tag style="height: 20px" color="orange">Outdated</a-tag>
            <a-button type="link">Delete</a-button>
          </div>

          <div v-else-if="mv.status === 'NOT_APPLIED'">
            <a-button type="link">Discard this proposal</a-button>
            <a-button type="link">Apply</a-button>
          </div>

          <div v-else-if="mv.status === 'APPLIED'">
            <a-button type="link">Delete</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <div :class="{ 'mv-content': true, 'selected-content': selected }" v-if="opened">
      {{ mv.statement }}
    </div>
  </div>
</template>
<script>
import { DownOutlined } from '@ant-design/icons-vue'
import { RightOutlined } from '@ant-design/icons-vue'
import { ref } from '@vue/reactivity'
export default {
  name: 'MaterializedViewCard',
  components: {
    DownOutlined,
    RightOutlined,
  },
  props: {
    mv: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const opened = ref(props.mv.status !== 'APPLIED')
    return {
      opened,
    }
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
