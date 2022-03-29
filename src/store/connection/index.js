import {
  getAllConnections,
  updateConnection,
  getConnection,
  deleteConnection,
  createConnection,
} from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    id: -1,
    name: null,
    type: null,
    content: null,
    connectionLoading: false,
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
    RESET_CONNECTION_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async LOAD_CONNECTION({ commit }) {
      commit('SET_CONNECTION_STATE', { connectionLoading: true })
      const connections = await getAllConnections()
      if (connections.length > 0) {
        const connection = await getConnection(connections[0].id)
        commit('SET_CONNECTION_STATE', { ...connection })
      }
      commit('SET_CONNECTION_STATE', { connectionLoading: false })
    },
    async CREATE_CONNECTION({ commit }, payload) {
      const connection = await createConnection(payload)
      commit('SET_CONNECTION_STATE', { connection })
    },
    async UPDATE_CONNECTION({ commit }, payload) {
      let id = payload.id
      delete payload.id
      const connection = await updateConnection(id, payload)
      commit('SET_CONNECTION_STATE', { connection })
    },
    async DELETE_CONNECTION({ commit }, id) {
      const connection = await deleteConnection(id)
      commit('RESET_CONNECTION_STATE')
    },
  },
  getters: {
    hasConnection: state => state.id > -1,
    isConnectionLoading: state => state.connectionLoading,
    connectionId: state => state.id,
    connectionName: state => state.name,
    connectionType: state => state.type,
    connectionContent: state => state.content,
  },
}
