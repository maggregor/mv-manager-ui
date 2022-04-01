<template>
  <a-row class="connectionCard" type="flex" justify="space-around">
    <a-col :span="10">
      <input :size="inputNameSize" class="input-title" v-model="projectId" />
    </a-col>
    <a-col :span="10">
      <a-dropdown-button :trigger="['click']">
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
                <PlusOutlined /> Create a new connection to BigQuery</a
              >
            </a-menu-item>
            <a-menu-item v-for="c in allConnections" :key="c.id">
              <a-row type="flex" justify="space-between" align="middle">
                {{ c.name }}
                <img :style="{ height: '1em' }" src="@/assets/google/google_bigquery.svg" />
              </a-row>
            </a-menu-item>
          </a-menu>
        </template>
        <template #icon><DownOutlined /></template>
      </a-dropdown-button>
    </a-col>
    <a-col :span="24">
      <a-row class="mb-3" justify="end">
        <a-col>
          <CTA label="Register project" :trigger="registerProject" />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
import { ref } from '@vue/reactivity'
import CTA from '@/components/CTA'
import { mapActions, mapGetters, useStore } from 'vuex'
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
