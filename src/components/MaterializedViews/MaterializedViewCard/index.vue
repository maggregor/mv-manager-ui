<template>
  <div class="mb-3">
    <div
      :class="{
        'mv-card': true,
        'selected-header': selected,
        closed: !opened,
        'selected-header-closed': selected && !opened,
        'header-applied': mv.status === 'APPLIED',
        'header-not_applied': mv.status === 'NOT_APPLIED',
        'header-outdated': mv.status === 'OUTDATED',
      }"
    >
      <a-row type="flex" justify="space-between" align="middle">
        <a-col style="text-align: center" :span="1">
          <div class="icon-open" @click="opened = !opened">
            <down-outlined v-if="opened" />
            <right-outlined v-else />
          </div>
        </a-col>
        <a-col class="p-1" :span="14">
          <a-tag
            v-if="mv.status === 'NOT_APPLIED' && mv.lastJobId === mv.initialJobId"
            color="green"
            >Proposal</a-tag
          >
          <a> {{ mv.datasetName }}/{{ mv.tableName }}/{{ mv.mvDisplayName }} </a>
          <p>
            <i>Found by Achilio {{ moment(mv.createdAt).fromNow() }}</i
            ><a-tag class="ml-3" color="red" v-if="mv.statusReason === 'ERROR_DURING_CREATION'"
              >Error during creation</a-tag
            >
          </p>
        </a-col>
        <a-col class="actions-container" :span="9">
          <a-button v-if="loading" :loading="true" type="link">Processing...</a-button>

          <div v-else-if="mv.status === 'OUTDATED'">
            <a-tag style="height: 20px" color="orange">Outdated</a-tag>
            <a-button @click="action('UNAPPLY_MATERIALIZED_VIEW')" type="link">Trash</a-button>
          </div>

          <div v-else-if="mv.status === 'NOT_APPLIED'">
            <a-button @click="action('DISCARD_MATERIALIZED_VIEW')" type="link">
              Discard this proposal
            </a-button>
            <a-button @click="action('APPLY_MATERIALIZED_VIEW')" type="link">Apply</a-button>
          </div>

          <div v-else-if="mv.status === 'APPLIED'">
            <a-button @click="action('UNAPPLY_MATERIALIZED_VIEW')" type="link">Unapply</a-button>
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
import { DownOutlined, RightOutlined } from '@ant-design/icons-vue'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
const moment = require('moment')
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
    const store = useStore()
    const projectId = store.getters['selectedProjectId']
    const loading = ref(false)
    const action = async actionName => {
      loading.value = true
      try {
        await store.dispatch(actionName, { projectId, id: props.mv.id })
      } catch (ignored) {}
      loading.value = false
    }
    return {
      opened,
      action,
      loading,
      moment,
    }
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
