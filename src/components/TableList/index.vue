<template>
  <a-table
    :columns="columns"
    :data-source="allTables"
    :pagination="{ hideOnSinglePage: true, position: ['topRight'] }"
  >
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
      <template v-else-if="column.key === 'type'">
        <a-tag color="blue">
          {{ record.type }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'query_count'">
        <a>
          {{ record.queryCount }}
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
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    filters: [
      {
        text: 'Materialized View',
        value: 'MATERIALIZED_VIEW',
      },
      {
        text: 'View',
        value: 'VIEW',
      },
      {
        text: 'Table',
        value: 'TABLE',
      },
      {
        text: 'External Table',
        value: 'EXTERNAL_TABLE',
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  },
  {
    title: 'Query Count',
    dataIndex: 'query_count',
    key: 'query_count',
    sorter: (a, b) => {
      return a.queryCount - b.queryCount
    },
  },
  {
    title: 'Monthly cost (storage)',
    dataIndex: 'cost',
    key: 'cost',
    sorter: (a, b) => {
      return a.cost - b.cost
    },
    defaultSortOrder: 'descend',
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
