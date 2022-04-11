<template>
  <a-row class="container" type="flex">
    <a-col :span="6">
      <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
      <a-tree
        :show-line="true"
        :show-icon="true"
        :default-expand-all="true"
        :tree-data="tree"
        @select="onSelect"
      >
        <template #icon></template>
        <template #title="{ dataRef }">
          <div v-if="!dataRef.mvName">{{ dataRef.title }}</div>
          <div v-else :class="`leaf leaf-${dataRef.status.toLowerCase()}`">
            {{ dataRef.title }}
          </div>
        </template>
        <template #switcherIcon><caret-down-outlined class="icon"/></template>
      </a-tree>
    </a-col>
    <a-col :span="1" />
    <a-col :span="17">
      <MaterializedViewCard v-for="mv in materializedViews" :key="mv" :mv="mv" />
    </a-col>
  </a-row>
</template>

<script>
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { mapGetters, useStore } from 'vuex'
import MaterializedViewCard from '@/components/MaterializedViews/MaterializedViewCard'
const _ = require('lodash')
export default defineComponent({
  components: {
    CaretDownOutlined,
    MaterializedViewCard,
  },
  setup() {
    const store = useStore()
    const projectId = store.getters['selectedProjectId']

    const materializedViews = computed(() => store.getters['allMaterializedViews'])
    onMounted(async () => await store.dispatch('LOAD_MATERIALIZED_VIEWS', projectId))
    /**
     * Build the tree from the materialized views array
     */

    const tree = computed(() => {
      const root = []
      materializedViews.value.forEach(mv => {
        mv.title = mv.mvName
        mv.key = mv.mvUniqueName
        let datasetName = mv.datasetName
        let tableName = mv.tableName
        let existingDataset = root.find(d => d.key === datasetName)
        console.log(existingDataset)
        if (!existingDataset) {
          let newDataset = {
            title: datasetName,
            key: datasetName,
            children: [],
          }
          root.push(newDataset)
          existingDataset = newDataset
        }
        let tableKey = `${datasetName}.${tableName}`
        let existingTable = existingDataset.children.find(c => c.tableKey === tableKey)
        if (!existingTable) {
          let newTable = {
            title: tableName,
            key: tableKey,
            children: [],
          }
          existingDataset.children.push(newTable)
          existingTable = newTable
        }
        existingTable.children.push(mv)
      })
      return root
    })
    const treeData = ref([
      {
        title: 'My Dataset',
        key: 'mydataset',
        children: [
          {
            title: 'Table 1',
            key: 'table 1',
            children: [
              { title: 'achilio_mv_47293', key: 'achilio_mv_47293', hits: 523 },
              { title: 'achilio_mv_76875', key: 'achilio_mv_76875', hits: 287 },
              { title: 'achilio_mv_45343', key: 'achilio_mv_45343', hits: 187 },
              { title: 'achilio_mv_98734', key: 'achilio_mv_98734', hits: 38 },
              { title: 'achilio_mv_64272', key: 'achilio_mv_64272', hits: 27 },
              { title: 'achilio_mv_20687', key: 'achilio_mv_20687', hits: 12 },
            ],
          },
          {
            title: 'Table 2',
            key: 'table 2',
            children: [
              { title: 'achilio_mv_87879', key: 'achilio_mv_35493', hits: 397 },
              { title: 'achilio_mv_54375', key: 'achilio_mv_54375', hits: 75 },
              { title: 'achilio_mv_43547', key: 'achilio_mv_43547', hits: 47 },
              { title: 'achilio_mv_78534', key: 'achilio_mv_78534', hits: 28 },
              { title: 'achilio_mv_45572', key: 'achilio_mv_45572', hits: 12 },
              { title: 'achilio_mv_25357', key: 'achilio_mv_25357', hits: 2 },
            ],
          },
        ],
      },
    ])
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info)
    }
    return {
      onSelect,
      treeData,
      tree,
      materializedViews,
    }
  },
  computed: {
    ...mapGetters(['allMaterializedViews']),
  },
})
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
