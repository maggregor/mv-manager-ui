import * as api from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    plans: [],
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
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async LOAD_PLANS({ commit }, payload) {
      let customerId = payload.customerId
      commit('SET_STATE', {
        loading: true,
      })
      await api.getPlans({ customerId }).then(plans => {
        if (plans) {
          commit('SET_STATE', { plans })
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
    },
  },
  getters: {
    plans: state => state.plans,
    loading: state => state.loading,
  },
}
