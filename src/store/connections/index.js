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
    START_EDITING(state, id) {
      state.connections[id].editing = true
    },
    FINISH_EDITING(state, id) {
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
      message.success('A new connection to BigQuery just created!"')
    },
    async UPDATE_CONNECTION({ commit }, payload) {
      let id = payload.id
      delete payload.id
      const connection = await updateConnection(id, payload)
      commit('ADD_CONNECTION', connection)
      message.success('Successfully updated!')
    },
    async DELETE_CONNECTION({ commit }, id) {
      await deleteConnection(id)
      commit('REMOVE_CONNECTION', id)
      message.success('The connection has been deleted')
    },
    SET_CREATING({ commit }, creating) {
      commit('SET_CONNECTION_STATE', { creating })
    },
    START_EDITING({ commit }, id) {
      commit('START_EDITING', id)
    },
    FINISH_EDITING({ commit }, id) {
      commit('FINISH_EDITING', id)
    },
  },
  getters: {
    allConnections: state => _.orderBy(Object.values(state.connections), 'id', 'desc'),
    isCreating: state => state.creating,
  },
}
