<template>
  <a-table :columns="columns" :data-source="allTables" :pagination="{ hideOnSinglePage: true }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'dataset'">
        <a>
          {{ record.datasetName }}
        </a>
      </template>
      <template v-else-if="column.key === 'table'">
        <a>
          {{ record.tableName }}
        </a>
      </template>
      <template v-else-if="column.key === 'cost'">
        <a> ${{ record.cost }} </a>
      </template>
    </template>
  </a-table>
</template>
<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
const columns = [
  {
    title: 'Dataset',
    dataIndex: 'dataset',
    key: 'dataset',
  },
  {
    title: 'Table',
    dataIndex: 'table',
    key: 'table',
  },
  {
    title: 'Monthly cost',
    dataIndex: 'cost',
    key: 'cost',
  },
]

export default defineComponent({
  setup() {
    return {
      columns,
    }
  },
  computed: {
    ...mapGetters({ allTables: 'selectedTables' }),
  },
})
</script>
