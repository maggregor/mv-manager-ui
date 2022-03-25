<template>
  <div :class="{ 'dataset-card': true, activated: dataset.activated }">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col class="p-1" :span="18"
        ><h6>{{ dataset.datasetName }}</h6></a-col
      >
      <a-col>
        <a-switch
          large
          checked-children="On"
          un-checked-children="Off"
          :loading="loading"
          :checked="dataset.activated"
          @click="toggleActivate"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  name: 'DatasetCard',
  components: {},
  props: {
    projectId: {
      type: String,
      default: '',
    },
    dataset: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()
    const loading = ref(false)
    const projectId = ref(props.projectId)
    const datasetName = ref(props.dataset.datasetName)
    const toggleActivate = async () => {
      loading.value = true
      await store.dispatch('ACTIVATE_DATASET', {
        projectId: projectId.value,
        datasetName: datasetName.value,
        activated: !props.dataset.activated,
      })
      loading.value = false
    }
    return {
      store,
      loading,
      activated: props.dataset.activated,
      toggleActivate,
    }
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
