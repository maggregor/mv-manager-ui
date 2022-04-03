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
    connections: {},
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
      connection.editing = false
      let id = connection.id
      if (state.connections.hasOwnProperty(id)) {
        // Update project fields on existing loaded project
        Object.assign(state.connections[id], { ...connection })
      } else {
        // Add a new project entry
        state.connections[id] = { ...connection }
      }
    },
    START_CONNECTION_EDITING(state, id) {
      state.connections[id].editing = true
    },
    FINISH_CONNECTION_EDITING(state, id) {
      state.connections[id].editing = false
    },
    REMOVE_CONNECTION(state, id) {
      delete state.connections[id]
    },
    RESET_CONNECTION_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async LOAD_CONNECTION({ commit }) {
      commit('SET_CONNECTION_STATE', { connectionLoading: true })
      const connections = await getAllConnections()
      connections.forEach(c => commit('ADD_CONNECTION', c))
      commit('SET_CONNECTION_STATE', { connectionLoading: false })
    },
    async CREATE_CONNECTION({ commit }, payload) {
      const connection = await createConnection(payload)
      commit('ADD_CONNECTION', connection)
      message.success('New connection to BigQuery created')
    },
    async UPDATE_CONNECTION({ commit }, payload) {
      let id = payload.id
      delete payload.id
      const connection = await updateConnection(id, payload)
      commit('ADD_CONNECTION', connection)
      message.success(`Connection {id} has been updated`)
    },
    async DELETE_CONNECTION({ commit }, id) {
      await deleteConnection(id)
      commit('REMOVE_CONNECTION', id)
      message.success(`Connection ${id} has been deleted`)
    },
    SET_CONNECTION_CREATING({ commit }, creating) {
      commit('SET_CONNECTION_STATE', { creating })
    },
    START_CONNECTION_EDITING({ commit }, id) {
      commit('START_CONNECTION_EDITING', id)
    },
    FINISH_CONNECTION_EDITING({ commit }, id) {
      commit('FINISH_CONNECTION_EDITING', id)
    },
  },
  getters: {
    allConnections: state => _.orderBy(Object.values(state.connections), 'id', 'desc'),
    isConnectionCreating: state => state.creating,
  },
}
