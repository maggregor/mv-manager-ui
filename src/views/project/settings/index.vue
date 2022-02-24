<template>
  <div class="settings">
    <a-row type="flex">
      <a-col :span="18">
        <h1 class="mb-5">Optimization parameters</h1>
      </a-col>
      <a-col :span="auto"
        ><CTA
          v-if="!loading && hasChanged"
          :loading="saveLoading"
          @click="saveSettings"
          label="Save changes"
        ></CTA>
      </a-col>
    </a-row>
    <div class="setting">
      <h2>Automatic generation</h2>
      <h3>
        Achilio creates automatically Materialized Views.
      </h3>
      <a-skeleton style="width: 10%" :loading="loading" :paragraph="false">
        <a-switch
          class="mt-2 mb-2"
          checked-children="On"
          un-checked-children="Off"
          :checked="automatic"
          @click="automatic = !automatic"
        />
        <p>Automatic mode is {{ automatic ? 'enabled' : 'disabled' }}</p>
      </a-skeleton>
    </div>
    <div class="setting">
      <h2>Range of history analysis</h2>
      <h3>
        The query history timeframe used during the usage analysis.
      </h3>
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
      <h3>
        The maximum number of materialized view per table
      </h3>
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
    <div class="delete">
      <a-row type="flex" align="middle">
        <a-col span="18">
          <h1>Delete all managed materialized views</h1>
          <h2>This will delete all materialized views created by Achilio on this project</h2>
          <h2>If automatic mode is enabled, they will be re-created.</h2>
        </a-col>
        <a-col span="auto">
          <a-button class="delete-btn" :loading="deleteLoading" @click="deleteAll"
            >Delete all</a-button
          >
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { computed, onMounted, reactive, ref, shallowRef } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { updateProject } from '@/services/axios/backendApi'

import CTA from '@/components/CTA'

const loading = ref(false)
const store = useStore()
const route = useRoute()
const automatic = ref(false)
const analysisTimeframe = ref(0)
const mvMaxPerTable = ref(0)
const settingsDefault = ref({})
const projectId = computed(() => store.getters['projects/currentProjectId'])
const deleteLoading = ref(false)
const saveLoading = ref(false)
onMounted(async () => {
  loading.value = true
  store
    .dispatch('projects/LOAD_CURRENT_PROJECT', { projectId: route.params.projectId })
    .then(() => {
      refreshSettings()
      loading.value = false
    })
})

const refreshSettings = () => {
  settingsDefault.value.automatic = store.getters['projects/currentProjectIsAutomatic']
  settingsDefault.value.analysisTimeframe =
    store.getters['projects/currentProjectAnalysisTimeframe']
  settingsDefault.value.mvMaxPerTable = store.getters['projects/currentProjectMvMaxPerTable']
  // Mutables
  automatic.value = store.getters['projects/currentProjectIsAutomatic']
  analysisTimeframe.value = store.getters['projects/currentProjectAnalysisTimeframe']
  mvMaxPerTable.value = store.getters['projects/currentProjectMvMaxPerTable']
}

const deleteAll = () => {
  let timeout = 7
  message.loading('Materialized Views deletion requesting...', timeout)
  deleteLoading.value = true
  store.dispatch('projects/DELETE_ALL_MATERIALIZED_VIEWS').finally(() => {
    setTimeout(() => {
      deleteLoading.value = false
      message.success('Materialized Views deletion request sent', timeout)
    }, timeout * 1000)
  })
}

const saveSettings = async () => {
  saveLoading.value = true
  await updateProject(projectId.value, {
    automatic: automatic.value,
    analysisTimeframe: analysisTimeframe.value,
    mvMaxPerTable: mvMaxPerTable.value,
  })
    .then(() => {
      console.log('ok')
      setTimeout(() => {
        saveLoading.value = false
        message.success('Settings saved')
      }, 1000)
      store
        .dispatch('projects/LOAD_CURRENT_PROJECT', { projectId: route.params.projectId })
        .then(() => {
          refreshSettings()
        })
    })
    .catch(error => {
      setTimeout(() => {
        saveLoading.value = false
        refreshSettings()
      }, 1000)
    })
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
