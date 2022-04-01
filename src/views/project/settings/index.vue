<template>
  <div class="settings">
    <a-row type="flex" justify="space-between">
      <a-col>
        <h1 class="mb-4">Project parameters</h1>
      </a-col>
      <a-col
        ><CTA :disabled="loading || !hasChanged" :trigger="saveSettings" label="Save changes"></CTA>
      </a-col>
    </a-row>
    <div class="setting">
      <h2>Automatic generation</h2>
      <p>
        Achilio will continuously optimize your datasets
      </p>
      <a-skeleton style="width: 10%" :loading="loading" :paragraph="false">
        <a-switch
          class="mt-2 mb-2"
          checked-children="On"
          un-checked-children="Off"
          :checked="automatic"
          @click="automatic = !automatic"
        />

        <p class="description-value">Automatic mode is {{ automatic ? 'enabled' : 'disabled' }}</p>
      </a-skeleton>
    </div>
    <div class="setting">
      <h2>Range of history analysis</h2>
      <p>
        The query history timeframe used during the usage analysis
      </p>
      <a-skeleton style="width: 10%" :loading="loading" :paragraph="false">
        <!-- DROPDOWN DAYS TIMEFRAME -->
        <a-select
          style="width: 110px"
          :default-value="`${analysisTimeframe}`"
          @change="handleChangeTimeframe"
        >
          <a-select-option v-for="day in hintDays" :key="day" :value="`${day}`">
            {{ day + ` ${day > 1 ? 'days' : 'day'}` }}
          </a-select-option>
        </a-select>
      </a-skeleton>
    </div>
    <div class="setting">
      <h2>Maximum Materialized Views per table</h2>
      <p class="description-value">
        The maximum number of materialized view per table
      </p>
      <div>
        <a-skeleton :loading="loading" :paragraph="false">
          <a-slider
            style="margin: auto;width: 90%"
            class="mb-2"
            v-model:value="mvMaxPerTable"
            :min="1"
            :max="20"
          />
        </a-skeleton>
      </div>
      <p>Maximum per table: {{ mvMaxPerTable }}</p>
    </div>
    <a-divider />
    <div class="setting">
      <h2>Danger zone</h2>
      <div class="delete">
        <a-row class="mb-3" type="flex" align="middle">
          <a-col span="18">
            <h2>Delete all managed materialized views</h2>
            <p>This will delete all materialized views created by Achilio on this project</p>
            <p>If automatic mode is enabled, they will be re-created.</p>
          </a-col>
          <a-col span="auto">
            <a-button class="delete-btn" :loading="deleteLoading" @click="deleteAll"
              >Delete all</a-button
            >
          </a-col>
        </a-row>
        <a-divider />
        <a-row type="flex" align="middle">
          <a-col span="18">
            <h2>Remove {{ projectId }}</h2>
            This will de-synchronize {{ projectId }} with Achilio.
          </a-col>
          <a-col span="auto">
            <a-button class="delete-btn" :loading="under" @click="unregisterProject"
              >Remove</a-button
            >
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import CTA from '@/components/CTA'
import { message } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { updateProject } from '@/services/axios/backendApi'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const store = useStore()
const automatic = ref(false)
const analysisTimeframe = ref(0)
const mvMaxPerTable = ref(0)
const settingsDefault = ref({})
const projectId = store.getters['selectedProjectId']
let project = store.getters['selectedProject']
const deleteLoading = ref(false)
onMounted(async () => {
  loading.value = true
  store.dispatch('LOAD_PROJECT', project.projectId).then(() => {
    project = store.getters['selectedProject']
    refreshSettings()
    loading.value = false
  })
})

const refreshSettings = () => {
  settingsDefault.value.automatic = project.automatic
  settingsDefault.value.analysisTimeframe = project.analysisTimeframe
  settingsDefault.value.mvMaxPerTable = project.mvMaxPerTable
  // Mutables
  automatic.value = project.automatic
  analysisTimeframe.value = project.analysisTimeframe
  mvMaxPerTable.value = project.mvMaxPerTable
}

const deleteAll = () => {
  const timeout = 7
  message.loading('Materialized Views deletion requesting...', timeout)
  deleteLoading.value = true
  store
    .dispatch('DELETE_ALL_MATERIALIZED_VIEWS')
    .then(() => {
      setTimeout(() => {
        deleteLoading.value = false
        message.success('Materialized Views deletion request sent', timeout)
      }, timeout * 1000)
    })
    .finally(() => (deleteLoading.value = false))
}

const saveSettings = async () => {
  await updateProject(projectId, {
    automatic: automatic.value,
    analysisTimeframe: analysisTimeframe.value,
    mvMaxPerTable: mvMaxPerTable.value,
  })
    .then(() => {
      setTimeout(() => {
        message.success('Settings saved')
      }, 1000)
      store.dispatch('LOAD_PROJECT', projectId).then(() => {
        refreshSettings()
      })
    })
    .catch(() => {
      setTimeout(() => {
        refreshSettings()
      }, 1000)
    })
}

const unregisterProject = async () => {
  await store.dispatch('UNREGISTER_PROJECT', projectId)
  router.push('/home/projects')
}

const hasChanged = computed(() => {
  return !(
    settingsDefault.value.automatic === automatic.value &&
    settingsDefault.value.analysisTimeframe == analysisTimeframe.value &&
    settingsDefault.value.mvMaxPerTable === mvMaxPerTable.value
  )
})
const handleChangeTimeframe = value => (analysisTimeframe.value = value)
const hintDays = [1, 7, 14, 30, 90, 365]
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
