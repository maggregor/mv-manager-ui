import * as api from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    datasets: [],
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
    SET_PROJECT_STATE(state, payload) {
      let projectId = payload.projectId
      Object.assign(state.projects[projectId], {...payload})
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async LOAD_DATASETS({ commit }, payload) {
      commit('SET_STATE', {
        loading: true,
      })
      let projectId = payload.projectId
      await api.getDatasets({ projectId }).then(datasets => {
        if (datasets) {
          commit('SET_STATE', {datasets: datasets})
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
    },
  },
  getters: {
    datasets: state => state.datasets,
    loading: state => state.loading,
  },
}
