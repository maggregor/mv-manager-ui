<template>
  <a-row
    v-if="!connection.editing"
    class="connectionCard"
    type="flex"
    align="middle"
    justify="space-between"
  >
    <a-col :span="1" class="card-title"
      ><img :style="{ height: '3rem' }" src="@/assets/google/google_bigquery.svg"
    /></a-col>
    <a-col :span="19"
      ><span @click="goToEditingMode" class="card-title">{{ connection.name }}</span>
      <p>
        Created by {{ connection.ownerUsername }}
        <span v-if="connection.lastModifiedAt">
          - Updated {{ moment(connection.lastModifiedAt).fromNow() }}</span
        >
      </p></a-col
    >

    <a-col>
      <a-popconfirm
        placement="left"
        title="Are you sure?"
        ok-text="Yes, delete this connection"
        cancel-text="No"
        @confirm="deleteConnection"
      >
        <a-button type="link"><DeleteOutlined />Delete</a-button>
      </a-popconfirm>
    </a-col>
  </a-row>
  <CreateEditConnectionCard editing v-else :connection="connection" />
</template>

<script>
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons-vue'
import CreateEditConnectionCard from '@/components/Connection/CreateEditConnectionCard'
import { mapGetters, useStore } from 'vuex'
export default {
  name: 'ConnectionCard',
  components: {
    CreateEditConnectionCard,
    DeleteOutlined,
  },
  props: {
    connection: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()
    const deleteConnection = () => store.dispatch('DELETE_CONNECTION', props.connection.id)
    const goToEditingMode = () => store.dispatch('START_CONNECTION_EDITING', props.connection.id)
    return { deleteConnection, moment, goToEditingMode }
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
