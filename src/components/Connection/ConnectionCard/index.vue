<template>
  <a-row class="connectionCard" type="flex" align="middle" justify="space-between">
    <a-col :span="1" class="card-title"
      ><img :style="{ height: '4rem' }" src="@/assets/google/google_bigquery.svg"
    /></a-col>
    <a-col class="card-title" :span="19">{{ connection.name }}#{{ connection.id }}</a-col>
    <a-col>
      <a-popconfirm
        placement="left"
        title="Are you sure delete this connection?"
        ok-text="Yes, delete this connection"
        cancel-text="No"
        @confirm="deleteConnection"
      >
        <a-button type="link"><DeleteOutlined />Delete</a-button>
      </a-popconfirm>
    </a-col>
    <!-- <a-col>#{{ connection.id }}</a-col> -->
  </a-row>
</template>

<script>
import { DeleteOutlined } from '@ant-design/icons-vue'
import { mapGetters, useStore } from 'vuex'
export default {
  name: 'ConnectionCard',
  components: {
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
    return { deleteConnection }
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
