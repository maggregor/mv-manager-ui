<template>
  <div class="connectionCard">
    <!-- Choose a selection -->
    <a-row type="flex" align="bottom">
      <p class="title">Register a project</p>
    </a-row>
    <a-row justify="space-around">
      <a-col class="field mt-2 mb-5">
        <p class="sub-title">Project ID</p>
        <input
          :size="inputNameSize"
          class="input-project-name"
          placeholder="google-project-id"
          v-model="projectId"
        />
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <ArrowDownOutlined height="1em" />
    </a-row>
    <a-row justify="space-around">
      <!-- Choose a selection -->
      <a-col class="field mt-5 mb-5">
        <p class="sub-title">Connection</p>
        <a-dropdown-button class="dropdown-connections  mt-2" :trigger="['click']">
          <p style="cursor:pointer;" large @click.prevent>
            <span v-if="!selectedConnection">select a connection</span>
            <a-row v-else type="flex" justify="space-between" align="middle">
              {{ selectedConnection.name }}
              <img :style="{ height: '1em' }" src="@/assets/google/google_bigquery.svg" />
            </a-row>
          </p>
          <template #overlay>
            <a-menu @click="handleSelectConnection">
              <a-menu-item>
                <a @click="$router.push('/home/connections')">
                  <PlusOutlined /> Create a new connection to BigQuery
                </a>
              </a-menu-item>
              <a-menu-item v-for="c in allConnections" :key="c.id">
                <a-row style="width: 399px" type="flex" justify="space-between" align="middle">
                  {{ c.name }}
                  <img :style="{ height: '1em' }" src="@/assets/google/google_bigquery.svg" />
                </a-row>
              </a-menu-item>
            </a-menu>
          </template>
          <template #icon><DownOutlined /></template>
        </a-dropdown-button>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <ArrowDownOutlined :height="20" />
    </a-row>
    <a-row justify="space-around">
      <a-col class="mt-5" :span="24">
        <a-row class="mb-3" justify="space-around">
          <a-col>
            <CTA label="Synchronize with Achilio" :trigger="registerProject" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import CTA from '@/components/CTA'
import { mapActions, mapGetters, useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import { PlusOutlined, DownOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    CTA,
    PlusOutlined,
    DownOutlined,
    ArrowDownOutlined,
  },
  setup() {
    const store = useStore()
    const selectedConnection = ref(null)
    const allConnections = store.getters['allConnections']
    const handleSelectConnection = event => {
      let connection = allConnections.find(c => c.id == event.key)
      selectedConnection.value = connection
    }
    let defaultName = ref('achilio-dev')
    const projectId = ref(defaultName.value)
    const inputNameSize = computed(() =>
      projectId.value.length > 50 ? 50 : projectId.value.length,
    )
    const registerProject = async () => {
      await store.dispatch('REGISTER_PROJECT', {
        projectId: projectId.value,
        connectionId: selectedConnection.value.id,
      })
      await store.dispatch('SET_PROJECT_REGISTERING', false)
    }

    return {
      selectedConnection,
      handleSelectConnection,
      inputNameSize,
      defaultName,
      projectId,
      registerProject,
    }
  },
  computed: {
    ...mapGetters(['allConnections']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
