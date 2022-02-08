import * as api from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    optimizations: [],
    loading: false,
  }
}

const state = getDefaultState()

export default {
  namespaced: true,
  state,
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    SET_OPTIMIZATIONS_STATE(state, payload) {
      Object.assign(state, { ...payload })
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async LOAD_OPTIMIZATIONS({ commit }, payload) {
      commit('SET_STATE', {
        loading: true,
      })
      let projectId = payload.projectId
      await api.getOptimizations({ projectId }).then(optimizations => {
        if (optimizations) {
          commit('SET_STATE', { optimizations: optimizations })
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
    },
  },
  getters: {
    optimizations: state => state.optimizations,
    loading: state => state.loading,
  },
}
