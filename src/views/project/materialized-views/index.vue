<template>
  <a-row class="container" type="flex">
    <a-col :span="6">
      <a-tree :default-expand-all="false" :auto-expand-parent="false" :tree-data="tree">
        <template #title="{ dataRef }">
          <div class="leaf">
            <span v-if="!dataRef.mvName">{{ dataRef.title }}</span>
            <span v-else :class="`leaf leaf-${dataRef.status.toLowerCase()}`">
              <a-row class="leaf-mv" type="flex">
                <a-col :span="2">
                  <icon :style="{ color: 'hotpink' }">
                    <template #component>
                      <img
                        style="height: 100%; width: 100%"
                        src="@/assets/illustrations/materialized_view.svg"
                      />
                    </template>
                  </icon>
                </a-col>
                <a-col :span="1" />
                <a-col :span="19">
                  <a-anchor :affix="false">
                    <a-anchor-link
                      :href="`#${dataRef.mvDisplayName}`"
                      :title="dataRef.mvDisplayName"
                    >
                      <!-- <p>{{ dataRef.mvDisplayName }}</p> -->
                    </a-anchor-link>
                  </a-anchor>
                </a-col>
                <a-col class="icon" :span="2">
                  <plus-square-outlined v-if="true" />
                </a-col>
              </a-row>
            </span>
          </div>
        </template>
        <template #switcherIcon><caret-down-outlined class="icon"/></template>
      </a-tree>
    </a-col>
    <a-col :span="1" />
    <a-col :span="17">
      <MaterializedViewCard
        v-for="mv in materializedViews"
        :key="mv"
        :id="mv.mvDisplayName"
        :mv="mv"
      />
    </a-col>
  </a-row>
</template>

<script>
import Icon, { CaretDownOutlined, PlusSquareOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent, onMounted } from 'vue'
import { mapGetters, useStore } from 'vuex'
import MaterializedViewCard from '@/components/MaterializedViews/MaterializedViewCard'
const _ = require('lodash')
export default defineComponent({
  components: {
    Icon,
    CaretDownOutlined,
    MaterializedViewCard,
    PlusSquareOutlined,
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
      const allMaterializedViews = store.getters['allMaterializedViews']
      if (!allMaterializedViews) {
        return []
      }
      allMaterializedViews.forEach(mv => {
        mv.title = mv.mvName
        mv.key = mv.mvUniqueName
        let datasetName = mv.datasetName
        let tableName = mv.tableName
        let existingDataset = root.find(d => d.key === datasetName)
        if (!existingDataset) {
          let newDataset = {
            title: datasetName,
            key: datasetName,
            children: [],
          }
          existingDataset = newDataset
          root.push(existingDataset)
        }
        let tableKey = `${datasetName}.${tableName}`
        let existingTable = existingDataset.children.find(c => c.key === tableKey)
        if (!existingTable) {
          let newTable = {
            title: tableName,
            key: tableKey,
            children: [],
          }
          existingTable = newTable
          existingDataset.children.push(existingTable)
        }
        existingTable.children.push(mv)
      })
      return root
    })

    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info)
    }
    return {
      onSelect,
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
