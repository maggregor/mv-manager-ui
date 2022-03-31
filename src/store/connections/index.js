import {
  getAllConnections,
  updateConnection,
  getConnection,
  deleteConnection,
  createConnection,
} from '@/services/axios/backendApi'
import _ from 'lodash'
import { message } from 'ant-design-vue'

const getDefaultState = () => {
  return {
    connections: [
      {
        id: -1,
        name: null,
        type: null,
        content: null,
        connectionLoading: false,
      },
    ],
    creating: false,
  }
}

const state = getDefaultState()

export default {
  state,
  mutations: {
    SET_CONNECTION_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    ADD_CONNECTION(state, connection) {
      state.connections.push(connection)
    },
    REMOVE_CONNECTION(state, id) {
      _.remove(state.connections, c => c.id === id)
    },
    RESET_CONNECTION_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async LOAD_CONNECTION({ commit }) {
      commit('SET_CONNECTION_STATE', { connectionLoading: true })
      const connections = await getAllConnections()
      commit('SET_CONNECTION_STATE', { connections })
      commit('SET_CONNECTION_STATE', { connectionLoading: false })
    },
    async CREATE_CONNECTION({ commit }, payload) {
      const connection = await createConnection(payload)
      commit('ADD_CONNECTION', connection)
      message.success('A new connection to BigQuery just created!"')
    },
    async UPDATE_CONNECTION({ commit }, payload) {
      let id = payload.id
      delete payload.id
      const connection = await updateConnection(id, payload)
      commit('SET_CONNECTION_STATE', { connection })
    },
    async DELETE_CONNECTION({ commit }, id) {
      await deleteConnection(id)
      commit('REMOVE_CONNECTION', id)
      message.success('The connection has been deleted')
    },
    SET_CREATING({ commit }, creating) {
      commit('SET_CONNECTION_STATE', { creating })
    },
  },
  getters: {
    allConnections: state => _.orderBy(Object.values(state.connections), 'id', 'desc'),
    isCreating: state => state.creating,
  },
}
