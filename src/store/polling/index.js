const state = {
  interval: null,
}

export default {
  state,
  mutations: {
    SET_POLLING_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    SET_INTERVAL(state, interval) {
      state.interval = interval
    },
    CLEAR_INTERVAL(state) {
      if (state.interval) {
        clearInterval(state.interval)
        delete state.interval
      }
    },
  },
  actions: {
    async START_POLLING({ commit, dispatch }, projectId) {
      const interval = setInterval(() => {
        dispatch('LOAD_LAST_FETCHER_QUERY_JOB', projectId)
      }, 5000)
      commit('SET_INTERVAL', interval)
    },
    async STOP_POLLING({ commit }) {
      commit('CLEAR_INTERVAL')
    },
  },
}
