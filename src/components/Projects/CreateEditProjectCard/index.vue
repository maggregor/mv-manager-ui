<template>
  <div class="connectionCard">
    <!-- Choose a selection -->
    <a-row type="flex" justify="space-between">
      <a-col :span="2"></a-col>
      <a-col span="auto"
        ><p class="title">Synchronize</p>
        <span class="sub-title">a new Google BigQuery project</span></a-col
      >
      <a-col :span="2"> <a-button type="link" @click="close">Close</a-button></a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col class="field mt-4 mb-4">
        <p class="field-title">Project ID</p>
        <input
          :size="inputNameSize"
          class="input-project-name"
          placeholder="gcp-project-id"
          v-model="projectId"
        />
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <down-outlined style="font-size: 30px; height: 0px" />
    </a-row>
    <a-row justify="space-around">
      <!-- Choose a selection -->
      <a-col class="field mt-4 mb-4">
        <p class="field-title">Connection</p>
        <a-dropdown-button class="dropdown-connections  mt-2" :trigger="['click']">
          <p style="cursor:pointer;" large @click.prevent>
            <span v-if="!selectedConnection">Select a connection</span>
            <a-row v-else type="flex" justify="space-between" align="middle">
              {{ selectedConnection.name }}
              <img :style="{ height: '1em' }" src="@/assets/google/google_bigquery.svg" />
            </a-row>
          </p>
          <template #overlay>
            <a-menu @click="handleSelectConnection">
              <a-menu-item>
                <a style="margin-bottom: 50px" @click="$router.push('/home/connections')">
                  <PlusOutlined /> Create a new connection to Google BigQuery
                </a>
                <a-divider />
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
    <a-row justify="space-around mb-4">
      <down-outlined style="font-size: 30px; height: 0px" />
    </a-row>
    <a-row justify="space-around">
      <a-col class="mt-4" :span="24">
        <a-row class="mb-3" justify="space-around">
          <a-col>
            <CTA
              label="Synchronize with Achilio"
              :trigger="registerProject"
              :disabled="selectedConnection === null || projectId === ''"
            />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import CTA from '@/components/CTA'
import { mapGetters, useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import { PlusOutlined, DownOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    CTA,
    PlusOutlined,
    DownOutlined,
  },
  setup() {
    const store = useStore()
    const selectedConnection = ref(null)
    const allConnections = store.getters['allConnections']
    const handleSelectConnection = event => {
      let connection = allConnections.find(c => c.id == event.key)
      selectedConnection.value = connection
    }
    let defaultName = ref('')
    const projectId = ref(defaultName.value)
    const inputNameSize = computed(() =>
      projectId.value.length > 50 ? 50 : projectId.value.length + 1,
    )
    const registerProject = async () => {
      await store.dispatch('REGISTER_PROJECT', {
        projectId: projectId.value,
        connectionId: selectedConnection.value.id,
      })
      await store.dispatch('SET_PROJECT_REGISTERING', false)
    }
    const close = () => {
      store.dispatch('SET_PROJECT_REGISTERING', false)
    }
    return {
      selectedConnection,
      handleSelectConnection,
      inputNameSize,
      defaultName,
      projectId,
      registerProject,
      close,
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
