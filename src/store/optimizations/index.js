import * as api from '@/services/axios/backendApi'
import { message } from 'ant-design-vue'

const getDefaultState = () => {
  return {
    optimizations: [],
    loading: false,
    // Contains optimization results
    currentOptimization: {},
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
    async LOAD_OPTIMIZATION_DETAILS({ commit }, payload) {
      let projectId = payload.projectId
      let optimizationId = payload.optimizationId
      await api.getOptimizations({ projectId, optimizationId }).then(optimization => {
        if (optimization) {
          console.log(optimization)
          commit('SET_STATE', { currentOptimization: optimization })
        }
      })
    },
    async RUN_OPTIMIZE({ dispatch }, projectId) {
      message.loading(`Optimization in progress...`, 10)
      await api
        .optimizeProject(projectId)
        .then(() => {
          message.success(`Optimization done !`, 5)
          dispatch('LOAD_OPTIMIZATIONS', { projectId: projectId })
        })
        .catch(() => message.error(`Optimization error.`, 5))
    },
  },
  getters: {
    optimizations: state => state.optimizations,
    loading: state => state.loading,
    currentOptimization: state => state.currentOptimization,
  },
}
